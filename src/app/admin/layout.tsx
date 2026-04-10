"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", group: "Main" },
  { href: "/admin/products", label: "Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", group: "Main" },
  { href: "/admin/blogs", label: "Blogs", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", group: "Main" },
  { href: "/admin/contacts", label: "Contacts", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", group: "Main" },
  { href: "/admin/enquiries", label: "Enquiries", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", group: "Main" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", group: "Main" },
  { href: "/admin/pages/home", label: "Home Content", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", group: "Pages" },
  { href: "/admin/pages/about", label: "About Us Content", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", group: "Pages" },
  { href: "/admin/pages/contact", label: "Contact Content", icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z", group: "Pages" },
  { href: "/admin/pages/products", label: "Products Content", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", group: "Pages" },
  { href: "/admin/pages/blog", label: "Blog Content", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", group: "Pages" },
  { href: "/admin/settings", label: "Global Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", group: "Global" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Don't render admin layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-brand-sand flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-brand-charcoal transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="Packin Club" width={140} height={29} className="h-7 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white/40 text-xs mt-2">Admin Panel</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
            {["Main", "Pages", "Global"].map(group => (
              <div key={group}>
                <div className="px-4 text-xs font-bold text-white/30 uppercase tracking-wider mb-2">{group}</div>
                <div className="space-y-1">
                  {navItems.filter(item => item.group === group).map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? "bg-brand-forest text-white shadow-lg shadow-brand-forest/20"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon} />
                        </svg>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-brand-pale sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-brand-pale transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5 text-brand-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div className="hidden lg:block">
              <h2 className="text-sm font-medium text-brand-gray">
                {navItems.find(n => pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href)))?.label || "Admin"}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-forest/10 flex items-center justify-center text-sm">
                👤
              </div>
              <span className="text-sm font-medium text-brand-charcoal hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
