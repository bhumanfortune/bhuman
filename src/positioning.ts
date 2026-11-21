export const proofItems: readonly string[] = []; // Add approved case studies or credentials here.
export const legal = {
  name: '[Legal company name]',
  address: '[Registered office address]',
  gst: '[GST number]',
  officer: '[Grievance officer name and contact details]',
  retention: '[Retention period]',
};
export const headline = 'Turn manual work into governed, AI-enabled automation.';
export const subheading = 'We help businesses and enterprise teams build secure Microsoft Power Platform solutions and practical AI assistants, with governance built in from day one.';
export const setu = "Setu means bridge. Small businesses often can't reach the minimum order, larger customer or shared facility that would make them competitive. Bhuman Setu is being built to help nearby businesses pool demand, share spare capacity and exchange surplus, so they can cross those thresholds together.";
export const checklistTitle = 'Free AI and Automation Readiness Checklist';

export const core = {
  'business-automation': {
    name: 'Business Automation',
    tagline: 'Turn scattered requests into managed workflows.',
    outcome: 'Replace spreadsheet and email handoffs with secure, trackable workflows.',
    intro: 'We build Power Platform solutions around the way your teams work. Each workflow has clear ownership, visible status, and documented handling for exceptions.',
    problems: ['Requests and approvals get lost across inboxes.', 'Teams re-enter information and struggle to see the status of work.', 'Business-critical apps depend on the person who built them.'],
    builds: ['Power Apps for capturing requests and managing operational work.', 'Power Automate workflows for approvals, reminders, and exception routing.', 'Power BI reporting and Dataverse or SharePoint solutions where they fit.'],
    benefits: ['Fewer manual handoffs and less duplicate entry.', 'Clearer ownership, audit history, and visibility into delays.'],
    audience: 'Operations teams, SMEs, and enterprise departments with repetitive, rules-based work.',
    extraTitle: 'Governance is included',
    extra: ['Environment strategy for development, testing, and production.', 'Access controls aligned with user roles and data sensitivity.', 'Lifecycle management for releases, changes, and support.', 'Documentation for owners, administrators, and users.'],
  },
  'ai-enablement': {
    name: 'AI Enablement',
    tagline: 'Make practical AI part of daily work.',
    outcome: 'Help teams find trusted answers and handle routine information faster.',
    intro: 'We help teams choose bounded AI use cases and build assistants that work with approved information, clear responsibilities, and human review.',
    problems: ['Employees spend too long finding reliable answers.', 'Promising AI pilots lack a measure of success or a path into everyday work.', 'Teams need guidance on data access and how to handle uncertain answers.'],
    builds: ['Knowledge assistants grounded in approved internal material.', 'Copilot Studio assistants connected to appropriate workflows.', 'Document processing with review for uncertain or sensitive results.'],
    benefits: ['Quicker access to information and less repetitive reading.', 'Clearer evidence about quality, adoption, and the value of scaling.'],
    audience: 'Business and enterprise teams with a defined workflow and someone accountable for its results.',
    extraTitle: 'Our approach',
    extra: ['Start with a business problem.', 'Check data readiness and permissions.', 'Prototype and measure performance on representative work.', 'Keep a human in the loop for consequential decisions.', 'Scale only what proves value.'],
  },
  'delivery-excellence': {
    name: 'Delivery Excellence',
    tagline: 'Give complex projects a clear plan and accountable owners.',
    outcome: 'Make scope, risks, and decisions visible so delivery stays on track.',
    intro: 'We help delivery teams establish a workable rhythm for planning, decision-making, and reporting. Stakeholders can see what is progressing, what is blocked, and who needs to act.',
    problems: ['Priorities change without clear decisions on scope.', 'Risks and dependencies surface too late.', 'Stakeholders receive inconsistent updates across teams and vendors.'],
    builds: ['Delivery plans with milestones, owners, and decision points.', 'Governance and reporting routines that support project and Agile teams.', 'Risk, issue, and dependency tracking with clear escalation paths.'],
    benefits: ['Earlier visibility of trade-offs and risks.', 'Better coordination and clearer handover into ongoing support.'],
    audience: 'Business sponsors, delivery leads, and technology teams managing complex or cross-team projects.',
  },
} as const;
export type CoreId = keyof typeof core;
export const coreIds = Object.keys(core) as CoreId[];

export const offers = [
  ['AI and Automation Readiness Audit', 'Approx. 1–2 weeks', ['Workflow and data-readiness review', 'Prioritised opportunities and risks', 'Recommended next steps']],
  ['Automation Sprint', 'Approx. 4–6 weeks', ['One agreed workflow delivered as a pilot', 'Testing and acceptance review', 'Documentation and handover']],
  ['Governance and Centre of Excellence Setup', 'Approx. 3–6 weeks', ['Environment and access model', 'Ownership and release processes', 'Governance playbook and handover']],
  ['AI Adoption Workshop', 'Approx. half a day or a full day', ['Facilitated workshop for the agreed team', 'Prioritised use cases and responsible-use guidance', 'Actions and owners for follow-up']],
  ['Managed Automation Support', 'Monthly', ['Agreed support coverage', 'Triage and maintenance of in-scope automations', 'Plain-language service and improvement summary']],
] as const;

export const principles = [
  ['Practical', 'Start with work that needs to improve.'],
  ['Governed', 'Build access controls, ownership, and documentation into delivery.'],
  ['Transparent', 'Make scope, decisions, and costs clear.'],
  ['Human-centred', 'Design with the people who do the work and keep human review where it matters.'],
] as const;
export const workSteps = [
  ['C · Capture', 'Discover how the work happens today. Capture the problem, who it affects, and what better would look like.'],
  ['A · Assess', 'Review the workflow, data readiness, security requirements, and expected value.'],
  ['R · Recommend', 'Explain what to automate, where AI could help, and what to leave for later. Agree on scope and price before work starts.'],
  ['E · Execute', 'Explore options, experiment with a pilot, and measure results with users. Deliver the agreed solution with documentation and training.'],
  ['S · Support', 'Help owners take over, review feedback, and agree on improvements or ongoing support.'],
] as const;
export const articles = [
  'How to choose your first workflow to automate',
  'What to measure in an AI pilot',
  'Getting your data ready for an AI assistant',
  'A practical guide to Power Platform governance',
  'When to use Power Apps, Power Automate, or both',
  'Designing human review into AI workflows',
  'How to hand over an automation sustainably',
  'When your team is ready to scale a pilot',
];
export const faq = [
  ['Do we need Microsoft 365?', 'It depends on the solution. We review your current licences and identify any additional requirements before proposing work.'],
  ['How do you keep our data safe?', 'We agree on data access, permissions, and appropriate controls with your IT team. We use approved data and document who can access it.'],
  ['How long does it take?', 'The duration depends on scope, access, and testing. The Offers page shows typical durations for fixed-scope work.'],
  ['How does pricing work?', 'We agree on scope, deliverables, and price before work starts. Changes are discussed and agreed separately.'],
  ['Will AI replace our staff?', 'We focus on reducing routine work and helping staff make better decisions. People remain responsible for decisions that require judgement.'],
  ['Can you work with our existing IT team?', 'Yes. We can work within your team’s security, deployment, and support processes.'],
  ['Do you work remotely?', 'Yes. Discovery, delivery, training, and support can be organised remotely.'],
  ['What if we are not ready for AI?', 'We can map the process, address data gaps, or start with straightforward automation.'],
] as const;
