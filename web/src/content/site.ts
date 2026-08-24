export const heroStats = [
  { value: 3, suffix: '+', label: 'Years hands-on experience' },
  { value: 3, suffix: '', label: 'Projects built' },
  { value: 5, suffix: '', label: 'Certifications earned' },
] as const;

export const tocItems = [
  { id: 'about', label: 'About' },
  { id: 'project', label: 'Projects' },
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'faq', label: 'FAQ' },
] as const;

export const aboutParagraphs = [
  `I got my start in construction trades and warehouse work, and got good at catching problems early: a safety hazard, a worn part, a tool about to fail. That's what pulled me toward mechatronics.`,
  `In 2026 I taught myself the basics and built a working fault-simulation trainer to prove I could take it from theory to actual hardware. Now I'm looking for a Mechatronics & Robotics Apprenticeship or similar maintenance role, learning under experienced RME technicians.`,
];

export const recommendation = {
  quote: `"He took ownership of the login page design and truly excelled in this area, diving deep into design principles and creating something he could be genuinely proud of. Despite facing significant time management challenges due to his demanding role at Amazon during Prime Day, Anthony remained committed to the project and continued pushing forward. He also tackled one of his biggest growth areas—mastering Git—showing remarkable determination to expand his technical toolkit even when time was limited."`,
  cite: 'Naomi Carrigan, Senior Software Engineer & Founder of NHCarrigan, hackathon mentor. LinkedIn recommendation, July 2025.',
};

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
    date: 'Nov 2024 – Present',
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
    q: 'Are you willing to relocate for this role?',
    a: "Yes. I've been working toward a transfer into RME and have **saved up to self-fund the move**, so relocation and the training program aren't a barrier.",
  },
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
    q: 'Do you have hands-on experience with robotics specifically?',
    a: "Not with robotic hardware yet. My hands-on work so far has been **PLC and controls-focused** (fault-interlock logic, ladder programming, scan-cycle timing), the same control-systems foundation robotic material handling equipment runs on, and it's exactly what I want to build on inside RME.",
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
    q: 'When could you start?',
    a: "**Immediately.** I don't have a notice period or scheduling conflict on my end, so timing is flexible and works around your team's.",
  },
  {
    q: 'Can you provide references?',
    a: '**Yes, available upon request**, including from my current manager and a member of the RME team.',
  },
];
