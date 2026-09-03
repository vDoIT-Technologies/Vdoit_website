export interface ServiceItem {
  id: string;
  title: string;
  category: 'genai' | 'agents' | 'vision' | 'cloud-data' | 'software';
  tagline: string;
  description: string;
  features: string[];
  businessImpact: string;
  iconName: string;
  badge: string;
  /** Card artwork. Falls back to the drawn ServiceArtwork when absent. */
  image?: string;
  /** Short loop played over the still on hover. */
  video?: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  aiUseCases: string[];
  keyOutcome: string;
  iconName: string;
  statNumber: string;
  statLabel: string;
}

export interface FounderProfile {
  name: string;
  role: string;
  experienceYears: string;
  usExperienceHighlight: string;
  bio: string;
  focusAreas: string[];
  linkedinUrl: string;
  initials: string;
}

export interface LinkedInPost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  fullContent?: string;
  /** Optional: only set these when the real figures are known. */
  reactionsCount?: number;
  commentsCount?: number;
  readTime?: string;
  tags: string[];
  linkedinUrl: string;
}

export interface JobOpening {
  id: string;
  title: string;
  discipline: string;
  level: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  stack: string[];
  summary: string;
  iconName: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  companyName: string;
  phone: string;
  serviceInterest: string;
  industry: string;
  timeline: string;
  budgetRange: string;
  projectDescription: string;
}

export interface AIEstimateResult {
  industry: string;
  workflow: string;
  dataReadiness: string;
  recommendedArchitecture: string;
  estimatedTimeline: string;
  expectedROI: string;
  suggestedServices: string[];
}

/** A delivered client engagement, shown on the Success Stories page. */
export interface CaseStudy {
  id: string;
  /** The client, as they should be named publicly. */
  client: string;
  /** Short label for the selector rail. */
  shortName: string;
  project: string;
  sector: string;
  year: string;
  /** One line that says what the engagement was. */
  summary: string;
  /** What we actually did — three to four bullets. */
  outcomes: string[];
  /** The single number worth leading with, and what it counts. */
  metric: string;
  metricLabel: string;
  image: string;
  /** Dashboards fill the frame; logos and phone screens must not be cropped. */
  fit?: 'cover' | 'contain';
}

/** A product VDOIT has built and taken to market. */
export interface ProductItem {
  id: string;
  name: string;
  category: 'ai' | 'web3' | 'platform';
  tagline: string;
  description: string;
  highlights: string[];
  /** The market or reach fact worth surfacing on the card. */
  marketNote?: string;
  image: string;
  /** Screenshots fill the frame; device shots and diagrams must not be cropped. */
  fit?: 'cover' | 'contain';
}

/** A client mark for the logo wall. */
export interface ClientLogo {
  name: string;
  src: string;
}

/** Management team and advisory board share one shape. */
export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  focusAreas?: string[];
  linkedinUrl?: string;
}

/** A certification, partnership, or award. */
export interface Credential {
  label: string;
  detail: string;
}
