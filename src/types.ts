export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  longDescription?: string;
  image?: string;
  featured?: boolean;
  keyFeatures?: string[];
  applications?: string[];
  faqs?: { question: string; answer: string }[];
  gallery?: string[];
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  content: string;
  thumbnail?: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message?: string;
  createdAt: string;
}

export interface SiteSettings {
  favicon: string;
  enableWhatsApp: boolean;
  whoWeAreImage: string;
  productLifeCycleImage: string;
  whyChooseUsImages: string[];
}
