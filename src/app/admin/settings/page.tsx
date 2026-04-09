"use client";
import { useState, useEffect, FormEvent } from "react";
import type { SiteSettings } from "@/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    favicon: "",
    enableWhatsApp: false,
    whoWeAreImage: "",
    productLifeCycleImage: "",
    whyChooseUsCards: Array(6).fill({ title: "", desc: "" }),
    socialLinks: { facebook: "", twitter: "", instagram: "", linkedin: "", youtube: "" }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null); // tracks which field is uploading

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  async function handleUpload(file: File, fieldKey: keyof SiteSettings) {
    setUploading(fieldKey);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      
      if (data.url) {
        setSettings({ ...settings, [fieldKey]: data.url });
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
    setUploading(null);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    });
    setSaving(false);
    // Optional: show a success toast here
  }

  function removeImage(fieldKey: keyof SiteSettings) {
    setSettings({ ...settings, [fieldKey]: "" });
  }

  const renderUploadBox = (label: string, fieldKey: keyof SiteSettings) => {
    const currentValue = settings[fieldKey] as string;
    const isUploading = uploading === fieldKey;

    return (
      <div className="bg-brand-sand/50 p-4 rounded-xl border border-brand-pale">
        <label className="block text-sm font-medium text-brand-charcoal mb-3">{label}</label>
        {currentValue ? (
          <div className="relative w-full aspect-square md:aspect-auto md:h-32 rounded-xl overflow-hidden border border-brand-pale bg-white flex items-center justify-center">
            <img src={currentValue} alt={label} className="max-w-full max-h-full object-contain" />
            <button type="button" onClick={() => removeImage(fieldKey)}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 shadow-sm">✕</button>
          </div>
        ) : (
          <label className="block w-full h-32 border-2 border-dashed border-brand-pale rounded-xl flex items-center justify-center cursor-pointer hover:border-brand-forest/30 bg-white transition-all text-center px-4">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0], fieldKey); }} />
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-brand-gray text-sm">
                <div className="w-5 h-5 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
                Uploading...
              </div>
            ) : (
              <div>
                <div className="text-xl mb-1">🖼️</div>
                <p className="text-xs text-brand-gray">Upload Image</p>
              </div>
            )}
          </label>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-brand-gray">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8 p-6 bg-gradient-to-r from-brand-forest to-[#1A4533] rounded-2xl text-white shadow-lg overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10">
           <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Global Site Settings</h1>
           <p className="text-white/80 text-sm">Manage dynamic imagery across your public website without altering the codebase.</p>
         </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Global Configuration */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-6">
          <h2 className="font-display text-lg font-bold text-brand-charcoal border-b border-brand-pale pb-4">Global Configuration</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {renderUploadBox("Favicon (Browser Tab Icon)", "favicon")}
          </div>

          <label className="flex items-center gap-4 cursor-pointer mt-6 p-4 border border-brand-pale rounded-xl bg-brand-sand/30 hover:bg-brand-sand/50 transition-colors">
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.enableWhatsApp}
                onChange={(e) => setSettings({ ...settings, enableWhatsApp: e.target.checked })}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${settings.enableWhatsApp ? "bg-brand-forest" : "bg-brand-pale"}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform mt-0.5 ${settings.enableWhatsApp ? "translate-x-[22px]" : "translate-x-0.5"}`} />
              </div>
            </div>
            <div>
              <span className="block text-sm font-semibold text-brand-charcoal">Enable Floating WhatsApp Chat</span>
              <span className="block text-xs text-brand-gray mt-0.5">Show the sticky WhatsApp contact button across all public pages.</span>
            </div>
          </label>
        </div>

        {/* Home Page Sections */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-6">
          <h2 className="font-display text-lg font-bold text-brand-charcoal border-b border-brand-pale pb-4">Home Page Overrides</h2>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-brand-charcoal mb-4">&quot;Who We Are&quot; Image</h3>
              <p className="text-xs text-brand-gray mb-4">Replaces the default 🌱 emoji box on the homepage.</p>
              <div className="max-w-sm">
                {renderUploadBox("Featured Image", "whoWeAreImage")}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-brand-charcoal mb-4">Product Life Cycle Image</h3>
              <p className="text-xs text-brand-gray mb-4">Displays in the full-width Life Cycle section on the homepage.</p>
              <div className="max-w-sm">
                {renderUploadBox("Infographic Image", "productLifeCycleImage")}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-pale">
            <h3 className="text-sm font-semibold text-brand-charcoal mb-4">Social Media Links</h3>
            <p className="text-xs text-brand-gray mb-4">Add your social media URLs to display them in the website footer.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((p) => (
                <div key={p} className="flex gap-2 items-center bg-brand-sand/50 rounded-lg p-2 border border-brand-pale">
                  <span className="text-xs font-bold text-brand-charcoal uppercase w-20 px-2">{p}</span>
                  <input
                    type="url"
                    placeholder={`https://${p}.com/...`}
                    value={settings.socialLinks?.[p as keyof typeof settings.socialLinks] || ""}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, [p]: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 text-sm rounded-md border border-brand-pale"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-brand-pale">
            <h3 className="text-sm font-semibold text-brand-charcoal mb-4">&quot;Why Choose Us&quot; Cards</h3>
            <p className="text-xs text-brand-gray mb-4">Edit the text for the 6 feature cards on the homepage.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {settings.whyChooseUsCards?.map((card, i) => (
                <div key={i} className="bg-brand-sand/50 p-4 rounded-xl border border-brand-pale space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal mb-1">Card {i + 1} Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const newCards = [...settings.whyChooseUsCards];
                        newCards[i].title = e.target.value;
                        setSettings({ ...settings, whyChooseUsCards: newCards });
                      }}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale font-medium text-brand-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={card.desc}
                      onChange={(e) => {
                        const newCards = [...settings.whyChooseUsCards];
                        newCards[i].desc = e.target.value;
                        setSettings({ ...settings, whyChooseUsCards: newCards });
                      }}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" disabled={saving}
            className="px-8 py-3 bg-brand-forest text-white font-semibold rounded-xl hover:bg-brand-green transition-colors disabled:opacity-60 flex items-center gap-2 shadow-sm">
            {saving ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>) : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
