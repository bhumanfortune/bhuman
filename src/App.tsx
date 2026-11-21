import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ChartNoAxesCombined, ChevronDown, Cog, Lightbulb, Menu, Network, Users, X } from 'lucide-react';
import { contactEmail, industries, isPage, pages, services, solutions } from './content';
import { core, coreIds, faq, headline, offers, principles, proofItems, setu, subheading, workSteps, articles, type CoreId } from './positioning';
import { ChecklistSignup, ContactLink, CoreCards, LegalCopy, ServiceDetail, Steps, TextList } from './SiteSections';

const navigation = [['Services','/services'],['Offers','/offers'],['How We Work','/how-we-work'],['Insights','/insights'],['About','/about']];
const servicePath = '/services/';
const additionalServices = services
  .filter(service => service.id === 'digital-launch' || service.id === 'creative-studio')
  .map(service => ({...service, label: service.name.replace(/^Bhuman /, '')}));
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

function ServiceNavigation({path}: {path:string}) {
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
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}
    onKeyDown={event => {
      if (event.key === 'Escape' && expanded) {
        event.preventDefault();
        event.stopPropagation();
        trigger.current?.focus();
        setExpanded(false);
      }
    }}>
    <div className="services-controls">
      <a className="services-link" href="/services" aria-current={path === '/services' ? 'page' : undefined}>Services</a>
      <button className="services-trigger" ref={trigger}
        type="button" aria-label="Service pages" aria-expanded={expanded} aria-controls="services-dropdown"
        onClick={() => setExpanded(value => !value)}><ChevronDown size={16} aria-hidden="true"/></button>
    </div>
    <ul className="services-dropdown" id="services-dropdown" hidden={!expanded}
      onClick={event => { if (event.target instanceof Element && event.target.closest('a')) setExpanded(false); }}>
      {coreIds.map(id => <li key={id}><a href={servicePath + id} aria-current={path === servicePath + id ? 'page' : undefined}>{core[id].name}</a></li>)}
      {additionalServices.map(service => <li key={service.id}><a href={servicePath + '#' + service.id}>{service.label}</a></li>)}
      <li className="services-overview"><a href="/services" aria-current={path === '/services' ? 'page' : undefined}>View all services</a></li>
    </ul>
  </div>;
}

function Header({path}: {path:string}) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell header-inner">
    <Brand/>
    <button className="menu" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <nav id="main-nav" aria-label="Main navigation" className={open ? 'nav open' : 'nav'}
      onClick={event => { if (event.target instanceof Element && event.target.closest('a')) setOpen(false); }}>
      {navigation.map(([label,href]) => href === '/services'
        ? <ServiceNavigation key={href} path={path}/>
        : <a key={href} href={href} aria-current={path === href ? 'page' : undefined}>{label}</a>)}
      <ContactLink className="button header-cta"/>
    </nav>
  </div></header>;
}

function AlsoAvailable() {
  return <section className="also-services" aria-labelledby="also-available">
      <h2 id="also-available">Also available</h2><p>Websites, branding, and creative support.</p>
      <div className="cards">{additionalServices.map(service =>
        <article className="card" id={service.id} key={service.id}><h3>{service.name}</h3><p>{service.tagline}</p><p>{service.summary.split('\n').slice(1).join(' ')}</p></article>
      )}</div>
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
    {home && <p>Tell us about one of your processes. We’ll tell you honestly whether automation or AI is worth pursuing.</p>}</div>
    <ContactLink/>
  </div></section>;
}

function Home() {
  return <>
    <section className="hero"><div className="shell hero-inner">
      <div>
        <h1 className="positioning-headline">Your Problems.<br/>Our Solutions.<br/><span>A Happier You.</span></h1>
        <p className="hero-copy">Purposeful IT services that solve real challenges and create lasting value.</p>
        <ul className="hero-benefits">{heroBenefits.map(([Icon, title, description]) =>
          <li key={title}>
            <Icon size={30} aria-hidden="true"/>
            <span><strong>{title}</strong>{' '}<span>{description}</span></span>
          </li>
        )}</ul>
        <div className="actions"><ContactLink label="Let’s Build a Brighter Tomorrow"/><a className="button secondary" href="/offers">See our offers</a></div>
      </div>
      <div className="hero-visual"><img src="/customer-consultation-logo.jpg" alt="A consultant shakes hands with a customer beside a laptop bearing the Bhuman Fortune lotus logo." width="1448" height="1086" fetchPriority="high"/></div>
    </div></section>
    <section className="shell section"><div className="homepage-problem">
      <h2>Most automation and AI projects stall for the same reasons.</h2>
      <div><TextList items={['Work still runs on spreadsheets and email.', 'AI pilots never reach daily use.', 'Tools get built with no owner, security, or audit trail.']}/>
      <p>We fix the process first, add AI where it genuinely pays off, and build governance in from day one.</p></div>
    </div></section>
    <section className="shell section content-section"><h2>Why Bhuman Fortune</h2><Steps items={principles}/></section>
    {proofItems.length > 0 && <section className="shell section"><h2>Case studies and credentials</h2><TextList items={proofItems}/></section>}
    <ContactBanner home/>
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
    <label>Area of interest
      <select ref={interest} name="interest" required defaultValue="">
        <option value="" disabled>Select an area</option>
        {coreIds.map(id => <option key={id} value={'Bhuman ' + core[id].name}>{core[id].name}</option>)}
        {additionalServices.map(service => <option key={service.id} value={service.name}>{service.label}</option>)}
        <option>Bhuman Setu</option>
        <option>Other</option>
      </select>
    </label>
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
      <h2>Contact us</h2>
      <p>We reply within one working day.</p>
      <p><a className="text-link" href={'mailto:' + contactEmail}>{contactEmail}</a></p>
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
      {path === '/services' && <><div className="article services-intro"><h2>{headline}</h2><p>{subheading}</p></div><CoreCards/><AlsoAvailable/></>}
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
      <p>© {new Date().getUTCFullYear()} BHUMAN FORTUNE</p>
      <nav aria-label="Legal"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms</a></nav>
    </div></footer>
  </>;
}
