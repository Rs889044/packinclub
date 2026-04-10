import fs from "fs";
import path from "path";
import type { Product, Blog, Contact, SiteSettings, PageContent, Enquiry, CallbackRequest, Testimonial } from "@/types";

const dataDir = path.join(process.cwd(), "data");
const productsFile = path.join(dataDir, "products.json");
const blogsFile = path.join(dataDir, "blogs.json");
const contactsFile = path.join(dataDir, "contacts.json");
const settingsFile = path.join(dataDir, "settings.json");
const contentFile = path.join(dataDir, "content.json");
const enquiriesFile = path.join(dataDir, "enquiries.json");
const callbacksFile = path.join(dataDir, "callbacks.json");
const testimonialsFile = path.join(dataDir, "testimonials.json");

const defaultSettings: SiteSettings = {
  favicon: "",
  enableWhatsApp: false,
  enableCallback: false,
  socialLinks: {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: ""
  }
};

const defaultContent: PageContent = {
  home: {
    hero: { title: "Packaging that <span class=\"text-brand-forest italic\">returns</span><br />to the earth", subtitle: "CPCB-Certified &bull; 100% Plant-Based", desc: "India's trusted partner for sustainable, durable, and CPCB-certified eco-packaging solutions. Replace single-use plastic without compromising strength." },
    whoWeAre: { title: "Replacing plastic, <span class=\"text-brand-forest italic\">one package</span> at a time", desc: "At Packin Club, we help brands replace plastic with certified compostable packaging — without compromising on strength, durability, or quality. Based in Delhi, we serve e-commerce, retail, food delivery, logistics, and agriculture industries across India.\n\nOur products are 100% plant-based, fully decompose within 180 days, and match the performance of conventional plastic. Every bag, film, and pouch we make is a step towards a plastic-free future.", image: "" },
    whyChooseUs: {
      title: "The smart switch to compostable",
      desc: "Trusted by businesses across India to deliver sustainable packaging that performs.",
      cards: [
        { title: "100% Plant-Based", desc: "Every product is made from renewable, plant-derived materials that fully decompose." },
        { title: "Strength of Plastic", desc: "Our compostable products match the durability and performance of conventional plastic." },
        { title: "CPCB-Certified", desc: "All manufacturing partners are CPCB-certified, meeting India's highest standards." },
        { title: "Fully Customizable", desc: "Custom printing, sizing, and branding options for your unique business needs." },
        { title: "Widest Range in India", desc: "24+ compostable product types across retail, industrial, and agriculture." },
        { title: "Dedicated Support", desc: "Personal account management and responsive customer support for every client." }
      ]
    },
    productLifecycle: { title: "Product Lifecycle", desc: "Our compostable products decompose naturally within months, returning safely to the earth without leaving microplastics or toxins behind.", image: "" }
  },
  about: {
    hero: { title: "Every revolution starts with a moment of <span class=\"text-brand-forest italic\">realization</span>", subtitle: "About Us", desc: "For us, it was two." },
    story: {
      image: "",
      title: "From challenge to <span class=\"text-brand-forest italic\">opportunity</span>",
      subtitle: "Our Story",
      p1: "When India announced the single-use plastic ban, it wasn't just a policy change — it was personal. Coming from a second-generation plastic film trading family, our founder, Vikas Jha, saw both challenge and opportunity.",
      p2: "At the same time, a casual coffee meeting with a friend from Spain exposed the harsh realities behind so-called \"eco-friendly alternatives\" like paper straws — products that often fall short in real-world performance.",
      p3: "Packin Club was born from a simple but powerful question: <span class=\"font-semibold text-brand-charcoal\">Can we build packaging that's safe, strong, and truly sustainable?</span>"
    },
    founder: { quote: "I couldn't accept that the cost of convenience should be human health or nature's future.", desc: "That's why we're building packaging that's safe, strong, and truly sustainable — for businesses, for families, and for tomorrow. It's not just about what we make; it's about what we leave behind.", name: "Vikas Jha", role: "Founder, Packin Club" },
    leadership: {
      title: "Meet the team behind the mission",
      team: [
        { name: "Vikas Jha", role: "Founder", bio: "MBA in Marketing & Operations, second-generation entrepreneur. Experience in sales, marketing and branding across startups, trading, and sustainability-driven projects.", image: "👨‍💼" },
        { name: "Rajat Sharma", role: "Co-founder", bio: "Passionate about innovation, engineering, and building solutions for a plastic-free future. Drives operations and product development at Packin Club.", image: "👨‍💻" }
      ]
    },
    philosophy: {
      title: "Impact Through Innovation", desc: "We believe in building a business that serves both commerce and the planet.",
      items: [
        { icon: "🔬", title: "Science Over Shortcuts", desc: "We back every claim with research, testing, and certified manufacturing." },
        { icon: "🤝", title: "Partnerships Over Transactions", desc: "We build long-term relationships with brands who share our vision." },
        { icon: "🌍", title: "Planet Over Profit", desc: "Every business decision is filtered through its environmental impact." },
        { icon: "📐", title: "Quality Without Compromise", desc: "Compostable doesn't mean weak — our products match plastic in strength." }
      ]
    },
    mission: { title: "Our Mission", desc: "To eliminate single-use plastic from India's packaging ecosystem by providing compostable alternatives that match plastic in strength, affordability, and convenience — empowering every business to make the sustainable switch." },
    vision: { title: "Vision 2030", desc: "To make compostable packaging the default choice across India — serving over 10,000 businesses, diverting millions of kilograms of plastic from landfills, and proving that sustainability and profitability can grow together." }
  },
  contact: {
    address: "D-1/64, 21st Century Business Centre, Veer Savarkar Block, Shakarpur, Nirman Vihar, Delhi-110092",
    phone: "+91 81784 14360",
    email: "orders@packinclub.com"
  }
};

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

// --- Products ---
export function getProducts(): Product[] {
  if (!fs.existsSync(productsFile)) return [];
  return JSON.parse(fs.readFileSync(productsFile, "utf-8"));
}

export function saveProducts(products: Product[]) {
  ensureDir();
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

// --- Blogs ---
export function getBlogs(): Blog[] {
  if (!fs.existsSync(blogsFile)) return [];
  return JSON.parse(fs.readFileSync(blogsFile, "utf-8"));
}

export function saveBlogs(blogs: Blog[]) {
  ensureDir();
  fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
}

// --- Contacts ---
export function getContacts(): Contact[] {
  if (!fs.existsSync(contactsFile)) return [];
  const raw = fs.readFileSync(contactsFile, "utf-8");
  return JSON.parse(raw);
}

export function saveContacts(contacts: Contact[]) {
  ensureDir();
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
}

// --- Settings ---
export function getSettings(): SiteSettings {
  if (!fs.existsSync(settingsFile)) return defaultSettings;
  try {
    const raw = fs.readFileSync(settingsFile, "utf-8");
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: SiteSettings) {
  ensureDir();
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
}

// --- Content ---
export function getContent(): PageContent {
  if (!fs.existsSync(contentFile)) return defaultContent;
  try {
    const raw = fs.readFileSync(contentFile, "utf-8");
    return { ...defaultContent, ...JSON.parse(raw) };
  } catch {
    return defaultContent;
  }
}

export function saveContent(content: PageContent) {
  ensureDir();
  fs.writeFileSync(contentFile, JSON.stringify(content, null, 2));
}

// --- Enquiries ---
export function getEnquiries(): Enquiry[] {
  if (!fs.existsSync(enquiriesFile)) return [];
  return JSON.parse(fs.readFileSync(enquiriesFile, "utf-8"));
}

export function saveEnquiries(enquiries: Enquiry[]) {
  ensureDir();
  fs.writeFileSync(enquiriesFile, JSON.stringify(enquiries, null, 2));
}

// --- Callback Requests ---
export function getCallbacks(): CallbackRequest[] {
  if (!fs.existsSync(callbacksFile)) return [];
  return JSON.parse(fs.readFileSync(callbacksFile, "utf-8"));
}

export function saveCallbacks(callbacks: CallbackRequest[]) {
  ensureDir();
  fs.writeFileSync(callbacksFile, JSON.stringify(callbacks, null, 2));
}

// --- Testimonials ---
export function getTestimonials(): Testimonial[] {
  if (!fs.existsSync(testimonialsFile)) return defaultTestimonials;
  try {
    return JSON.parse(fs.readFileSync(testimonialsFile, "utf-8"));
  } catch {
    return defaultTestimonials;
  }
}

export function saveTestimonials(testimonials: Testimonial[]) {
  ensureDir();
  fs.writeFileSync(testimonialsFile, JSON.stringify(testimonials, null, 2));
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Mehta",
    company: "GreenBox E-commerce",
    role: "Head of Operations",
    quote: "Switching to Packin Club's compostable mailers was one of the best decisions for our brand. Our customers love the eco-friendly packaging, and the quality is on par with conventional plastic.",
    rating: 5,
    visible: true,
  },
  {
    id: 2,
    name: "Rahul Kapoor",
    company: "FreshBite Deliveries",
    role: "Supply Chain Manager",
    quote: "We needed food-grade compostable packaging that could handle hot and cold items. Packin Club delivered exactly what we needed — certified, durable, and affordable at scale.",
    rating: 5,
    visible: true,
  },
  {
    id: 3,
    name: "Anita Sharma",
    company: "NatureGro Nurseries",
    role: "Director",
    quote: "The agricultural mulching films from Packin Club have been a game-changer. They decompose right into the soil after use — no cleanup needed. Truly innovative products.",
    rating: 5,
    visible: true,
  },
];
