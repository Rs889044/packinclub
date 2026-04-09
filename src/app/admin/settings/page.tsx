"use client";
import { useState, useEffect, FormEvent } from "react";
import type { SiteSettings } from "@/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    favicon: "",
    whoWeAreImage: "",
    whyChooseUsImages: ["", "", "", "", "", ""]
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

  async function handleUpload(file: File, fieldKey: string, index?: number) {
    const uploadId = index !== undefined ? `${fieldKey}-${index}` : fieldKey;
    setUploading(uploadId);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      
      if (data.url) {
        if (index !== undefined) {
          const newArr = [...settings.whyChooseUsImages];
          newArr[index] = data.url;
          setSettings({ ...settings, whyChooseUsImages: newArr });
        } else {
          setSettings({ ...settings, [fieldKey]: data.url });
        }
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

  function removeImage(fieldKey: string, index?: number) {
    if (index !== undefined) {
      const newArr = [...settings.whyChooseUsImages];
      newArr[index] = "";
      setSettings({ ...settings, whyChooseUsImages: newArr });
    } else {
      setSettings({ ...settings, [fieldKey]: "" });
    }
  }

  const renderUploadBox = (label: string, fieldKey: keyof SiteSettings, index?: number) => {
    const currentValue = index !== undefined ? settings.whyChooseUsImages[index] : settings[fieldKey as keyof typeof settings] as string;
    const isUploading = uploading === (index !== undefined ? `${fieldKey}-${index}` : fieldKey);

    return (
      <div className="bg-brand-sand/50 p-4 rounded-xl border border-brand-pale">
        <label className="block text-sm font-medium text-brand-charcoal mb-3">{label}</label>
        {currentValue ? (
          <div className="relative w-full aspect-square md:aspect-auto md:h-32 rounded-xl overflow-hidden border border-brand-pale bg-white flex items-center justify-center">
            <img src={currentValue} alt={label} className="max-w-full max-h-full object-contain" />
            <button type="button" onClick={() => removeImage(fieldKey, index)}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 shadow-sm">✕</button>
          </div>
        ) : (
          <label className="block w-full h-32 border-2 border-dashed border-brand-pale rounded-xl flex items-center justify-center cursor-pointer hover:border-brand-forest/30 bg-white transition-all text-center px-4">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0], fieldKey, index); }} />
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
        </div>

        {/* Home Page Sections */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-6">
          <h2 className="font-display text-lg font-bold text-brand-charcoal border-b border-brand-pale pb-4">Home Page Overrides</h2>
          
          <div>
            <h3 className="text-sm font-semibold text-brand-charcoal mb-4">"Who We Are" Image</h3>
            <p className="text-xs text-brand-gray mb-4">Replaces the default 🌱 emoji box on the homepage.</p>
            <div className="max-w-sm">
              {renderUploadBox("Featured Image", "whoWeAreImage")}
            </div>
          </div>

          <div className="pt-6 border-t border-brand-pale">
            <h3 className="text-sm font-semibold text-brand-charcoal mb-4">"Why Choose Us" Card Images</h3>
            <p className="text-xs text-brand-gray mb-4">Upload custom images/icons for the 6 feature cards.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {renderUploadBox("Card 1 (Plant-Based)", "whyChooseUsImages", 0)}
              {renderUploadBox("Card 2 (Strength)", "whyChooseUsImages", 1)}
              {renderUploadBox("Card 3 (Certified)", "whyChooseUsImages", 2)}
              {renderUploadBox("Card 4 (Customizable)", "whyChooseUsImages", 3)}
              {renderUploadBox("Card 5 (Widest Range)", "whyChooseUsImages", 4)}
              {renderUploadBox("Card 6 (Support)", "whyChooseUsImages", 5)}
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
