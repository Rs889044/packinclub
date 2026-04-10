"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppWidget from "./WhatsAppWidget";
import RequestCallbackWidget from "./RequestCallbackWidget";
import type { SiteSettings, PageContent } from "@/types";

interface LayoutShellProps {
  children: React.ReactNode;
  settings: SiteSettings;
  content: PageContent;
}

export default function LayoutShell({ children, settings, content }: LayoutShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer socialLinks={settings.socialLinks} contact={content.contact} />
      <WhatsAppWidget enabled={settings.enableWhatsApp} phone={content.contact.phone} />
      <RequestCallbackWidget enabled={settings.enableCallback} />
    </>
  );
}
