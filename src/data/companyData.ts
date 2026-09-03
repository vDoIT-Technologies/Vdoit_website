import {
  ServiceItem,
  IndustryItem,
  FounderProfile,
  LinkedInPost,
  JobOpening,
  CaseStudy,
  ProductItem,
  ClientLogo,
  TeamMember,
  Credential,
} from '../types';

export const COMPANY_INFO = {
  name: 'VDO IT Technologies Limited',
  shortName: 'VDOIT',
  previousDomain: 'www.vdoit.com',
  foundedYear: '2015',
  yearsOfExcellence: '10+',
  foundersExperience: '15+ Years (US & Global)',
  primaryEmail: 'narinder.kamra@vdoit.in',
  inquiryEmail: 'info@vdoit.in',
  phone: '+91-8800665460',
  address: 'Gurugram, India',
  corporateLocation: 'Gurugram, India & Las Vegas, USA',
  linkedinUrl: 'https://www.linkedin.com/company/vdoitech/',
  /** From the LinkedIn company page. Will drift — refresh occasionally. */
  linkedinFollowers: '6,000+',
  headline: 'Pioneering Enterprise AI & Value-Oriented Digital Engineering Since 2015',
  subheadline: 'Founded by tech veterans with extensive US leadership experience, VDO IT Technologies delivers mission-critical AI systems, autonomous agents, and enterprise cloud solutions designed to create measurable business growth.',
  tagline: 'Simplified AI for the World.',
  /** Figures below are the ones stated in the official portfolio deck. */
  stats: [
    { label: 'Founded in', value: '2015', sub: 'From two people to 100+ engineers' },
    { label: 'Projects delivered', value: '200+', sub: 'Government, enterprise and product' },
    { label: 'Global clients', value: '100+', sub: 'Served across India, US and UAE' },
    { label: 'Certified to', value: 'ISO 27001', sub: 'And ISO 9001:2015. MSME registered' },
  ],
};

export const FOUNDERS: FounderProfile[] = [
  {
    name: 'Narendra Kumar Kamra',
    role: 'Co-Founder & Chief Executive Officer',
    experienceYears: '15+ Years US & Global Tech Leadership',
    usExperienceHighlight: 'Extensive Silicon Valley & US Enterprise Consulting Background',
    bio: 'With over 15 years of technology leadership across the United States and global digital ecosystems, Narendra founded VDO IT Technologies in 2015 with a singular conviction: delivering high-value, client-centric engineering without enterprise bloat. Over the past three years, he has led VDOIT’s strategic evolution into cutting-edge enterprise AI, large language model orchestration, and predictive business intelligence.',
    focusAreas: ['Enterprise AI Strategy', 'Large-Scale System Architecture', 'US & Global Client Success', 'Generative AI Modernization'],
    linkedinUrl: 'https://www.linkedin.com/in/narinder-kamra-721200b/',
    initials: 'NK',
  },
  {
    name: 'Neetu Gupta',
    role: 'Co-Founder & Director of Operations & Strategy',
    experienceYears: '15+ Years Enterprise Strategy & Governance',
    usExperienceHighlight: 'International Operations & Cross-Border Delivery Excellence',
    bio: 'Neetu co-founded VDO IT Technologies in 2015, bringing deep strategic foresight and rigorous operational leadership honed across international technology markets. She oversees VDOIT’s global project delivery governance, client relationship value management, and rapid talent upskilling in state-of-the-art AI workflows, ensuring every client deployment translates to bottom-line profitability.',
    focusAreas: ['Global Delivery Operations', 'Client Value Optimization', 'Responsible AI Governance', 'Cross-Border Tech Partnerships'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoitech/',
    initials: 'NG',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'genai-llm',
    category: 'genai',
    title: 'Generative AI & Custom Enterprise LLMs',
    tagline: 'Private, secure domain-adapted AI pipelines for enterprise intelligence.',
    description: 'We design and deploy production-grade Retrieval-Augmented Generation (RAG) frameworks, fine-tuned proprietary models, and domain-specialized AI assistants that interact securely with your enterprise data without IP leakage.',
    features: [
      'Enterprise RAG Architecture on Private Vector Databases',
      'Fine-Tuned Open Source & Commercial LLM Systems (Llama, Gemini, Claude)',
      'Intelligent Multimodal Document & Data Processing (OCR + Semantic Extraction)',
      'Zero-Data-Retention & Strict Enterprise Privacy Firewalls',
      'AI Guardrails, Hallucination Prevention & Compliance Audits'
    ],
    businessImpact: 'Reduces manual document analysis time by up to 85% while guaranteeing 100% intellectual property containment.',
    iconName: 'Sparkles',
    badge: 'Core Focus',
    image: '/images/services/genai-llm.jpg',
    video: '/videos/services/genai-llm.mp4'
  },
  {
    id: 'ai-agents',
    category: 'agents',
    title: 'Autonomous Enterprise AI Agents & Workflow Automation',
    tagline: 'Self-orchestrating intelligent agents that execute multi-step operations.',
    description: 'Move beyond basic chatbots. We architect autonomous AI agents capable of reasoning, calling enterprise APIs, verifying intermediate outputs, and orchestrating complex cross-departmental operations with human-in-the-loop oversight.',
    features: [
      'Multi-Agent Collaborative Networks (Hierarchical & Swarm Logic)',
      'Legacy ERP, CRM & Database API Tool Calling',
      'Autonomous Customer Support & Intelligent Ticket Resolution',
      'Financial Reconciliation & Procurement Automation',
      'Real-time Operational Anomaly Correction'
    ],
    businessImpact: 'Automates up to 60% of repetitive operational touchpoints, accelerating transaction cycle times 4x.',
    iconName: 'Bot',
    badge: 'High ROI',
    image: '/images/services/ai-agents.jpg',
    video: '/videos/services/ai-agents.mp4'
  },
  {
    id: 'predictive-ml',
    category: 'genai',
    title: 'Predictive Intelligence & Advanced Machine Learning',
    tagline: 'Convert historical business data into forward-looking competitive advantage.',
    description: 'Leveraging mathematically rigorous statistical algorithms and deep learning models, we build predictive engines that forecast market demand, anticipate supply chain disruptions, identify customer churn risks, and prevent fraud.',
    features: [
      'Dynamic Demand & Price Elasticity Forecasting',
      'Real-Time Fraud Detection & Risk Scoring Engines',
      'Customer Lifetime Value (CLV) & Churn Prediction Models',
      'Predictive Equipment Maintenance for Industrial IoT',
      'Continuous MLOps Pipelines with Auto-Retraining'
    ],
    businessImpact: 'Lowers inventory carrying costs by 28% and mitigates high-value operational risk before it manifests.',
    iconName: 'TrendingUp',
    badge: 'Data-Driven',
    image: '/images/services/predictive-ml.jpg',
    video: '/videos/services/predictive-ml.mp4'
  },
  {
    id: 'computer-vision',
    category: 'vision',
    title: 'Computer Vision & Edge Intelligence',
    tagline: 'High-speed visual recognition and automated optical analysis.',
    description: 'From industrial defect detection on assembly lines to healthcare diagnostic imaging and retail foot-traffic analytics, our computer vision engineers deploy ultra-fast neural networks to edge hardware and cloud infrastructures.',
    features: [
      'High-Speed Defect Inspection & Quality Assurance (QA)',
      'Real-Time Video Stream Analytics & Security Intelligence',
      'Automated Facial & Biometric Access Verification',
      'Spatial Analytics & Heatmapping for Retail / Smart Infrastructure',
      'Optimized Edge AI Deployment (TensorRT, ONNX, Coral)'
    ],
    businessImpact: 'Eliminates 99.4% of manufacturing escape defects while operating at sub-50ms inference latencies.',
    iconName: 'ScanEye',
    badge: 'Industrial Grade',
    image: '/images/services/computer-vision.jpg',
    video: '/videos/services/computer-vision.mp4'
  },
  {
    id: 'cloud-modernization',
    category: 'cloud-data',
    title: 'Cloud Modernization & Data Engineering',
    tagline: 'Scalable cloud foundations engineered for real-time AI workloads.',
    description: 'AI is only as good as the underlying data architecture. We re-platform legacy monolithic architectures into cloud-native, microservices-driven ecosystems on AWS, GCP, and Azure with robust data lakehouses and streaming pipelines.',
    features: [
      'Real-Time Data Pipelines (Kafka, Spark, Snowflake, BigQuery)',
      'Microservices & Serverless Cloud Architecture (Kubernetes, Docker)',
      'Secure CI/CD & Automated Infrastructure as Code (Terraform)',
      'SOC2, HIPAA, & GDPR Compliant Cloud Hardening',
      'Cloud FinOps Optimization to reduce redundant compute expenditure'
    ],
    businessImpact: 'Cuts infrastructure overhead by 35% while establishing unified data readiness for real-time AI models.',
    iconName: 'Database',
    badge: 'Foundation',
    image: '/images/services/cloud-modernization.jpg',
    video: '/videos/services/cloud-modernization.mp4'
  },
  {
    id: 'custom-software',
    category: 'software',
    title: 'Mission-Critical Enterprise Software & Mobile Apps',
    tagline: 'Precision-engineered web, mobile, and SaaS platforms built to scale.',
    description: 'Drawing from 10+ years of custom engineering excellence, we build resilient, high-traffic web applications, cross-platform mobile apps, and proprietary SaaS platforms that power day-to-day operations for global market leaders.',
    features: [
      'Full-Stack Web Engineering (React, Node, Python, Go, TypeScript)',
      'Cross-Platform iOS & Android Mobile Applications (React Native, Flutter, Swift)',
      'Multi-Tenant SaaS Platform Development with Stripe/Billing Integration',
      'High-Throughput RESTful & GraphQL Enterprise APIs',
      'Rigorous Automated Testing & Zero-Downtime Release Strategies'
    ],
    businessImpact: 'Accelerates time-to-market by 50% with clean, maintainable, enterprise-grade codebase ownership.',
    iconName: 'Code2',
    badge: 'Proven 10+ Yrs'
  }
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    tagline: 'HIPAA-compliant AI diagnostic aids and patient lifecycle orchestration.',
    description: 'Transforming clinical workflows with AI medical record summarization, automated diagnostic image triage, patient scheduling agents, and secure telehealth infrastructure.',
    aiUseCases: [
      'Clinical Notes Auto-Summarization & EHR Integration',
      'Diagnostic Imaging Anomaly Pre-Screening',
      'Automated Insurance Claims Pre-Authorization',
      'Personalized Patient Triage AI Chatbots'
    ],
    keyOutcome: '99.2% accuracy in claims data extraction, reducing administrative workload by 70%.',
    iconName: 'Activity',
    statNumber: '70%',
    statLabel: 'Admin Overhead Reduced'
  },
  {
    id: 'fintech',
    name: 'Banking, FinTech & Insurance',
    tagline: 'Secure, real-time fraud mitigation and algorithmic compliance.',
    description: 'Empowering financial institutions with AI underwriting, instant AML/KYC verification, algorithmic credit assessment, and conversational banking interfaces.',
    aiUseCases: [
      'Sub-second Fraud Detection & Transaction Scoring',
      'Automated KYC Document Verification & Biometrics',
      'Loan Underwriting & Alternative Credit Scoring',
      'Wealth Advisory & Portfolio Rebalancing Copilots'
    ],
    keyOutcome: '$14M+ in mitigated fraudulent transactions across global client portfolios.',
    iconName: 'ShieldCheck',
    statNumber: '<10ms',
    statLabel: 'Fraud Detection Latency'
  },
  {
    id: 'logistics',
    name: 'Supply Chain & Smart Logistics',
    tagline: 'Predictive routing, warehouse automation, and dynamic freight optimization.',
    description: 'Eliminating dead miles and inventory bottlenecks through AI route optimization, computer vision parcel tracking, and dynamic demand forecasting.',
    aiUseCases: [
      'Dynamic Fleet Dispatch & Fuel-Optimal Routing',
      'Warehouse Computer Vision Package Dimensioning',
      'Supplier Disruption Prediction & Early Warnings',
      'Autonomous Freight Brokerage & Rate Bidding'
    ],
    keyOutcome: '32% decrease in fleet turnaround time and 22% fuel expenditure savings.',
    iconName: 'Truck',
    statNumber: '32%',
    statLabel: 'Turnaround Accelerated'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industry 4.0',
    tagline: 'Zero-defect visual QA and predictive machinery maintenance.',
    description: 'Integrating industrial IoT sensor telemetry with edge computer vision to stop equipment breakdowns before they happen and automate quality control.',
    aiUseCases: [
      'Edge Camera Visual Defect Identification on Assembly Lines',
      'Vibration & Thermal Sensor Predictive Maintenance',
      'Automated Bill-of-Materials (BOM) Digitalization',
      'Production Yield & Energy Consumption Optimization'
    ],
    keyOutcome: 'Reduced unscheduled plant downtime by 41% across high-precision facilities.',
    iconName: 'Factory',
    statNumber: '41%',
    statLabel: 'Downtime Prevented'
  },
  {
    id: 'retail',
    name: 'Retail, E-Commerce & D2C',
    tagline: 'Hyper-personalized customer journeys and intelligent inventory management.',
    description: 'Driving conversion rates with AI recommendation engines, dynamic price adjustments, automated product cataloging, and intelligent conversational shopping.',
    aiUseCases: [
      'Semantic Search & Visual Product Discovery',
      'Hyper-Personalized Recommendation Engines',
      'Automated Multilingual Catalog Copy Generation',
      'Dynamic Markdown & Markdown Timing Optimization'
    ],
    keyOutcome: '27% uplift in average order value (AOV) and 35% higher search conversion.',
    iconName: 'ShoppingBag',
    statNumber: '+27%',
    statLabel: 'Average Order Value Lift'
  },
  {
    id: 'realestate',
    name: 'Real Estate & Smart Infrastructure',
    tagline: 'Intelligent building automation, valuation AI, and property management agents.',
    description: 'Modernizing property ecosystems through automated lease contract intelligence, predictive energy management, and smart valuation models.',
    aiUseCases: [
      'Automated Lease Document Parsing & Covenant Tracking',
      'Predictive HVAC & Energy Optimization in Commercial Towers',
      'Automated Comparative Market Analysis (CMA) Models',
      'Virtual Tenant Concierge & Maintenance Dispatch Agents'
    ],
    keyOutcome: '24% energy conservation and 80% faster lease verification cycles.',
    iconName: 'Building2',
    statNumber: '24%',
    statLabel: 'Energy Cost Savings'
  }
];

export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    id: 'post-careers',
    title: 'Impact-driven work, a modern stack, and room to move fast',
    date: 'September 2026',
    category: 'Life at VDOIT',
    excerpt:
      'What career progression actually looks like here: real ownership early, a modern technology stack, and the room to move at the pace the work demands.',
    tags: ['#Careers', '#ITJobs', '#VDOIT'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoitech/',
  },
  {
    id: 'post-ai-not-a-race',
    title: 'AI is not a race. It is a business decision.',
    date: 'September 2026',
    category: 'Perspective',
    excerpt:
      'Adopting every new tool is not a strategy. The question is which architecture fits your business — and having the discipline to say no to the rest.',
    tags: ['#EnterpriseAI', '#AIStrategy'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoitech/',
  },
  {
    id: 'post-vdoit-2',
    title: 'Introducing VDOIT 2.0',
    date: 'August 2026',
    category: 'Announcement',
    excerpt:
      'Subject matter expertise combined with AI — solving complex business problems through strategic consulting rather than tooling for its own sake.',
    tags: ['#VDOIT2', '#AIConsulting'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoitech/',
  },
  {
    id: 'post-gen-z',
    title: 'What Gen Z expects from every experience',
    date: 'August 2026',
    category: 'Perspective',
    excerpt:
      'Personalised, intelligent, and immediate is now the floor rather than the differentiator — which is why we build for hyper-personalisation and autonomous operations.',
    tags: ['#Personalisation', '#CustomerExperience'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoitech/',
  },
  {
    id: 'post-caio',
    title: 'Aman Sharma joins as Chief AI Officer',
    date: 'August 2026',
    category: 'Announcement',
    excerpt:
      'Bringing focus to enterprise AI adoption and modernisation strategy for our clients.',
    tags: ['#Leadership', '#EnterpriseAI'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoitech/',
  },
];

export const TIMELINE_MILESTONES = [
  {
    year: '2015',
    title: 'Founding & US-Grade Engineering Standards',
    description: 'Founded by Narendra Kumar Kamra and Neetu Gupta following 15+ years of US and global enterprise technology experience. Established the core vision of high-value, client-first digital engineering.'
  },
  {
    year: '2018',
    title: 'Global Expansion & Enterprise Cloud Modernization',
    description: 'Scaled delivery footprint across the United States, Europe, and APAC. Delivered over 100+ mission-critical cloud platforms, SaaS systems, and enterprise data solutions.'
  },
  {
    year: '2021',
    title: 'Strategic Pivot to Predictive AI & Machine Learning',
    description: 'Invested in dedicated AI labs. Began deploying predictive maintenance, fraud detection, and automated computer vision solutions for Fortune 500 and high-growth mid-market clients.'
  },
  {
    year: '2023 - Present',
    title: 'Frontier Enterprise Generative AI & Autonomous Agent Hub',
    description: 'Deepened core focus into advanced Generative AI, RAG enterprise pipelines, autonomous multi-agent workflows, and private model governance for global market leaders.'
  }
];

export const ADVANTAGES = [
  {
    title: '15+ Years US Leadership Pedigree',
    description: 'Founded by senior leaders with direct Silicon Valley and US corporate delivery heritage, ensuring communication clarity, rigorous standards, and strategic alignment.',
    icon: 'Award'
  },
  {
    title: 'Established 2015 Track Record',
    description: 'Unlike early-stage AI startups, we bring over a decade of continuous operational stability, mature SDLC frameworks, and 200+ verified enterprise deployments.',
    icon: 'Building'
  },
  {
    title: 'Zero "Hype AI" — 100% Value & ROI',
    description: 'We do not build novelty AI. Every architecture is mapped directly to key business metrics: cost reduction, throughput increase, or new revenue generation.',
    icon: 'Target'
  },
  {
    title: 'Strict IP Protection & Data Security',
    description: 'Complete data isolation with private VPC deployments, enterprise encryption, role-based access control, and absolute code/data ownership for your company.',
    icon: 'Lock'
  },
  {
    title: 'End-to-End Execution Under One Roof',
    description: 'From strategy and feasibility audits to data engineering, AI fine-tuning, UI/UX, and post-deployment MLOps, we handle the full lifecycle.',
    icon: 'Layers'
  },
  {
    title: 'Agile & High-Velocity Global Delivery',
    description: 'Round-the-clock delivery cycles bridging US timezones with specialized AI engineering squads for rapid iteration and rapid time-to-value.',
    icon: 'Zap'
  }
];

export const CAREERS_INFO = {
  eyebrow: 'IT Jobs at VDOIT',
  headline: 'Build AI systems that actually ship',
  subheadline:
    'We hire engineers who want production ownership, not ticket queues. Small squads, direct access to founders, and enterprise problems that are genuinely hard.',
  perks: [
    {
      title: 'Ship to production in week one',
      description: 'No six-week onboarding theatre. You get repo access, a real ticket, and a reviewer on day one.',
      iconName: 'Rocket',
    },
    {
      title: 'Frontier AI, not demo AI',
      description: 'RAG at enterprise scale, multi-agent orchestration, private model governance — deployed, monitored, and paid for.',
      iconName: 'Cpu',
    },
    {
      title: 'Remote-first, globally distributed',
      description: 'US and India delivery hubs with async-first practice. Output is measured, hours are not.',
      iconName: 'Globe2',
    },
    {
      title: 'Learning budget that gets used',
      description: 'Dedicated upskilling time each cycle for certifications, research papers, and internal AI labs.',
      iconName: 'GraduationCap',
    },
  ],
};

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'genai-engineer',
    title: 'Generative AI Engineer',
    discipline: 'AI Engineering',
    level: 'Mid to Senior',
    location: 'India / Remote',
    workMode: 'Remote',
    stack: ['Python', 'LangGraph', 'RAG', 'Vector DBs', 'AWS Bedrock'],
    summary:
      'Design and ship retrieval pipelines and agent workflows that run inside client VPCs under real compliance constraints.',
    iconName: 'Sparkles',
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    discipline: 'Applied ML',
    level: 'Mid to Senior',
    location: 'India / Remote',
    workMode: 'Remote',
    stack: ['PyTorch', 'MLOps', 'Snowflake', 'Airflow', 'Kubernetes'],
    summary:
      'Own forecasting and risk-scoring models end to end — feature pipelines, training, deployment, and drift monitoring.',
    iconName: 'TrendingUp',
  },
  {
    id: 'fullstack-engineer',
    title: 'Senior Full-Stack Engineer',
    discipline: 'Product Engineering',
    level: 'Senior',
    location: 'India / Hybrid',
    workMode: 'Hybrid',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    summary:
      'Build the enterprise surfaces around our AI systems: dashboards, review consoles, and internal tooling clients live in daily.',
    iconName: 'Code2',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Engineer',
    discipline: 'Platform',
    level: 'Mid to Senior',
    location: 'India / Remote',
    workMode: 'Remote',
    stack: ['Terraform', 'Kubernetes', 'CI/CD', 'Azure', 'Observability'],
    summary:
      'Run the infrastructure our deployments land on — private VPCs, reproducible environments, and uptime that holds under audit.',
    iconName: 'Cloud',
  },
  {
    id: 'product-designer',
    title: 'Product Designer (AI Interfaces)',
    discipline: 'Design',
    level: 'Mid to Senior',
    location: 'Remote',
    workMode: 'Remote',
    stack: ['Figma', 'Design Systems', 'Prototyping', 'Accessibility'],
    summary:
      'Make complex AI output legible and trustworthy. You will design the moments where people decide whether to trust a model.',
    iconName: 'Palette',
  },
  {
    id: 'delivery-lead',
    title: 'Technical Delivery Lead',
    discipline: 'Delivery',
    level: 'Senior',
    location: 'India / Hybrid',
    workMode: 'Hybrid',
    stack: ['Agile', 'Stakeholder Management', 'Solution Architecture'],
    summary:
      'Bridge enterprise stakeholders and engineering squads — scope, sequence, and land programmes without losing technical depth.',
    iconName: 'Users2',
  },
];

/* ------------------------------------------------------------------------ *
 * Portfolio data — transcribed from the official VDOIT Technologies Ltd.
 * portfolio deck. Every figure below appears in that document; nothing here
 * is estimated. When the deck is reissued, update this block against it.
 * ------------------------------------------------------------------------ */

export const VISION_MISSION = {
  vision: {
    label: 'Vision',
    statement: 'Simplify the world.',
    body:
      'Technology earns its place when it removes complexity rather than relocating it. We build systems that make large organisations easier to run — for the people inside them, and for the citizens and customers they serve.',
  },
  mission: {
    label: 'Mission',
    statement: 'Be the tech enabler, not the tech vendor.',
    body:
      'Deliver simple, high-quality solutions that accelerate business growth — through agile delivery, sustained investment in R&D, and engineering standards that hold up to ISO and government audit.',
  },
} as const;

/** Certifications, partnerships and recognition, straight from the deck. */
export const CREDENTIALS: Credential[] = [
  { label: 'ISO 9001:2015', detail: 'Quality management systems, certified' },
  { label: 'ISO 27001:2013', detail: 'Information security management, certified' },
  { label: 'MSME registered', detail: 'Government of India' },
  { label: 'Tableau Partner', detail: 'Registered partner' },
  { label: 'IBM Watson Partner', detail: 'Affiliated partner' },
  { label: 'ET MSME Awards 2023', detail: 'Nominated, The Economic Times' },
  { label: 'Top 10 Most Admired', detail: 'Companies in India, 2023' },
];

export const OFFICES = [
  {
    country: 'India',
    city: 'Gurugram',
    address: '912, Emaar Palm Square, Sector-66, Golf Course Ext Rd, Gurugram 122011',
  },
  {
    country: 'USA',
    city: 'Las Vegas',
    address: '3960 Howard Hughes Parkway, Suite 500, Paradise, Las Vegas, NV 89169',
  },
  {
    country: 'UAE',
    city: 'Dubai',
    address: '1517, 15th Floor, Burjuman Business Tower, Mankhool, Bur Dubai',
  },
];

/** The six domains the deck organises the business around. */
export const BUSINESS_DOMAINS = [
  {
    name: 'Public Sector & E-Governance',
    detail:
      'E-governance portals, e-readers, training platforms, premises security, smart villages, drone solutions, and AI/ML content management.',
  },
  {
    name: 'Hi-Tech',
    detail:
      'Blockchain and Web3 platforms, AI-based systems, IoT deployments, and data science solutions.',
  },
  {
    name: 'Education & E-Learning',
    detail:
      'Learning management systems, ERP and CRM, webinar platforms, accreditation portals, and assessment tooling.',
  },
  {
    name: 'FinTech & Audit',
    detail:
      'Remittance portals, auditing platforms, rewards systems, asset management, multi-layer marketing, and GDPR compliance.',
  },
  {
    name: 'Sports Tech',
    detail:
      'League and tournament management platforms, and fantasy sports applications.',
  },
  {
    name: 'Operational Efficiency',
    detail:
      'ERP and CRM, national real-estate board integrations, multilingual AI chatbots, and AR/VR.',
  },
];

/** How the company sells its capacity, as listed in the deck. */
export const OFFERINGS = [
  'Development & System Integration',
  'Managed IT Services',
  'Data Privacy Services',
  'Staff Augmentation',
  'Audits, Consultancy & Trainings',
  'On-Site & Off-Shore Delivery Model',
];

export const MANAGEMENT_TEAM: TeamMember[] = [
  {
    name: 'Narendra Kumar Kamra',
    role: 'Co-Founder & Chief Executive Officer',
    initials: 'NK',
    bio: 'Founded VDOIT in 2015 after 15+ years of technology leadership across the United States and global digital ecosystems. Leads the strategic evolution into enterprise AI, large language model orchestration, and predictive business intelligence.',
    focusAreas: ['Enterprise AI Strategy', 'System Architecture', 'Global Client Success'],
    linkedinUrl: 'https://www.linkedin.com/in/narinder-kamra-721200b/',
  },
  {
    name: 'Neetu Gupta',
    role: 'Co-Founder & Director, Operations & Strategy',
    initials: 'NG',
    bio: 'Co-founded VDOIT in 2015, bringing operational leadership honed across international technology markets. Oversees global delivery governance, client value management, and talent development across the engineering organisation.',
    focusAreas: ['Global Delivery Operations', 'Responsible AI Governance', 'Partnerships'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoitech/',
  },
  {
    name: 'Aman Sharma',
    role: 'Chief AI Officer',
    initials: 'AS',
    bio: 'Leads enterprise AI adoption and modernisation strategy for VDOIT clients, translating frontier model capability into systems that survive procurement, audit, and production load.',
    focusAreas: ['Enterprise AI Adoption', 'Modernisation Strategy'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoitech/',
  },
];

/**
 * Advisory board.
 *
 * Intentionally empty: the portfolio deck names no advisers, and inventing
 * them would misrepresent the company. Add real entries here and the About
 * page renders the band automatically — no component change needed.
 */
export const ADVISORY_BOARD: TeamMember[] = [];

/** The seven engagements the deck leads with. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'mod-army-design-bureau',
    client: 'Ministry of Defence',
    shortName: 'MoD — Army Design Bureau',
    project: 'Army Design Bureau — project management',
    sector: 'Defence',
    year: 'Government of India',
    summary:
      'A single command view over defence R&D projects that had been tracked across disconnected systems.',
    outcomes: [
      'Consolidated data from multiple sources into one unified project management system',
      'Designed a tracking mechanism for milestones and deliverables across defence projects',
      'Built predictive charts forecasting project timelines, resource allocation, and risk',
    ],
    metric: 'Predictive',
    metricLabel: 'Timeline, resource & risk forecasting',
    image: '/images/work/mod-army-design-bureau.jpg',
  },
  {
    id: 'mod-ai-ml-tableau',
    client: 'Ministry of Defence',
    shortName: 'MoD — Offline AI/ML',
    project: 'Tableau dashboards on an offline AI/ML model',
    sector: 'Defence',
    year: 'Government of India',
    summary:
      'Predictive intelligence inside an air-gapped environment, where sending data to a hosted model was never an option.',
    outcomes: [
      'Built and trained AI/ML models entirely offline to meet data security and privacy protocols',
      'Integrated model output into Tableau dashboards as AI-driven predictive insight',
      'Delivered decision support without any data leaving the secure perimeter',
    ],
    metric: 'Air-gapped',
    metricLabel: 'Models trained fully offline',
    image: '/images/work/mod-ai-ml-tableau.jpg',
  },
  {
    id: 'maharashtra-gst',
    client: 'Government of Maharashtra',
    shortName: 'Maharashtra GST',
    project: 'GST Department — AI fraud detection',
    sector: 'Public finance',
    year: 'State Government',
    summary:
      'Tax fraud identified by model rather than by sampling, surfaced to inspectors as a dashboard they already knew how to read.',
    outcomes: [
      'Designed Tableau dashboards integrated with AI models to identify and mitigate tax fraud',
      'Enabled detailed visualisation and analysis of GST data for compliance and enforcement',
      'Put model findings in front of enforcement staff without retraining them on a new tool',
    ],
    metric: 'AI-led',
    metricLabel: 'Tax fraud detection & enforcement',
    image: '/images/work/maharashtra-gst.jpg',
  },
  {
    id: 'odisha-cm-dashboard',
    client: 'Government of Odisha',
    shortName: 'Odisha CM Dashboard',
    project: 'Chief Minister’s multi-departmental dashboard',
    sector: 'E-governance',
    year: 'State Government',
    summary:
      'Four flagship state programmes, four different departments, one dashboard the Chief Minister’s office actually opens.',
    outcomes: [
      'Biju Swasthya Kalyan Yojana — healthcare scheme insights',
      'Jaga Mission — urban housing and land rights tracking',
      'Rural Housing Odisha — monitoring of rural housing projects',
      'Mission Shakti — women’s empowerment and self-help group initiatives',
    ],
    metric: '4',
    metricLabel: 'Flagship schemes on one dashboard',
    image: '/images/work/odisha-cm-dashboard.jpg',
  },
  {
    id: 'beml',
    client: 'BEML India',
    shortName: 'BEML India',
    project: 'Product management dashboards',
    sector: 'Heavy manufacturing',
    year: 'Public sector enterprise',
    summary:
      'Product data from across the lines pulled into one place, then pushed forward into forecasts.',
    outcomes: [
      'Streamlined product-related data into a centralised system for enhanced visibility',
      'Built dashboards monitoring project timelines and deliverables across product lines',
      'Created prediction charts forecasting product performance and operational bottlenecks',
    ],
    metric: 'Centralised',
    metricLabel: 'Product data across every line',
    image: '/images/work/beml.jpg',
  },
  {
    id: 'naco',
    client: 'NACO',
    shortName: 'NACO — AIDS awareness',
    project: 'AIDS Awareness Application',
    sector: 'Public health',
    year: 'Ministry of Health & Family Welfare',
    summary:
      'Launched by the Health Minister on World AIDS Day 2016, and still the reference for how public health reaches people who will not read a pamphlet.',
    outcomes: [
      'Gamified awareness content, plus an HIV risk evaluator for self-assessment',
      'Connects users to the nearest HIV centres, blood banks, Suraksha clinics, ART and ICTC centres',
      'Lists social protection schemes covering nutrition, financial assistance and transport',
      'Available in 12 regional languages',
    ],
    metric: '10,000+',
    metricLabel: 'Play Store downloads',
    image: '/images/work/naco.jpg',
    fit: 'contain',
  },
  {
    id: 'nsdc-epustakalaya',
    client: 'NSDC',
    shortName: 'NSDC — Kaushal e-Pustakalaya',
    project: 'Kaushal e-Pustakalaya — Android eBook reader',
    sector: 'Skills & education',
    year: 'Ministry of Skill Development',
    summary:
      'A skilling library that fits in a PMKVY candidate’s pocket, and works on the move rather than only inside a centre.',
    outcomes: [
      'Android eBook reader giving PMKVY candidates access to skilling content anytime, anywhere',
      'Simple navigation and bookmarking, with many titles readable without NSDC registration',
      'Admin application lets the NSDC team analyse total user engagement and usage statistics',
      '200+ subjects covered across the catalogue',
    ],
    metric: '20,000+',
    metricLabel: 'eBooks in the library',
    image: '/images/work/nsdc-epustakalaya.jpg',
    fit: 'contain',
  },
];

/** Delivered engagements that do not need a full case study to count. */
export const MORE_ENGAGEMENTS: CaseStudy[] = [
  {
    id: 'ncert-parakh',
    client: 'NCERT',
    shortName: 'NCERT — Parakh',
    project: 'Parakh assessment & ICT asset management',
    sector: 'Education',
    year: 'Ministry of Education',
    summary:
      'Large-scale assessment of teaching faculty, plus mobile-camera auditing of equipment across 10,000+ ICT centres.',
    outcomes: [
      'Pan-India assessment platform covering 50,000+ faculty associated with NCERT',
      'Asset management app scanning equipment at 10,000+ ICT centres via mobile camera',
      'Collected equipment data pushed to a central unit for evaluation',
    ],
    metric: '50,000+',
    metricLabel: 'Faculty assessable pan-India',
    image: '/images/work/ncert-parakh.jpg',
    fit: 'contain',
  },
  {
    id: 'cdac',
    client: 'C-DAC',
    shortName: 'C-DAC',
    project: 'Advanced computing training & licensing',
    sector: 'Research & training',
    year: 'Government of India',
    summary:
      'Training delivery and technology adoption for India’s Centre for Development of Advanced Computing.',
    outcomes: [
      'Delivered training sessions equipping professionals with advanced computing skills',
      'Facilitated the sale of 25 software licences, driving adoption across the organisation',
    ],
    metric: '25',
    metricLabel: 'Software licences deployed',
    image: '/images/work/cdac.jpg',
  },
  {
    id: 'tamil-nadu-rdpr',
    client: 'Rural Development & Panchayat Raj, Tamil Nadu',
    shortName: 'Tamil Nadu RD&PR',
    project: 'Public grievances & welfare scheme tracking',
    sector: 'E-governance',
    year: 'State Government',
    summary:
      'Grievance handling and welfare scheme tracking brought onto one system for a state-wide department.',
    outcomes: [
      'Streamlined public grievance handling and welfare scheme tracking',
      'Sold 14 software licences, improving operational efficiency in public welfare initiatives',
    ],
    metric: '14',
    metricLabel: 'Software licences deployed',
    image: '/images/work/tamil-nadu-rdpr.jpg',
  },
  {
    id: 'smart-villages-vietnam',
    client: 'Smart Villages, Vietnam',
    shortName: 'Smart Villages — Vietnam',
    project: 'Smart village programme under the Act East policy',
    sector: 'International development',
    year: 'Indo-Pacific programme',
    summary:
      'VDOIT met the Prime Minister of Vietnam to discuss smart villages, then surveyed the concept in Ho Nam city.',
    outcomes: [
      'Jagruti digital help desk — voice-enabled kiosks explaining government schemes',
      'Tele-medicine — virtual clinics for prescriptions and medical counselling',
      'Tele-education — digital e-learning systems in village schools',
      'Digital marketplace for handicraft manufacturers, plus drone agriculture and water ATMs',
    ],
    metric: '5',
    metricLabel: 'Modules scoped for deployment',
    image: '/images/work/smart-villages-vietnam.jpg',
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'florja',
    name: 'Florja',
    category: 'ai',
    tagline: 'AI/ML-based smart farming and gardening.',
    description:
      'Remote farm locations, a shortage of skilled workers, and significant climate change are the three problems Florja was built against. It manages plants and farms with far less human intervention than the alternative.',
    highlights: [
      'AI algorithms providing real-time data on soil status',
      'Long-range LoRaWAN sensors monitoring soil conditions',
      'Efficient management of plants and farms at distance',
    ],
    marketNote:
      'Government estates known for their gardens — parliament and supreme court grounds among them — can run the same system.',
    image: '/images/products/florja.jpg',
  },
  {
    id: 'edyou',
    name: 'edYOU',
    category: 'ai',
    tagline: 'Meta-human based education.',
    description:
      'An AI eLearning platform built on conversational and generative AI, offering interactive, voice-enabled learning. AI beings on the platform answer user concerns and queries in real time.',
    highlights: [
      'Interactive, voice-enabled learning experiences',
      'AI beings addressing user questions in real time',
      'Generative AI powering dynamic, two-way conversation',
    ],
    marketNote:
      'Suited to self-paced onboarding in government institutes — members could learn a new bill interactively rather than being handed a copy of it.',
    image: '/images/products/edyou.jpg',
  },
  {
    id: 'ahl-embrace',
    name: 'AHL Embrace',
    category: 'ai',
    tagline: 'AI-based medical platform.',
    description:
      'A customised LLM answering clinical questions against tailored datasets, fronted by an avatar patients can simply talk to. Built to streamline life for patients, doctors, and clinic owners alike.',
    highlights: [
      'Customised LLM for Q&A over extensive tailored datasets',
      'Multilingual — the avatar speaks any language in a native accent',
      'Voice and text interaction; the avatar can mimic any human voice',
      'Appointment booking and profile editing completed by conversation',
    ],
    image: '/images/products/ahl-embrace.jpg',
  },
  {
    id: 'twin-protocol',
    name: 'Twin Protocol',
    category: 'web3',
    tagline: 'Decentralised personal AI.',
    description:
      'Your data, ingested and held on the blockchain, driving a photo-realistic interactive avatar. Proprietary language models paired with neural-symbolic techniques from OpenCog for deep ecosystem analysis.',
    highlights: [
      'Human-like avatars — text, voice, and photo-realistic',
      'Personal data ingested from folders, interviews, articles, audio, email and video',
      'Custom-configured neural networks with OpenCog neural-symbolic techniques',
      'A marketplace ecosystem offering personalised user experiences',
    ],
    image: '/images/products/twin-protocol.jpg',
  },
  {
    id: 'sentience-wallet',
    name: 'Sentience Wallet',
    category: 'web3',
    tagline: 'Seamless blockchain transactions.',
    description:
      'A decentralised multi-currency wallet with Ledger hardware integration, built-in KYC, and a Web3 browser — engineered so security and regulatory compliance are not a trade-off against usability.',
    highlights: [
      'Multi-currency management with Ledger hardware wallet integration',
      'Integrated KYC for regulatory compliance',
      'Token swaps, asset bridging, and NFT portfolio management',
      'ERC-20 and ERC-721 compatibility across Ethereum and custom networks',
      'Built-in Web3 browser, iOS and Android access',
    ],
    image: '/images/products/sentience-wallet.jpg',
    fit: 'contain',
  },
  {
    id: 'dectec',
    name: 'Dectec',
    category: 'web3',
    tagline: 'Web3 decentralised blockchain governance.',
    description:
      'A Web3 platform helping traditional enterprises and fast-growing companies build and engage communities, and stay ahead of the disruption facing Web2 businesses.',
    highlights: [
      'Community building and engagement for Web2 companies',
      'Accessible via mobile, browser extension, and app',
      'Tools, technology, and support for organisations adopting Web3',
    ],
    marketNote:
      'Applicable to citizen engagement and transparency programmes, and to combating misinformation at scale.',
    image: '/images/products/dectec.jpg',
  },
  {
    id: 'ezeetelgo',
    name: 'EzeetelGo',
    category: 'platform',
    tagline: 'Unified communication application.',
    description:
      'A unified communications platform that removes the need for on-premises PBX hardware and makes every channel reachable from any device, with an AI layer analysing what was said.',
    highlights: [
      'All communications accessible on any device, no on-premises hardware',
      'Mobile and desktop apps with intercom and IVR',
      'AI module recording, transcribing, and analysing conversations',
      'Sentiment analysis reporting shared with clients',
      'Separate number for SMS, MMS, and e-fax, independent of the phone’s own',
    ],
    marketNote:
      'Canada’s PBX market exceeds USD 200 million; 100,000 B2B users expected.',
    image: '/images/products/ezeetelgo.jpg',
  },
  {
    id: 'pixnow',
    name: 'PixNow',
    category: 'platform',
    tagline: 'Advanced image processing and instant printing.',
    description:
      'Instant, high-quality photo printing from a mobile phone, with AI-based image enhancement built into the application. It began in jails, where 11.5 million prisoners globally have a UN-recognised right to communicate with the outside world.',
    highlights: [
      'Instant photo printing direct from mobile phones',
      'High-quality on-site printing hardware',
      'AI-based image enhancement in the app',
      'Expanding from jails to malls, metro stations, and wedding halls',
    ],
    marketNote:
      'Historic and tourist monuments under the Archaeological Survey of India can offer the same to visitors.',
    image: '/images/products/pixnow.jpg',
    fit: 'contain',
  },
  {
    id: 'avp',
    name: 'AVP',
    category: 'platform',
    tagline: 'Professional sports management.',
    description:
      'Built for American Volleyball Professional: players create teams, find ongoing tournaments, and enter at their location and age group, while organisers run leagues and events on the same platform.',
    highlights: [
      'Team creation and tournament discovery by location and age group',
      'Organiser tools for creating and managing leagues and tournaments',
      'Subscription-based commercial model',
    ],
    marketNote:
      'Directly transferable to cricket, football, badminton, and mass-participation events such as yoga.',
    image: '/images/products/avp.jpg',
  },
  {
    id: 'savemax',
    name: 'Savemax',
    category: 'platform',
    tagline: 'Real estate marketplace.',
    description:
      'A marketplace for property buyers and sellers with authentic listings integrated directly with Canadian real estate boards — transparency engineered into the data layer rather than promised in the copy.',
    highlights: [
      'Authentic listings integrated with Canadian real estate boards',
      'Hassle-free buying and selling experience',
      'Efficient control and management of property data for regulation',
    ],
    marketNote:
      'India lacks a centralised property database by property ID or MLS; the same model would address misinformation and fraud.',
    image: '/images/products/savemax.jpg',
  },
  {
    id: 'feasibility-pro',
    name: 'Feasibility Pro',
    category: 'platform',
    tagline: 'Financial analysis for large projects.',
    description:
      'AI/ML and big data applied to cost planning and budgeting for large projects across multiple industries, turning project data into decisions stakeholders can defend.',
    highlights: [
      'Profitability assessed on IRR, Net Present Value, and Profit Margin',
      'Sensitivity analysis showing what actually moves project viability',
      'Cost planning and budgeting for large-scale multi-industry projects',
    ],
    marketNote:
      'Applicable to assessing real estate project viability and evaluating public-private partnership opportunities.',
    image: '/images/products/feasibility-pro.jpg',
    fit: 'contain',
  },
];

/** Client marks for the logo wall, lifted from the deck's client page. */
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'NSDC', src: '/images/clients/nsdc.png' },
  { name: 'NCERT', src: '/images/clients/ncert.png' },
  { name: 'NACO', src: '/images/clients/naco.png' },
  { name: 'MSPDCL', src: '/images/clients/mspdcl.png' },
  { name: 'Hughes Systique', src: '/images/clients/hughes-systique.png' },
  { name: 'Exicom', src: '/images/clients/exicom.png' },
  { name: 'SingularityNET', src: '/images/clients/singularitynet.png' },
  { name: 'Twin Protocol', src: '/images/clients/twin-protocol.png' },
  { name: 'Dectec', src: '/images/clients/dectec.png' },
  { name: 'edYOU', src: '/images/clients/edyou.png' },
  { name: 'ezeetel', src: '/images/clients/ezeetel.png' },
  { name: 'PixNow', src: '/images/clients/pixnow.png' },
  { name: 'Save Max', src: '/images/clients/savemax.png' },
  { name: 'AVP', src: '/images/clients/avp.png' },
  { name: 'Florja', src: '/images/clients/florja.png' },
  { name: 'Feasibility.pro', src: '/images/clients/feasibility-pro.png' },
  { name: 'Awakening Health Lab', src: '/images/clients/awakening-health-lab.png' },
  { name: 'The NorthCap University', src: '/images/clients/northcap-university.png' },
  { name: 'Interteach', src: '/images/clients/interteach.png' },
  { name: 'Globtier', src: '/images/clients/globtier.png' },
  { name: 'DeReal', src: '/images/clients/dereal.png' },
  { name: 'Shoofly', src: '/images/clients/shoofly.png' },
  { name: 'Seven Cells', src: '/images/clients/seven-cells.png' },
  { name: 'Sophia', src: '/images/clients/sophia.png' },
  { name: 'SophiaVerse', src: '/images/clients/sophiaverse.png' },
  { name: 'Transcroll', src: '/images/clients/transcroll.png' },
  { name: 'fundPE', src: '/images/clients/fundpe.png' },
  { name: 'ICF', src: '/images/clients/icf.png' },
  { name: 'Pura Stays', src: '/images/clients/pura-stays.png' },
  { name: 'Remitax', src: '/images/clients/remitax.png' },
  { name: 'Rolling Stones India', src: '/images/clients/rolling-stones-india.png' },
  { name: 'OneClick', src: '/images/clients/oneclick.png' },
  { name: 'The Harmony', src: '/images/clients/the-harmony.png' },
];
