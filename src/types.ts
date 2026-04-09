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
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}

export interface PageContent {
  home: {
    hero: { title: string; subtitle: string; desc: string };
    whoWeAre: { title: string; desc: string; image: string };
    whyChooseUs: { title: string; desc: string; cards: { title: string; desc: string }[] };
    productLifecycle: { title: string; desc: string; image: string };
  };
  about: {
    hero: { title: string; subtitle: string; desc: string };
    story: { title: string; subtitle: string; p1: string; p2: string; p3: string; image: string };
    founder: { quote: string; desc: string; name: string; role: string };
    leadership: { title: string; team: { name: string; role: string; bio: string; image: string }[] };
    philosophy: { title: string; desc: string; items: { icon: string; title: string; desc: string }[] };
    mission: { title: string; desc: string };
    vision: { title: string; desc: string };
  };
  contact: {
    address: string;
    phone: string;
    email: string;
  };
}
