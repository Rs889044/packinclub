"use client";
import { useState, useEffect, FormEvent } from "react";
import type { SiteSettings } from "@/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    favicon: "",
    enableWhatsApp: false,
    enableCallback: false,
    catalogPdf: "",
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
    await fetch("/api/admin/cleanup", { method: "POST" });
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

          <label className="flex items-center gap-4 cursor-pointer mt-3 p-4 border border-brand-pale rounded-xl bg-brand-sand/30 hover:bg-brand-sand/50 transition-colors">
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.enableCallback}
                onChange={(e) => setSettings({ ...settings, enableCallback: e.target.checked })}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${settings.enableCallback ? "bg-brand-forest" : "bg-brand-pale"}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform mt-0.5 ${settings.enableCallback ? "translate-x-[22px]" : "translate-x-0.5"}`} />
              </div>
            </div>
            <div>
              <span className="block text-sm font-semibold text-brand-charcoal">Enable Floating Callback Button</span>
              <span className="block text-xs text-brand-gray mt-0.5">Show the "Request a Callback" phone button across all public pages.</span>
            </div>
          </label>
        </div>

        {/* Product Catalog PDF */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-charcoal border-b border-brand-pale pb-4">Downloadable Product Catalog</h2>
          <p className="text-xs text-brand-gray">Upload a PDF catalog that visitors can download from the Products page. This helps capture leads and enables offline sales conversations.</p>
          
          {settings.catalogPdf ? (
            <div className="flex items-center gap-4 p-4 bg-brand-sand/50 rounded-xl border border-brand-pale">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-xl shrink-0">📄</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-charcoal truncate">Product Catalog</p>
                <a href={settings.catalogPdf} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-forest hover:underline truncate block">{settings.catalogPdf}</a>
              </div>
              <button type="button" onClick={() => setSettings({ ...settings, catalogPdf: "" })}
                className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors shrink-0">Remove</button>
            </div>
          ) : (
            <label className="block w-full border-2 border-dashed border-brand-pale rounded-xl p-6 text-center cursor-pointer hover:border-brand-forest/30 bg-brand-sand/20 transition-all">
              <input type="file" accept=".pdf" className="hidden" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploading('catalogPdf' as keyof SiteSettings);
                const formData = new FormData();
                formData.append('file', file);
                try {
                  const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
                  const data = await res.json();
                  if (data.url) setSettings(s => ({ ...s, catalogPdf: data.url }));
                } catch (err) { console.error('Upload failed', err); }
                setUploading(null);
              }} />
              {uploading === ('catalogPdf' as keyof SiteSettings) ? (
                <div className="flex flex-col items-center gap-2 text-brand-gray text-sm">
                  <div className="w-5 h-5 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </div>
              ) : (
                <div>
                  <div className="text-2xl mb-2">📎</div>
                  <p className="text-sm font-medium text-brand-charcoal">Upload Product Catalog (PDF)</p>
                  <p className="text-xs text-brand-gray mt-1">Max recommended size: 10MB</p>
                </div>
              )}
            </label>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-6">
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
