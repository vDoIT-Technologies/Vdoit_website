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
  reactionsCount: number;
  commentsCount: number;
  readTime: string;
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
