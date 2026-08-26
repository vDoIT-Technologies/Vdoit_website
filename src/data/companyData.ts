import { ServiceItem, IndustryItem, FounderProfile, LinkedInPost, JobOpening } from '../types';

export const COMPANY_INFO = {
  name: 'VDO IT Technologies Limited',
  shortName: 'VDOIT',
  previousDomain: 'www.vdoit.com',
  foundedYear: '2015',
  yearsOfExcellence: '10+',
  foundersExperience: '15+ Years (US & Global)',
  primaryEmail: 'narinder.kamra@vdoit.in',
  inquiryEmail: 'inquiries@vdoit.in',
  corporateLocation: 'Global Delivery: US & India Tech Hubs',
  headline: 'Pioneering Enterprise AI & Value-Oriented Digital Engineering Since 2015',
  subheadline: 'Founded by tech veterans with extensive US leadership experience, VDO IT Technologies delivers mission-critical AI systems, autonomous agents, and enterprise cloud solutions designed to create measurable business growth.',
  tagline: 'World-Class AI. Proven Enterprise Heritage. Tangible ROI.',
  stats: [
    { label: 'Founded in', value: '2015', sub: 'Over a decade of trusted tech delivery' },
    { label: 'Leadership Pedigree', value: '15+ Yrs', sub: 'US & Global Enterprise Track Record' },
    { label: 'Systems Delivered', value: '200+', sub: 'Enterprise Platforms & AI Solutions' },
    { label: 'Client Retention', value: '98.4%', sub: 'Long-term value creation partnerships' },
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
    linkedinUrl: 'https://www.linkedin.com/company/vdoit-technologies-limited/',
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
    badge: 'Core Focus'
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
    badge: 'High ROI'
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
    badge: 'Data-Driven'
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
    badge: 'Industrial Grade'
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
    badge: 'Foundation'
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
    id: 'post-1',
    title: 'Moving Beyond Chatbots: Why Autonomous Enterprise AI Agents are the Real Paradigm Shift',
    date: 'August 2026',
    category: 'Enterprise AI Thought Leadership',
    excerpt: 'Over the last three years, VDO IT Technologies has focused heavily on taking AI from simple conversational wrappers to full autonomous multi-agent systems that connect with enterprise ERPs and CRM APIs.',
    fullContent: 'Many organizations got stuck experimenting with standalone AI chatbots. In 2026, the true ROI comes from autonomous agents that execute multi-step business logic, verify constraints against compliance rules, and reduce human operational bottlenecks. At VDOIT, we engineer these governed workflows with full auditability.',
    reactionsCount: 142,
    commentsCount: 28,
    readTime: '4 min read',
    tags: ['#EnterpriseAI', '#AIAgents', '#VDOIT', '#DigitalTransformation'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoit-technologies-limited/'
  },
  {
    id: 'post-2',
    title: 'From 2015 to 2026: A Decade of Delivering True Value to Global Clients',
    date: 'July 2026',
    category: 'Company Milestone & Vision',
    excerpt: 'Co-Founders Narendra Kumar Kamra and Neetu Gupta reflect on 10+ years of growth at VDO IT Technologies Limited, bridging US technology standards with agile global engineering.',
    fullContent: 'When we established VDOIT in 2015 after 15+ years of US and global corporate experience, we committed to one simple thesis: no vanity engineering, only measurable value. Today, as our focus accelerates across Generative AI and predictive systems, that same founding principle guides every line of code we ship.',
    reactionsCount: 215,
    commentsCount: 46,
    readTime: '3 min read',
    tags: ['#VDOITHeritage', '#FoundersStory', '#Leadership', '#TechExcellence'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoit-technologies-limited/'
  },
  {
    id: 'post-3',
    title: 'Private LLM Deployment: How to Achieve Zero IP Leakage in Highly Regulated Sectors',
    date: 'June 2026',
    category: 'Engineering & Security Briefing',
    excerpt: 'A deep dive by VDOIT’s AI Engineering Squad on deploying on-premise and VPC-isolated open models with vector RAG pipelines for healthcare and banking clients.',
    fullContent: 'Enterprise clients cannot risk sending proprietary intellectual property or patient health info to shared multi-tenant endpoints. Here is the reference architecture our engineering squad uses for zero-egress data security.',
    reactionsCount: 178,
    commentsCount: 34,
    readTime: '6 min read',
    tags: ['#GenerativeAI', '#DataPrivacy', '#CyberSecurity', '#CloudAI'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoit-technologies-limited/'
  },
  {
    id: 'post-4',
    title: 'Computer Vision on the Edge: Eliminating Manufacturing Defects in Sub-50ms',
    date: 'May 2026',
    category: 'Industry 4.0 Case Study',
    excerpt: 'How VDOIT deployed custom TensorRT models directly onto edge devices on a manufacturing assembly line, catching microscopic defects in real time.',
    fullContent: 'Cloud latency is often too high for fast-moving factory conveyor belts. By compressing neural network weights and deploying on local edge hardware, we achieved 99.4% QA accuracy with zero production slowdown.',
    reactionsCount: 129,
    commentsCount: 19,
    readTime: '5 min read',
    tags: ['#ComputerVision', '#EdgeAI', '#Industry40', '#Automation'],
    linkedinUrl: 'https://www.linkedin.com/company/vdoit-technologies-limited/'
  }
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
