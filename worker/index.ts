import { contactEmail, services } from '../src/content';

export interface ContactEnv {
  CONTACT_LIMIT?: { limit(options: {key: string}): Promise<{success: boolean}> };
  RESEND_API_KEY?: string;
  CONTACT_FROM?: string;
}

interface Env extends ContactEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const interests = new Set<string>([...services.map(service => service.name), 'Bhuman Setu', 'Other']);
const maxBody = 16_384;
const headers = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; img-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'",
};

function answer(status: number, message: string) {
  return Response.json({message}, { status, headers: {...headers, 'Cache-Control':'no-store', ...(status === 405 ? {Allow:'POST'} : {})} });
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const decoder = new TextDecoder('utf-8', { fatal:true });
  let content = '';
  let size = 0;
  while (true) {
    const {value,done} = await reader.read();
    if (done) return content + decoder.decode();
    size += value.byteLength;
    if (size > maxBody) {
      await reader.cancel();
      return null;
    }
    content += decoder.decode(value,{stream:true});
  }
}

async function contact(request: Request, env: ContactEnv) {
  if (request.method !== 'POST') return answer(405, 'Use POST to submit an inquiry.');
  if (request.headers.get('Origin') !== new URL(request.url).origin) return answer(403, 'Submit the form from the contact page.');
  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') return answer(415, 'Submit using the contact form.');
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM) return answer(503, 'The contact form is temporarily unavailable.');
  if (env.CONTACT_LIMIT) {
    const {success} = await env.CONTACT_LIMIT.limit({key: request.headers.get('CF-Connecting-IP') || 'unknown'});
    if (!success) return answer(429, 'Too many attempts. Wait a minute and try again.');
  }
  let body: unknown;
  try {
    const content = await readBody(request);
    if (content === null) return answer(413, 'Your inquiry is too large.');
    body = JSON.parse(content);
  } catch {
    return answer(400, 'Your inquiry could not be read.');
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return answer(400, 'Provide the required contact fields.');
  const fields = body as Record<string, unknown>;
  const value = (name: string) => typeof fields[name] === 'string' ? fields[name].trim() : '';
  const name = value('name');
  const email = value('email');
  const organization = value('organization');
  const interest = value('interest');
  const message = value('message');
  if (value('website')) return answer(400, 'Your inquiry could not be accepted.');
  if (!name || name.length > 120 || !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(email) || email.length > 254 || organization.length > 150 || !interests.has(interest) || message.length < 10 || message.length > 3000) {
    return answer(400, 'Check the required fields and try again.');
  }
  const result = await fetch('https://api.resend.com/emails', {
    method:'POST',
    headers:{Authorization:'Bearer ' + env.RESEND_API_KEY, 'Content-Type':'application/json'},
    signal:AbortSignal.timeout(8000),
    body:JSON.stringify({
      from:env.CONTACT_FROM, to:[contactEmail], reply_to:email,
      subject:'BHUMAN FORTUNE website inquiry',
      text:['Name: ' + name, 'Email: ' + email, 'Organization: ' + organization, 'Interest: ' + interest, '', message].join('\n'),
    }),
  });
  if (!result.ok) {
    const error = await result.json().catch(() => null) as {name?: string} | null;
    console.error('Contact email provider rejected request', {
      status: result.status,
      code: typeof error?.name === 'string' ? error.name : 'unknown',
    });
    return answer(503, 'Email delivery is temporarily unavailable. Please email ' + contactEmail + ' or try again later.');
  }
  return answer(200, 'Inquiry received.');
}

export async function handleContact(request: Request, env: ContactEnv) {
  try {
    return await contact(request, env);
  } catch {
    console.error('Contact email handler could not complete the request');
    return answer(503, 'The form is temporarily unavailable. Try again later.');
  }
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') {
      if (!env.CONTACT_LIMIT) return answer(503, 'The contact form is temporarily unavailable.');
      return handleContact(request, env);
    }
    if (url.pathname.startsWith('/api/')) return answer(404, 'Endpoint not found.');
    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    for (const [key,value] of Object.entries(headers)) response.headers.set(key,value);
    return response;
  }
};
