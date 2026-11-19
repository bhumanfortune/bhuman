import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ChevronDown, CircuitBoard, Globe, Layers3, Menu, Network, Palette, Route, X } from 'lucide-react';
import { contactEmail, industries, insights, isPage, pages, services, solutions, values } from './content';

const icons = [Globe, Layers3, CircuitBoard, Route, Palette];
const navigation = [['About','/about'],['Services','/services'],['Initiatives','/initiatives']];

function Brand() {
  return <a className="brand" href="/" aria-label="Bhuman Fortune home"><img src="/bhuman-logo.png" alt="" width="48" height="48"/><span>Bhuman <b>Fortune</b></span></a>;
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
    onPointerEnter={event => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 961px)').matches) setExpanded(true); }}
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
    <button className={'services-trigger' + (path === '/services' ? ' current' : '')} ref={trigger}
      type="button" aria-expanded={expanded} aria-controls="services-dropdown"
      onClick={() => setExpanded(!expanded)}>Services <ChevronDown size={14} aria-hidden="true"/></button>
    <ul className="services-dropdown" id="services-dropdown" hidden={!expanded}>
      {services.map(service => <li key={service.id}><a href={'/services#' + service.id} onClick={() => { setExpanded(false); onSelect(); }}>{service.name}</a></li>)}
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
      <a className="button header-cta" href="/contact" aria-current={path === '/contact' ? 'page' : undefined}>Let’s talk</a>
    </nav>
  </div></header>;
}

function SectionTitle({label,title,description}: {label:string,title:string,description?:string}) {
  return <><p className="eyebrow"><span/>{label}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</>;
}

function ServiceCards({full=false}: {full?:boolean}) {
  return <div className={full ? 'service-details' : 'cards'}>{services.map((service,i) => {
    const Icon = icons[i];
    return <article className="card service-card" id={full ? service.id : undefined} key={service.id}>
      <div className="card-top"><div className="tile"><Icon size={23} aria-hidden="true"/></div></div>
      <h3>{service.name}</h3>
      <p className="service-tagline">{service.tagline}</p>
      {full ? <>
        {service.summary.split('\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <div className="service-information"><div><h4>What we offer</h4><ul>{service.offers.map(offer => {
          const separator = offer.indexOf(':');
          return <li key={offer}><strong>{offer.slice(0, separator)}</strong>{offer.slice(separator)}</li>;
        })}</ul></div><div><h4>Ideal for</h4><p>{service.audience}</p><h4>Business benefits</h4><ul>{service.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul></div></div>
        <a className="button primary" href="/contact">{service.cta}</a>
      </> : <a className="text-link" href={'/services#' + service.id}>Explore service</a>}
    </article>;
  })}</div>;
}

function CompanyValues() {
  return <div className="company-values"><SectionTitle label="WHY BHUMAN FORTUNE" title="Technology expertise. Business understanding. Human-centered values." description="We combine technology, creativity, project delivery experience, and a purpose-driven approach to help organizations solve real business challenges."/><div className="values-grid">{values.map(([title,body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div>;
}

function Initiative() {
  return <section className="initiative"><div className="shell initiative-grid"><div>
    <p className="eyebrow"><span/>OUR INITIATIVES</p><h2>Bhuman Setu</h2><p className="initiative-status">In development</p>
    <p>We’re developing Bhuman Setu as a BHUMAN FORTUNE technology initiative. We’ll share more as it takes shape.</p>
    <a className="text-link" href="/contact">Discuss collaboration</a>
  </div><div className="initiative-art" aria-hidden="true"><Network size={105} strokeWidth={0.7}/></div></div></section>;
}

function ContactBanner() {
  return <section className="contact-banner"><div className="shell banner-inner"><div><h2>Let’s build something meaningful together.</h2><p>Tell us what you want to achieve. We’ll help you explore the right solution.</p></div><a className="button primary" href="/contact">Request a Free Initial Consultation</a></div></section>;
}

function Home() {
  return <>
    <section className="hero"><div className="shell hero-inner">
      <p className="eyebrow"><span/>DRIVEN BY PURPOSE. DELIVERING HAPPINESS.</p>
      <h1>Smart solutions.<br/>Meaningful impact<span>.</span></h1>
      <p className="hero-copy">Technology should simplify work, unlock opportunities, and create lasting value.</p>
      <div className="actions"><a className="button primary" href="/services">Explore our services</a><a className="button secondary" href="/contact">Let’s talk</a></div>
      <a href="#capabilities" className="scroll-link"> Explore our capabilities</a>
    </div></section>
    <section className="shell section" id="capabilities"><div className="section-head"><div><SectionTitle label="WHAT WE DO" title="Our services" description="From launching your business and building your brand to automating operations, adopting AI, and managing complex projects, we turn ideas into practical solutions."/></div><a className="text-link" href="/services">View all services</a></div><ServiceCards/></section>
    <section className="shell section values-section"><CompanyValues/></section><Initiative/><ContactBanner/>
  </>;
}

function Contact() {
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
      setState({busy:false,message:'Your inquiry was received. Thank you for getting in touch.',error:false});
    } catch (error) {
      const fallback = 'The form is temporarily unavailable. Your message is still in the form.';
      setState({busy:false,message:error instanceof Error && error.name === 'Error' ? error.message : fallback,error:true});
    }
  }
  return <form className="contact-form card" action="/api/contact" method="post" onSubmit={submit}>
    <div className="form-grid"><label>Name <input name="name" required maxLength={120} autoComplete="name"/></label><label>Work email <input name="email" type="email" required maxLength={254} autoComplete="email"/></label></div>
    <label>Organization <span>(optional)</span><input name="organization" maxLength={150} autoComplete="organization"/></label>
    <label>Area of interest<select name="interest" required defaultValue=""><option value="" disabled>Select an area</option>{services.map(s => <option key={s.id}>{s.name}</option>)}<option>Bhuman Setu</option><option>Other</option></select></label>
    <label>How can we help?<textarea rows={6} name="message" minLength={10} maxLength={3000} required/></label>
    <div hidden><label>Website<input name="website" autoComplete="off" tabIndex={-1}/></label></div>
    <p className="form-note">Share only the information needed for your inquiry. See our <a href="/privacy">privacy notice</a>.</p>
    <button className="button primary" disabled={state.busy}>{state.busy ? 'Sending…' : 'Send inquiry'}</button>
    <p className={'form-status' + (state.error ? ' error' : '')} role="status">{state.message}</p>
  </form>;
}

function Inner({path}: {path:string}) {
  if (!isPage(path)) return <section className="shell section"><h1>Page not found</h1><a className="text-link" href="/">Back to home</a></section>;
  const [title, description] = pages[path];
  return <>
    <section className="page-hero"><div className="shell"><h1>{title}<span>.</span></h1><p>{description}</p></div></section>
    {path === '/initiatives' ? <Initiative/> : <section className="shell section">
      {path === '/about' && <><div className="article about-intro"><h2>Driven by Purpose. Delivering Happiness.</h2><p>At Bhuman Fortune, we believe technology should simplify work, unlock opportunities, and create lasting value.</p><p>Whether you’re launching a business, automating everyday operations, exploring artificial intelligence, managing complex projects, or building your brand, we help turn your ideas into practical solutions.</p></div><CompanyValues/></>}
      {path === '/services' && <ServiceCards full/>}
      {path === '/solutions' && <div className="cards">{solutions.map(([name,body,href]) => <article className="card" key={name}><h3>{name}</h3><p>{body}</p><a className="text-link" href={href}>Explore service</a></article>)}</div>}
      {path === '/industries' && <div className="cards">{industries.map(([name,body]) => <article className="card" key={name}><h3>{name}</h3><p>{body}</p></article>)}</div>}
      {path === '/insights' && <div className="article">{insights.map(([name,body]) => <article className="insight" key={name}><h2>{name}</h2><p>{body}</p></article>)}</div>}
      {path === '/contact' && <div className="contact-layout"><div><SectionTitle label="GET IN TOUCH" title="Request a free initial consultation." description="Whether you have a business idea, a process that needs improvement, a project that requires structured delivery, or an opportunity to explore AI, Bhuman Fortune is ready to discuss your goals."/><p className="contact-email"><a className="text-link" href={'mailto:' + contactEmail}>{contactEmail}</a></p></div><Contact/></div>}
      {path === '/privacy' && <div className="article"><p className="legal-status">Draft for company review</p><h2>Contact inquiries</h2><p>The form asks for your name, work email, organization if provided, area of interest, and message. These details are intended to route and respond to your inquiry.</p><h2>Privacy questions</h2><p>Use the contact page for privacy questions. The company’s legal identity, privacy contact, and data retention details are pending confirmation.</p></div>}
      {path === '/terms' && <div className="article"><p className="legal-status">Draft for company review</p><h2>About this website</h2><p>This website describes BHUMAN FORTUNE’s services and initiatives. Project scope, deliverables, and commercial terms are agreed separately.</p><h2>Website use</h2><p>Use the contact form for legitimate inquiries. Avoid sending confidential material or information you are unauthorized to share.</p></div>}
    </section>}
    {!['/contact','/privacy','/terms'].includes(path) && <ContactBanner/>}
  </>;
}

export function App({path}: {path:string}) {
  useEffect(() => {
    if (path !== '/services') return;
    const service = services.find(item => '#' + item.id === window.location.hash);
    if (service) document.getElementById(service.id)?.scrollIntoView();
  }, [path]);
  return <><a className="skip-link" href="#main">Skip to content</a><Header path={path}/><main id="main">{path === '/' ? <Home/> : <Inner path={path}/>}</main><footer className="footer"><div className="shell footer-inner"><p>© {new Date().getUTCFullYear()} BHUMAN FORTUNE</p><nav aria-label="Legal"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms</a></nav></div></footer></>;
}
