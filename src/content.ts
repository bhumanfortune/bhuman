import { core, subheading } from './positioning';

export const contactEmail = 'info@bhumanfortune.com';

export const services = [
  {
    "id": "digital-launch",
    "name": "Bhuman Digital Launch",
    "tagline": "Build Your Digital Presence. Grow Your Business.",
    "summary": "Your business deserves a professional digital identity that inspires confidence, attracts customers, and supports growth.\nBhuman Digital Launch helps entrepreneurs, startups, creators, and established businesses establish a strong online presence through modern websites, digital branding, and engaging business content.",
    "offers": [
      "Business Website Design & Development: Responsive, professional websites designed around your business goals.",
      "Landing Pages: Dedicated pages for products, services, promotions, and campaigns.",
      "E-commerce Solutions: Online product catalogues, shopping experiences, and payment integrations.",
      "Business Branding: Logo concepts, brand colours, business profiles, and digital identity materials.",
      "Search Engine Optimization: Basic on-page SEO, metadata, and search-friendly website structure.",
      "Website Maintenance: Content updates, improvements, technical support, and ongoing maintenance.",
      "Digital Marketing Creatives: Social media banners, brochures, advertisements, and promotional designs."
    ],
    "audience": "Startups, small businesses, retailers, consultants, creators, educational institutions, and local service providers.",
    "benefits": [
      "Establish a credible online presence.",
      "Reach customers beyond your physical location.",
      "Generate enquiries and business opportunities.",
      "Create a consistent and professional brand identity.",
      "Build a scalable foundation for future digital growth."
    ],
    "cta": "Get Your Business Online"
  },
  {
    "id": "business-automation",
    "name": "Bhuman Business Automation",
    "tagline": "Simplify Processes. Empower People.",
    "summary": "Repetitive tasks, disconnected systems, and manual approvals can slow down your business.\nBhuman Business Automation helps organizations digitize operations, reduce manual effort, improve visibility, and build efficient business processes using Microsoft Power Platform and related technologies.",
    "offers": [
      "Power Apps Development: Custom canvas and model-driven applications tailored to business needs.",
      "Power Automate Workflows: Automated approvals, notifications, reminders, escalations, and integrations.",
      "Power BI Dashboards: Business reports and interactive dashboards for informed decision-making.",
      "Dataverse Solutions: Structured business data management with appropriate access controls.",
      "SharePoint Integration: Document management, collaboration, lists, and business workflows.",
      "Business Process Digitization: Convert spreadsheets, emails, and paper-based activities into managed digital processes.",
      "Application Modernization: Improve or replace existing manual and legacy workflows.",
      "Power Platform Governance: Guidance on security, environment strategy, application lifecycle management, and maintainability."
    ],
    "audience": "SMEs, manufacturers, service organizations, corporate departments, educational institutions, and enterprises using Microsoft 365.",
    "benefits": [
      "Reduce repetitive manual work.",
      "Improve process consistency and accountability.",
      "Accelerate approval cycles.",
      "Increase operational transparency.",
      "Support secure, scalable business operations."
    ],
    "cta": "Automate Your Business"
  },
  {
    "id": "ai-enablement",
    "name": "Bhuman AI Enablement",
    "tagline": "Make Artificial Intelligence Work for Your Business.",
    "summary": "Artificial intelligence can help businesses work smarter, improve decision-making, and discover new opportunities. The key is identifying practical applications that deliver measurable value.\nBhuman AI Enablement helps organizations explore, plan, prototype, and adopt generative AI and intelligent automation responsibly.",
    "offers": [
      "AI Opportunity Assessment: Identify and prioritize practical AI use cases across business processes.",
      "Generative AI Consulting: Guidance on using generative AI for productivity, knowledge management, and business operations.",
      "AI Assistants & Knowledge Solutions: Design and development of assistants using approved organizational information.",
      "Microsoft Copilot Studio Solutions: Conversational agents, business knowledge assistants, and workflow-connected experiences.",
      "Intelligent Document Processing: Document extraction, classification, and validation using suitable AI technologies.",
      "AI-Powered Automation: Combine AI capabilities with Power Automate and enterprise workflows.",
      "AI Adoption Workshops: Practical awareness and enablement sessions for business teams.",
      "Responsible AI Guidance: Support for human oversight, data protection, governance, and appropriate AI usage."
    ],
    "audience": "Organizations beginning their AI journey, SMEs, enterprise teams, professional service providers, and businesses looking to improve productivity.",
    "benefits": [
      "Discover valuable AI opportunities.",
      "Reduce time spent searching and processing information.",
      "Improve employee productivity.",
      "Accelerate knowledge access.",
      "Introduce AI with appropriate security and human oversight."
    ],
    "cta": "Explore AI for Your Business"
  },
  {
    "id": "delivery-excellence",
    "name": "Bhuman Delivery Excellence",
    "tagline": "Plan with Confidence. Execute with Excellence.",
    "summary": "Successful business initiatives require more than technology. They need clear objectives, disciplined execution, effective collaboration, and transparent governance.\nBhuman Delivery Excellence provides professional project management, Agile delivery, Scrum facilitation, and operational governance services to help organizations deliver initiatives effectively.",
    "offers": [
      "Project Management Services: Planning, scheduling, execution, monitoring, and delivery coordination.",
      "Agile & Scrum Facilitation: Sprint planning, backlog refinement, daily Scrum facilitation, reviews, and retrospectives.",
      "PMO Setup & Governance: Project reporting, governance frameworks, dashboards, and management processes.",
      "Digital Transformation Delivery: Coordination of technology modernization, automation, and business transformation initiatives.",
      "Risk & Issue Management: Risk registers, issue tracking, dependencies, escalations, and corrective action plans.",
      "Stakeholder & Vendor Management: Communication, coordination, governance meetings, and delivery oversight.",
      "Service Delivery Improvement: Operational reporting, service performance monitoring, and continuous improvement.",
      "Project Recovery & Assessment: Review delivery challenges and recommend structured improvement actions."
    ],
    "audience": "IT companies, SMEs, enterprise technology departments, startups scaling their delivery operations, and organizations executing transformation projects.",
    "benefits": [
      "Improve project visibility and accountability.",
      "Strengthen stakeholder communication.",
      "Identify and address delivery risks early.",
      "Improve team coordination and execution discipline.",
      "Support predictable, quality-focused project outcomes."
    ],
    "cta": "Strengthen Your Project Delivery"
  },
  {
    "id": "creative-studio",
    "name": "Bhuman Creative Studio",
    "tagline": "Imagine Boldly. Create Beautifully.",
    "summary": "Every idea deserves to be communicated clearly and creatively.\nBhuman Creative Studio helps businesses, entrepreneurs, educators, and content creators transform ideas into professional visual content and compelling business communication.\nUsing creative design tools, including Canva, we develop materials that help brands communicate, engage audiences, and present ideas with confidence.",
    "offers": [
      "Brand Identity Design: Logo concepts, colour palettes, and basic brand guidelines.",
      "Social Media Creatives: Posts, banners, advertisements, and campaign visuals.",
      "Corporate Presentations: Professional business presentations, proposals, and executive decks.",
      "Startup Pitch Decks: Investor and incubator presentations structured around your business idea.",
      "Business Brochures & Profiles: Company profiles, service catalogues, flyers, and promotional material.",
      "Infographics & Visual Storytelling: Convert complex information into easy-to-understand visuals.",
      "Educational Content Design: Training presentations, learning materials, and awareness campaigns.",
      "Digital Content Templates: Reusable branded templates for everyday business communication."
    ],
    "audience": "Startups, entrepreneurs, content creators, educators, small businesses, consultants, NGOs, and corporate teams.",
    "benefits": [
      "Build a recognizable visual identity.",
      "Communicate business ideas more effectively.",
      "Create professional marketing materials.",
      "Save time through reusable design templates.",
      "Strengthen customer engagement and brand consistency."
    ],
    "cta": "Bring Your Ideas to Life"
  }
] as const;

export const solutions = [
  ['Creative communication', 'Communicate business ideas through visual content, presentations, and branded materials.', '/services#creative-studio'],
  ['Workflow automation', 'Digitize requests, approvals, and handoffs so teams can see what needs attention.', '/services/business-automation'],
  ['Digital presence', 'Build a professional online presence through websites, digital branding, and business content.', '/services#digital-launch'],
  ['AI adoption', 'Evaluate a specific workflow, define how to measure quality, and plan for human review.', '/services/ai-enablement'],
  ['Program delivery', 'Turn a modernization roadmap into a sequence of accountable decisions and releases.', '/services/delivery-excellence'],
];
export const industries = [
  ['Startups and small businesses', 'Build a digital presence, create a professional brand identity, and establish efficient business processes.'],
  ['Manufacturing and enterprises', 'Digitize operations, improve visibility, and support structured project delivery.'],
  ['Professional and local services', 'Develop websites, business content, and automation that support your day-to-day work.'],
  ['Education and content creators', 'Create learning materials, training presentations, digital content, and branded communication.'],
  ['IT companies and technology teams', 'Strengthen Agile delivery, project governance, stakeholder coordination, and service delivery.'],
  ['NGOs and corporate teams', 'Communicate ideas through professional presentations, brochures, and reusable design templates.'],
] as const;
export const pages = {
  '/': ['Governed Automation and AI for Business', subheading],
  '/about': ['About', 'About Bhuman Fortune.'],
  '/services': ['Services', 'Explore Business Automation, AI Enablement, and Delivery Excellence from Bhuman Fortune.'],
  '/services/business-automation': [core['business-automation'].name, core['business-automation'].tagline],
  '/services/ai-enablement': [core['ai-enablement'].name, core['ai-enablement'].tagline],
  '/services/delivery-excellence': [core['delivery-excellence'].name, core['delivery-excellence'].tagline],
  '/offers': ['Offers', 'Explore five fixed-scope automation, AI, governance, and support offers.'],
  '/how-we-work': ['How We Work', 'See how Bhuman Fortune uses CARES to capture the problem, assess readiness, recommend a plan, execute it, and support your team.'],
  '/solutions': ['Solutions', 'Explore digital presence, business automation, AI adoption, project delivery, and creative communication.'],
  '/industries': ['Industries', 'Supporting startups, SMEs, manufacturers, service organizations, educators, creators, NGOs, and enterprise teams.'],
  '/initiatives': ['Bhuman Setu', 'A pilot to help nearby small businesses pool demand, share capacity, and exchange surplus.'],
  '/insights': ['Insights', 'Request the free AI and Automation Readiness Checklist and explore upcoming articles.'],
  '/contact': ['Contact', 'Tell BHUMAN FORTUNE about your technology project or collaboration.'],
  '/privacy': ['Privacy Policy', 'Website privacy notice for BHUMAN FORTUNE.'],
  '/terms': ['Terms', 'Website terms for BHUMAN FORTUNE.'],
} as const;
export type Page = keyof typeof pages;
export function normalize(path: string) { return path.replace(/\/+$/, '') || '/'; }
export function isPage(path: string): path is Page { return Object.hasOwn(pages, path); }
