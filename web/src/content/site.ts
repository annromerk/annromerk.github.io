export const heroStats = [
  { value: 3, suffix: '+', label: 'Years hands-on experience' },
  { value: 3, suffix: '', label: 'Projects built' },
  { value: 7, suffix: '', label: 'Certifications earned' },
] as const;

export const tocItems = [
  { id: 'about', label: 'About' },
  { id: 'project', label: 'Projects' },
  { id: 'recommendation', label: 'Recommendations' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'faq', label: 'FAQ' },
] as const;

export const aboutParagraphs = [
  `I got my start in construction trades and warehouse work, and got good at catching problems early: a safety hazard, a worn part, a tool about to fail. That's what pulled me toward mechatronics.`,
  `I taught myself the basics of mechatronics and built a conveyor fault simulator with a Raspberry Pi Pico. On September 27, 2026, I moved from Amazon delivery operations into Reliability Maintenance & Engineering (RME) as a Mechatronic Apprentice I.`,
  `Longer term, my goal is to grow from MRA into an Automation Engineer Apprentice (AEA) role within Amazon RME.`,
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
    bullets: ['Promoted from Amazon delivery station operations on September 27, 2026.'],
  },
  {
    date: 'Nov 2024 – Sep 2026',
    title: 'Warehouse Associate',
    titleDim: '(Seasonal to Regular)',
    org: 'Amazon.com Services LLC',
    badge: { kind: 'amazon' },
    bullets: [
      'Identified and escalated a blocked fire extinguisher OSHA violation (29 CFR 1910.157(c)(1)); closed by WHS/RME, earning **4 Safe and Secure awards and a Bias for Action pin**',
      'Spotted a warehouse-wide conveyor speed issue and reported the resulting **mechanical wear before it caused equipment failure**',
      'Developed a continuous-improvement U-boat pre-staging method that **cut end-of-shift compaction from 10+ U-boats to zero**, freeing up 3 associates for other workflow',
      'Verified scanners and handheld devices were functional before every shift, **ensuring equipment availability and preventing workflow disruption**',
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
    title: 'Maintenance & Troubleshooting',
    tags: [
      'Mechanical & Electrical Troubleshooting',
      'Equipment Fault Diagnosis',
      'Conveyor & MHE Systems',
      'Preventative & Predictive Maintenance',
      'Blueprint Reading & Measurement Interpretation',
      'Electrical Schematic Reading (Ladder Diagrams)',
      'Tool & Equipment Maintenance',
    ],
  },
  {
    title: 'Safety & Compliance',
    tags: [
      'Safety Hazard Identification & Reporting',
      'SOP Compliance & Verification',
      'Operational Excellence',
    ],
  },
  {
    title: 'Operations',
    tags: [
      'Metrics Tracking & Reporting',
      'Workflow & Production Goal Management',
      'Work Area Organization',
      'Flexible Scheduling & Overtime',
    ],
  },
  {
    title: 'Applied Thinking',
    tags: [
      'Independent Judgment & Decision Making',
      'Problem Solving & Analytical Thinking',
      'Cross-Functional Communication',
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
  { title: 'NFPA Electrical Cycle of Safety', org: 'Electrical safety training completed through Amazon' },
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
    q: 'Have you completed the Mechanical Aptitude Test for this program?',
    a: "Yes. I've already **taken and passed the Mechanical Aptitude Test** through OnDemand Assessment as part of this hiring process.",
  },
  {
    q: 'Have you done classroom-style training before?',
    a: 'Yes. At Hope Builders I completed training that combined **classroom workshops with on-the-job learning**, the same format this apprenticeship uses.',
  },
  {
    q: 'Do you have hands-on experience with industrial controls or PLCs?',
    a: 'Yes. I completed a **Master PLC Programming** course, then built a **ladder logic simulator** to put that learning into practice, translating the same fault-interlock logic from my Raspberry Pi Pico trainer into real ladder notation. All of it came from what I was already seeing on the floor at Amazon.',
  },
  {
    q: 'What robotics training have you completed?',
    a: 'At Amazon, I earned internal certifications for **AR Robin Zones 1 & 2** and **Amnesty Blitz**. My personal projects focus on controls, including fault interlocks, ladder logic, and PLC scan cycles.',
  },
  {
    q: 'How do I know these projects are actually yours?',
    a: 'Fair question. The **ladder logic simulator is live on this page**, not a screenshot. Click Jam and watch the fault-interlock lock everything out, then hit Reset and watch it recover.',
  },
  {
    q: 'Do you have a math background for this kind of work?',
    a: 'Yes. Hope Builders required **basic math and algebra** just to qualify for the program, and **Construction Math** was part of the curriculum alongside blueprint reading and framing.',
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
