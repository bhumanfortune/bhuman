import { useState, type FormEvent } from 'react';
import { CircuitBoard, GitBranch, Layers3 } from 'lucide-react';
import { contactEmail } from './content';
import { checklistTitle, core, coreIds, legal, type CoreId } from './positioning';

export function ContactLink({label = 'Contact us', className = 'button primary'}: {label?: string; className?: string}) {
  return <a className={className} href="/contact/#contact-form">{label}</a>;
}

export function TextList({items}: {items: readonly string[]}) {
  return <ul className="copy-list">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function Steps({items, ordered = false}: {items: readonly (readonly [string, string])[]; ordered?: boolean}) {
  const List = ordered ? 'ol' : 'ul';
  return <List className="cards process-grid">{items.map(([name, body]) => <li className="card" key={name}><h3>{name}</h3><p>{body}</p></li>)}</List>;
}

export function CoreCards() {
  const icons = {'business-automation': GitBranch, 'ai-enablement': CircuitBoard, 'delivery-excellence': Layers3};
  return <div className="cards">{coreIds.map(id => {
    const service = core[id];
    const Icon = icons[id];
    return <article className="card core-card" key={id} id={id}><div className="tile"><Icon size={23} aria-hidden="true"/></div><h3>{service.name}</h3><p>{service.outcome}</p><a className="text-link" href={'/services/' + id}>Explore {service.name}</a></article>;
  })}</div>;
}

export function ServiceDetail({id}: {id: CoreId}) {
  const service = core[id];
  return <div className="article service-copy">
    <p>{service.intro}</p>
    <h2>Problems we solve</h2><TextList items={service.problems}/>
    <h2>What we build</h2><TextList items={service.builds}/>
    {'extra' in service && <><h2>{service.extraTitle}</h2><TextList items={service.extra}/></>}
    <h2>Typical benefits</h2><TextList items={service.benefits}/>
    <h2>Who it’s for</h2><p>{service.audience}</p>
  </div>;
}

export function ChecklistSignup() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    setBusy(true);
    setStatus('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...Object.fromEntries(new FormData(form)), kind: 'checklist'}),
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus('Thank you. We received your checklist request and will send it to the email you provided.');
    } catch {
      setStatus('We couldn’t submit your request. Please try again or email ' + contactEmail + '.');
    } finally {
      setBusy(false);
    }
  }
  return <form className="contact-form card checklist-form" onSubmit={submit} action="/api/contact" method="post">
    <h2>{checklistTitle}</h2>
    <label>Email address<input name="email" type="email" autoComplete="email" maxLength={254} required/></label>
    <div hidden><label>Website<input name="website" autoComplete="off" tabIndex={-1}/></label></div>
    <label className="consent-choice"><input name="consent" type="checkbox" value="yes" required/> I agree to be contacted by email about this checklist request.</label>
    <p className="form-note">See our <a href="/privacy">Privacy Policy</a>.</p>
    <button className="button primary" disabled={busy}>{busy ? 'Submitting…' : 'Request the free checklist'}</button>
    <p className="form-status" role="status">{status}</p>
  </form>;
}

export function LegalCopy({privacy}: {privacy: boolean}) {
  return <div className="article">
    <p><strong>Legal review required before launch.</strong> A lawyer must review this page before publication.</p>
    <h2>{privacy ? 'Who handles your data' : 'Who operates this website'}</h2>
    <p>{legal.name} operates Bhuman Fortune from {legal.address}. GST number {legal.gst}.</p>
    {privacy ? <>
      <h2>Information we collect and why</h2>
      <p>When you submit an inquiry, we use your name, email, area of interest, message, and optional organisation to respond and follow up. When you request the checklist, we use your email to fulfil that request. Technical request information is processed to host and protect the website.</p>
      <h2>Consent and withdrawal</h2>
      <p>You choose whether to share information through our forms. Checklist consent covers delivery and related follow-up. You may withdraw consent by emailing us. Withdrawal applies to future processing based on that consent.</p>
      <h2>Sharing and security</h2>
      <p>Cloudflare hosts and processes website requests, Resend sends form notifications, and Zoho hosts our business mailbox. We share information as needed for these services and when legally required. We use HTTPS and server-side form validation and restrict access to inquiry records.</p>
      <h2>Retention</h2>
      <p>We keep inquiries and checklist requests for {legal.retention}, subject to legal retention requirements. We delete records when they are no longer needed or required.</p>
      <h2>Your rights and grievances</h2>
      <p>Where applicable under India’s Digital Personal Data Protection Act, 2023 and its rules, you can request access to information about your data, correction, completion, updating or erasure, withdraw consent, raise a grievance, and nominate someone to exercise your rights in the event of death or incapacity. You may approach the Data Protection Board of India after using our grievance process, where applicable.</p>
    </> : <>
      <h2>Use of the website</h2>
      <p>Use the site and forms for lawful inquiries. Share only information you are authorised to provide. Avoid sending confidential material, attempting to disrupt the site, or submitting spam.</p>
      <h2>Services, offers, and the Setu pilot</h2>
      <p>Website descriptions are for general information. Binding scope, fees, timelines, data handling, and delivery terms are agreed in writing for each engagement. Pilot inquiries express interest and are subject to the pilot’s eligibility and availability.</p>
      <h2>Content and third-party services</h2>
      <p>Website content and branding belong to their respective owners. External services may have their own terms. The <a href="/privacy">Privacy Policy</a> describes how we handle personal data.</p>
      <h2>Applicable law</h2>
      <p>These terms are governed by Indian law, subject to any mandatory rights and remedies available to you.</p>
    </>}
    <h2>Contact and grievances</h2>
    <p>{legal.officer}. Email <a href={'mailto:' + contactEmail}>{contactEmail}</a>.</p>
  </div>;
}
