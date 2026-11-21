import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ChartNoAxesCombined, ChevronDown, Cog, Lightbulb, Menu, Network, Users, X } from 'lucide-react';
import { contactEmail, industries, isPage, pages, services, solutions } from './content';
import { bookingUrl, core, coreIds, faq, headline, legal, offers, phone, principles, proofItems, setu, subheading, workSteps, articles, type CoreId } from './positioning';
import { BookCall, ChecklistSignup, CoreCards, LegalCopy, ServiceDetail, Steps, TextList } from './SiteSections';

const navigation = [['Services','/services'],['Offers','/offers'],['How We Work','/how-we-work'],['Insights','/insights'],['Bhuman Setu','/initiatives'],['About','/about'],['Contact','/contact']];
const servicePath = '/services/';
const heroBenefits = [
  [Lightbulb, 'Solve', 'Challenges'],
  [Cog, 'Provide', 'Purposeful Services'],
  [Users, 'Empower', 'Your Business'],
  [ChartNoAxesCombined, 'Deliver', 'Happiness to Customers'],
] as const;

function Brand() {
  return <a className="brand" href="/">
    <img src="/bhuman-logo.png" alt="" width="48" height="48"/>
    <span className="brand-name">
      <span>Bhuman <b>Fortune</b><span className="sr-only"> home</span></span>
      <span className="brand-marathi" lang="mr">भूमन <b>फॉर्च्यून</b></span>
    </span>
  </a>;
}

function ServiceNavigation({path, onSelect}: {path:string, onSelect:() => void}) {
  const [expanded, setExpanded] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!expanded) return;
    function closeOutside(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setExpanded(false);
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [expanded]);

  return <div className="services-navigation" ref={container}
    onPointerEnter={event => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1121px)').matches) setExpanded(true); }}
    onPointerLeave={event => { if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) setExpanded(false); }}
    onFocus={event => { if (!event.currentTarget.contains(event.relatedTarget) && event.target.matches(':focus-visible')) setExpanded(true); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}
    onKeyDown={event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        trigger.current?.focus();
        setExpanded(false);
      }
    }}>
    <button className={'services-trigger' + (path.startsWith('/services') ? ' current' : '')} ref={trigger}
      type="button" aria-expanded={expanded} aria-controls="services-dropdown"
      onClick={() => setExpanded(!expanded)}>Services <ChevronDown size={14} aria-hidden="true"/></button>
    <ul className="services-dropdown" id="services-dropdown" hidden={!expanded}>
      {coreIds.map(id => <li key={id}><a href={servicePath + id} onClick={() => { setExpanded(false); onSelect(); }}>{core[id].name}</a></li>)}
      <li className="services-overview"><a href="/services" onClick={() => { setExpanded(false); onSelect(); }}>View all services</a></li>
    </ul>
  </div>;
}

function Header({path}: {path:string}) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell header-inner">
    <Brand/>
    <button className="menu" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <nav id="main-nav" aria-label="Main navigation" className={open ? 'nav open' : 'nav'}>
      {navigation.map(([label,href]) => href === '/services'
        ? <ServiceNavigation key={href} path={path} onSelect={() => setOpen(false)}/>
        : <a key={href} href={href} aria-current={path === href ? 'page' : undefined}>{label}</a>)}
      <BookCall className="button header-cta"/>
    </nav>
  </div></header>;
}

function AlsoAvailable({full = false}: {full?: boolean}) {
  return <section className={full ? 'also-services' : 'contact-banner'} aria-labelledby="also-available">
    <div className={full ? '' : 'shell banner-inner'}>
      <div><h2 id="also-available">Also available</h2><p>Websites, branding, and creative support.</p></div>
      {full ? <div className="cards">{services.filter(service => service.id === 'digital-launch' || service.id === 'creative-studio').map(service =>
        <article className="card" id={service.id} key={service.id}><h3>{service.name}</h3><p>{service.tagline}</p><p>{service.summary.split('\n').slice(1).join(' ')}</p></article>
      )}</div> : <a className="text-link" href="/services/#also-available">Explore websites and creative services</a>}
    </div>
  </section>;
}

function Initiative() {
  return <section className="initiative"><div className="shell initiative-grid"><div>
    <p className="eyebrow"><span/>In development</p>
    <p>{setu}</p>
    <a className="button primary" href="/contact/?interest=setu#contact-form">Join the pilot</a>
  </div><div className="initiative-art" aria-hidden="true"><Network size={105} strokeWidth={0.7}/></div></div></section>;
}

function ContactBanner({home = false}: {home?: boolean}) {
  return <section className="contact-banner"><div className="shell banner-inner">
    <div><h2>{home ? 'Not sure where to start?' : 'Let’s talk about your next project.'}</h2>
    {home && <p>Book a free 30-minute call. We’ll look at one of your processes and tell you honestly whether automation or AI is worth pursuing.</p>}</div>
    <BookCall/>
  </div></section>;
}

function Home() {
  return <>
    <section className="hero"><div className="shell hero-inner">
      <div>
        <p className="eyebrow"><span/>We Like IT, Love IT and Respect IT.</p>
        <h1 className="positioning-headline">Your Problems.<br/>Our Solutions.<br/><span>A Happier You.</span></h1>
        <p className="hero-copy">Purposeful IT services that solve real challenges and create lasting value.</p>
        <ul className="hero-benefits">{heroBenefits.map(([Icon, title, description]) =>
          <li key={title}>
            <Icon size={30} aria-hidden="true"/>
            <span><strong>{title}</strong>{' '}<span>{description}</span></span>
          </li>
        )}</ul>
        <div className="actions"><BookCall label="Let’s Build a Brighter Tomorrow"/><a className="button secondary" href="/offers">See our offers</a></div>
      </div>
      <div className="hero-visual"><img src="/customer-consultation-laptop.jpg" alt="A consultant shakes hands with a customer beside a laptop that reads Good Ideas Solve Big Problems." width="1448" height="1086" fetchPriority="high"/></div>
    </div></section>
    <section className="shell section"><div className="homepage-problem">
      <h2>Most automation and AI projects stall for the same reasons.</h2>
      <div><TextList items={['Work still runs on spreadsheets and email.', 'AI pilots never reach daily use.', 'Tools get built with no owner, security, or audit trail.']}/>
      <p>We fix the process first, add AI where it genuinely pays off, and build governance in from day one.</p></div>
    </div></section>
    <section className="shell section content-section"><h2>Our services</h2><div className="article"><p><strong>{headline}</strong> {subheading}</p></div><CoreCards/></section>
    <section className="shell section content-section cares-section" aria-labelledby="cares-heading">
      <h2 id="cares-heading">How we work with CARES</h2>
      <Steps items={workSteps} ordered/>
      <a className="text-link" href="/how-we-work">See how we work</a>
    </section>
    <section className="shell section content-section"><h2>Why Bhuman Fortune</h2><Steps items={principles}/></section>
    {proofItems.length > 0 && <section className="shell section"><h2>Case studies and credentials</h2><TextList items={proofItems}/></section>}
    <AlsoAvailable/><ContactBanner home/>
  </>;
}

function Contact() {
  const interest = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (new URLSearchParams(location.search).get('interest') === 'setu' && interest.current) {
      interest.current.value = 'Bhuman Setu';
    }
    if (location.hash === '#contact-form') document.getElementById('contact-form')?.scrollIntoView();
  }, []);
  const [state, setState] = useState({busy:false, message:'', error:false});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (state.busy) return;
    setState({busy:true,message:'',error:false});
    try {
      const response = await fetch('/api/contact', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
      const result = await response.json().catch(() => null);
      if (!result || typeof result.message !== 'string') throw new Error('Email delivery is temporarily unavailable. Please email ' + contactEmail + ' or try again later.');
      if (!response.ok) throw new Error(result.message || 'Could not send your inquiry.');
      form.reset();
      setState({busy:false,message:'Thank you for your inquiry. We reply within one working day.',error:false});
    } catch (error) {
      const fallback = 'The form is temporarily unavailable. Your message is still in the form.';
      setState({busy:false,message:error instanceof Error && error.name === 'Error' ? error.message : fallback,error:true});
    }
  }
  return <form id="contact-form" className="contact-form card" action="/api/contact" method="post" onSubmit={submit}>
    <div className="form-grid"><label>Name <input name="name" required maxLength={120} autoComplete="name"/></label><label>Work email <input name="email" type="email" required maxLength={254} autoComplete="email"/></label></div>
    <label>Organization <span>(optional)</span><input name="organization" maxLength={150} autoComplete="organization"/></label>
    <label>Area of interest<select ref={interest} name="interest" required defaultValue=""><option value="" disabled>Select an area</option>{services.map(s => <option key={s.id}>{s.name}</option>)}<option>Bhuman Setu</option><option>Other</option></select></label>
    <label>How can we help?<textarea rows={6} name="message" minLength={10} maxLength={3000} required/></label>
    <div hidden><label>Website<input name="website" autoComplete="off" tabIndex={-1}/></label></div>
    <p className="form-note">Share only the information needed for your inquiry. See our <a href="/privacy">privacy notice</a>.</p>
    <button className="button primary" disabled={state.busy}>{state.busy ? 'Sending…' : 'Send inquiry'}</button>
    <p className={'form-status' + (state.error ? ' error' : '')} role="status">{state.message}</p>
  </form>;
}

function ContactDetails() {
  return <>
    <div className="contact-layout"><div className="article">
      <h2>Book a free call</h2>
      <p>Mumbai, India</p><p>We reply within one working day.</p>
      <p><a className="text-link" href={'mailto:' + contactEmail}>{contactEmail}</a></p>
      {bookingUrl ? <p><BookCall/></p> : <p>[Booking link]</p>}
      <p>{phone ? <><a className="text-link" href={'tel:' + phone}>Call {phone}</a> · <a className="text-link" href={'https://wa.me/' + phone.replace(/\D/g, '')}>WhatsApp</a></> : '[Phone / WhatsApp number]'}</p>
    </div><Contact/></div>
    <section className="faq"><h2>Frequently asked questions</h2>
      {faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
    </section>
  </>;
}

function Inner({path}: {path:string}) {
  if (!isPage(path)) return <section className="shell section"><h1>Page not found</h1><a className="text-link" href="/">Back to home</a></section>;
  const [title, description] = pages[path];
  if (path === '/about') return <section className="page-hero"><div className="shell"><h1>About</h1></div></section>;
  return <>
    <section className="page-hero"><div className="shell"><h1>{title}<span>.</span></h1><p>{description}</p></div></section>
    {path === '/initiatives' ? <Initiative/> : <section className="shell section">
      {path === '/services' && <><CoreCards/><AlsoAvailable full/></>}
      {coreIds.some(id => path === servicePath + id) && <ServiceDetail id={path.slice(servicePath.length) as CoreId}/>}
      {path === '/offers' && <div className="cards">{offers.map(([name, duration, deliverables]) =>
        <article className="card" key={name}><h2>{name}</h2><p>{duration}</p><h3>Deliverables</h3>
          <TextList items={deliverables}/>
        </article>)}</div>}
      {path === '/how-we-work' && <><section className="content-section cares-section" aria-labelledby="cares-heading"><h2 id="cares-heading">The CARES approach</h2><Steps items={workSteps} ordered/></section><div className="article"><h2>Our commitments</h2>
        <TextList items={['Fixed scope and price before work starts.', 'Plain-language reporting throughout the engagement.', 'Honest advice about what is worth doing.', 'Your data stays yours.']}/>
      </div></>}
      {path === '/solutions' && <div className="cards">{solutions.map(([name, body, href]) => <article className="card" key={name}><h3>{name}</h3><p>{body}</p><a className="text-link" href={href}>Explore service</a></article>)}</div>}
      {path === '/industries' && <Steps items={industries}/>}
      {path === '/insights' && <><ChecklistSignup/><section className="content-section insights-list"><h2>Articles</h2><div className="cards">{articles.map(name => <article className="card" key={name}><h3>{name}</h3><p>Coming soon</p></article>)}</div></section></>}
      {path === '/contact' && <ContactDetails/>}
      {(path === '/privacy' || path === '/terms') && <LegalCopy privacy={path === '/privacy'}/>}
    </section>}
    {!['/contact','/privacy','/terms'].includes(path) && <ContactBanner/>}
  </>;
}

export function App({path}: {path:string}) {
  useEffect(() => {
    if (path !== '/services') return;
    const anchor = location.hash.slice(1);
    if (anchor) document.getElementById(anchor)?.scrollIntoView();
  }, [path]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a><Header path={path}/>
    <main id="main">{path === '/' ? <Home/> : <Inner path={path}/>}</main>
    <footer className="footer"><div className="shell footer-inner">
      <p>© {new Date().getUTCFullYear()} BHUMAN FORTUNE<br/>{legal.name} · {legal.address} · {legal.gst}</p>
      <nav aria-label="Legal"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms</a></nav>
    </div></footer>
  </>;
}
