export const tocItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'project', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'recommendation', label: 'Recommendations' },
  { id: 'faq', label: 'FAQ' },
] as const;

export const aboutParagraphs = [
  `I moved from Amazon delivery operations into Reliability Maintenance & Engineering (RME) in September 2026. My background includes inspecting tools, reading construction drawings, and reporting conveyor wear and safety hazards on the warehouse floor.`,
  `I'm building experience in electrical and mechanical troubleshooting, preventive maintenance, and verifying equipment after a repair. To practice controls on my own, I built a Raspberry Pi Pico conveyor fault trainer and a PLC ladder logic simulator.`,
];

export interface Recommendation {
  quote: string;
  name: string;
  role: string;
  context: string;
  avatarSrc?: string;
}

export const recommendations: Recommendation[] = [
  {
    quote: `"He took ownership of the login page design and truly excelled in this area, diving deep into design principles and creating something he could be genuinely proud of. Despite facing significant time management challenges due to his demanding role at Amazon during Prime Day, Anthony remained committed to the project and continued pushing forward. He also tackled one of his biggest growth areas—mastering Git—showing remarkable determination to expand his technical toolkit even when time was limited."`,
    name: 'Naomi Carrigan',
    role: 'Senior Software Engineer & Founder of NHCarrigan',
    context: 'Hackathon mentor · LinkedIn recommendation, July 2025',
    avatarSrc: '/assets/images/naomi-carrigan.jpg',
  },
  {
    quote: `"It was a pleasure being Anthony's supervisor at DCX8 Delivery Station. Throughout my time working with him, he consistently demonstrated initiative, reliability, a strong eagerness to learn, and adaptability. He brings a genuine teamwork mentality, while also proving he can take ownership of tasks independently and meet deadlines on his own. His strong communication skills allow him to convey and receive information clearly, accurately, and effectively. Given his drive to learn and grow, Anthony would be a valuable addition to any Mechatronic Apprentice team."`,
    name: 'Brenda Munguia',
    role: 'Learning Trainer, Amazon.com Services LLC',
    context: 'Former supervisor (Process Assistant) at DCX8 Delivery Station · Slack message',
  },
];

export interface TimelineItem {
  date: string;
  title: string;
  titleDim?: string;
  org: string;
  badge:
    | { kind: 'amazon' }
    | { kind: 'image'; src: string; alt: string }
    | { kind: 'text'; text: string };
  bullets: string[];
}

export const timeline: TimelineItem[] = [
  {
    date: 'Sep 2026 – Present',
    title: 'Mechatronic Apprentice I',
    org: 'Amazon · Reliability Maintenance & Engineering',
    badge: { kind: 'amazon' },
    bullets: [
      'Promoted from Amazon delivery station operations on September 27, 2026.',
      'Completed **NFPA 70E electrical safety training**, **AR Robin Zones 1 & 2**, and **Amnesty Blitz** through Amazon.',
    ],
  },
  {
    date: 'Nov 2024 – Sep 2026',
    title: 'Warehouse Associate',
    titleDim: '(Seasonal to Regular)',
    org: 'Amazon.com Services LLC',
    badge: { kind: 'amazon' },
    bullets: [
      'Reported **conveyor speed and mechanical wear** after noticing packages overshooting hampers, giving maintenance a chance to investigate before a breakdown',
      'Escalated a **blocked fire extinguisher** to site safety and maintenance. Earned 4 Safe & Secure awards and a Bias for Action pin',
      'Checked that **scanners and handheld devices worked and were updated** before each shift',
      'Developed a U-boat pre-staging method that **cut end-of-shift compaction from 10+ U-boats to zero**, freeing up 3 associates for other work',
      'Sustained **500–550 units/hour in stow, 25% above site average**, across **flexible shifts including nights and weekends**',
    ],
  },
  {
    date: 'Aug – Nov 2024',
    title: 'Construction Intern / Trade Trainee',
    org: 'Sun Country Builders',
    badge: {
      kind: 'image',
      src: '/assets/images/logos/sun-country-builders.webp',
      alt: 'Sun Country Builders logo',
    },
    bullets: [
      'Assisted with framing and drywall installation on Azure Apartments, an **87-unit affordable housing conversion** in Anaheim',
      '**Read blueprints and took field measurements**, flagging code and quality issues before sign-off during job site walkarounds with the superintendent',
      'Inspected and maintained tools before each use, including blade changes and ladder/scaffolding checks, per site safety protocol',
    ],
  },
  {
    date: 'Feb – May 2024',
    title: 'Construction Trades Trainee',
    titleDim: '(Vocational Coursework)',
    org: 'Hope Builders',
    badge: {
      kind: 'image',
      src: '/assets/images/logos/hope-builders.jpg',
      alt: 'Hope Builders logo',
    },
    bullets: [
      'Completed full-time construction trades training covering carpentry, electrical basics, **construction math**, safety, and materials handling',
      'Earned **OSHA-10 and Heartsaver CPR/AED** certifications',
      'Served as **team lead** on a carpentry demolition project, directing task sequencing among trainees to stay on schedule',
    ],
  },
  {
    date: 'Aug 2023 – Jan 2024',
    title: 'Handyman Assistant',
    titleDim: '(Residential Installation & Repair)',
    org: 'Independent Residential Work',
    badge: { kind: 'text', text: 'IR' },
    bullets: [
      'Completed carpentry, repair, and installation jobs across multiple residential clients, **managing scheduling and safety independently**',
      '**Troubleshot and resolved** issues with door hardware, light fixtures, and other household components',
    ],
  },
];

export const skillGroups = [
  {
    title: 'Equipment & Troubleshooting',
    tags: [
      'Conveyor & Material Handling Equipment Familiarity',
      'Tool Inspection & Maintenance',
      'Blueprint Reading & Field Measurements',
      'Residential Mechanical & Electrical Repair',
    ],
  },
  {
    title: 'Controls Projects',
    tags: [
      'Raspberry Pi Pico & GPIO Wiring',
      'PLC Ladder Logic Simulation',
      'Start, Stop, Fault & Reset Logic',
      'Simulated Fault Testing',
    ],
  },
  {
    title: 'Safety & Maintenance Training',
    tags: [
      'NFPA 70E Electrical Safety Training',
      'Hazard Identification & Escalation',
      'AR Robin & Robotics Floor Safety Training',
      'Preventive Maintenance Fundamentals',
    ],
  },
  {
    title: 'Operations',
    tags: [
      'Equipment Readiness Checks',
      'Process Improvement',
      'Shift Coordination',
      'Microsoft Office (Word, Excel, Outlook)',
    ],
  },
];

export const certifications = [
  {
    title: 'AR Robin, Zones 1 & 2',
    org: 'Amazon internal training on the Robin robotic package sorting system',
  },
  {
    title: 'Amnesty Blitz',
    org: 'Amazon internal training for robotics floor cleanup and retrieval of dropped items',
  },
  { title: 'NFPA 70E Electrical Safety Training', org: 'Completed through Amazon' },
  { title: 'OSHA-10 Construction Safety and Health', org: 'Hope Builders' },
  {
    title: 'Heartsaver First Aid CPR AED',
    org: 'American Heart Association, via CPR Training Center, Alhambra',
  },
  {
    title: 'Master PLC Programming',
    org: 'Ladder logic and PLC programming fundamentals, via Alison',
  },
  {
    title: 'Total Productive Maintenance (TPM)',
    org: 'Preventive and reliability-centered maintenance strategies, via Alison',
  },
  { title: 'High School Diploma / GED', org: 'High School Equivalency, completed 2026' },
];

export const faqs = [
  {
    q: 'What controls work do your projects demonstrate?',
    a: 'I wired a Raspberry Pi Pico trainer and built a browser-based ladder logic simulator. Both demonstrate how a simulated conveyor responds to a jam, how the fault stays latched, and what reset does before a restart. The PLC work is a simulation.',
  },
  {
    q: 'What robotics training have you completed?',
    a: 'At Amazon, I earned internal certifications for **AR Robin Zones 1 & 2** and **Amnesty Blitz**. My personal projects focus on controls, including fault interlocks, ladder logic, and PLC scan cycles.',
  },
  {
    q: 'When did you join Amazon RME?',
    a: 'I started as a **Mechatronic Apprentice I** on **September 27, 2026**, after working in Amazon delivery station operations.',
  },
  {
    q: 'Can you provide references?',
    a: '**Yes, available upon request**, including from my current manager and a member of the RME team.',
  },
];
