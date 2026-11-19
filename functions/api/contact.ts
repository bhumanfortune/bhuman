import { handleContact, type ContactEnv } from '../../worker/index';

export function onRequest(context: {request: Request; env: ContactEnv}) {
  return handleContact(context.request, context.env);
}
