"use client";
import { useState, useEffect, FormEvent } from "react";
import type { PageContent } from "@/types";

export default function AboutContentPage() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then(r => r.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      });
  }, []);

  async function handleUpload(file: File, fieldType: "story" | "leadership", memberIndex?: number) {
    const uploadId = fieldType === "leadership" ? `team-${memberIndex}` : "story";
    setUploading(uploadId);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      
      if (data.url && content) {
        if (fieldType === "story") {
          setContent({ ...content, about: { ...content.about, story: { ...content.about.story, image: data.url } } });
        } else if (fieldType === "leadership" && memberIndex !== undefined) {
          const newTeam = [...content.about.leadership.team];
          newTeam[memberIndex].image = data.url;
          setContent({ ...content, about: { ...content.about, leadership: { ...content.about.leadership, team: newTeam } } });
        }
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
    setUploading(null);
  }

  function removeImage(fieldType: "story" | "leadership", memberIndex?: number) {
    if (!content) return;
    if (fieldType === "story") {
      setContent({ ...content, about: { ...content.about, story: { ...content.about.story, image: "" } } });
    } else if (fieldType === "leadership" && memberIndex !== undefined) {
      const newTeam = [...content.about.leadership.team];
      newTeam[memberIndex].image = "";
      setContent({ ...content, about: { ...content.about, leadership: { ...content.about.leadership, team: newTeam } } });
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });
    setSaving(false);
  }

  if (loading || !content) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-brand-gray">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8 p-6 bg-gradient-to-r from-brand-forest to-[#1A4533] rounded-2xl text-white shadow-lg overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10">
           <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">About Us Content</h1>
           <p className="text-white/80 text-sm">Manage the story, team members, mission, and vision.</p>
         </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Story Section */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-charcoal border-b border-brand-pale pb-4">Our Story</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Subtitle <span className="text-xs text-brand-gray font-normal">(Recommended: 2-3 words)</span></label>
                <input type="text" value={content.about.story.subtitle} onChange={e => setContent({...content, about: {...content.about, story: {...content.about.story, subtitle: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Title <span className="text-xs text-brand-gray font-normal">(Recommended: 3-6 words)</span></label>
                <input type="text" value={content.about.story.title} onChange={e => setContent({...content, about: {...content.about, story: {...content.about.story, title: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Paragraph 1 <span className="text-xs text-brand-gray font-normal">(Recommended: 30-50 words)</span></label>
                <textarea rows={3} value={content.about.story.p1} onChange={e => setContent({...content, about: {...content.about, story: {...content.about.story, p1: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Paragraph 2 <span className="text-xs text-brand-gray font-normal">(Recommended: 30-50 words)</span></label>
                <textarea rows={3} value={content.about.story.p2} onChange={e => setContent({...content, about: {...content.about, story: {...content.about.story, p2: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Paragraph 3 <span className="text-xs text-brand-gray font-normal">(Recommended: 20-30 words)</span></label>
                <textarea rows={3} value={content.about.story.p3} onChange={e => setContent({...content, about: {...content.about, story: {...content.about.story, p3: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none" />
              </div>
            </div>

            <div>
              <div className="bg-brand-sand/50 p-4 rounded-xl border border-brand-pale sticky top-24">
                <label className="block text-sm font-medium text-brand-charcoal mb-1">Story Featured Image</label>
                <p className="text-xs text-brand-gray mb-3 italic">Recommended: 4:3 Aspect Ratio (e.g., 800x600px)</p>
                {content.about.story.image ? (
                  <div className="relative w-full aspect-square md:aspect-auto md:h-48 rounded-xl overflow-hidden border border-brand-pale bg-white flex items-center justify-center">
                    <img src={content.about.story.image} alt="Story" className="max-w-full max-h-full object-contain" />
                    <button type="button" onClick={() => removeImage("story")} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 shadow-sm">✕</button>
                  </div>
                ) : (
                  <label className="block w-full h-48 border-2 border-dashed border-brand-pale rounded-xl flex items-center justify-center cursor-pointer hover:border-brand-forest/30 bg-white transition-all text-center px-4">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0], "story"); }} />
                    {uploading === "story" ? (
                      <div className="flex flex-col items-center gap-2 text-brand-gray text-sm">
                        <div className="w-5 h-5 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" /> Uploading...
                      </div>
                    ) : (
                      <div>
                        <div className="text-xl mb-1">🖼️</div>
                        <p className="text-xs text-brand-gray">Upload Image</p>
                      </div>
                    )}
                  </label>
                )}
                <p className="text-xs text-brand-gray mt-3 font-semibold">This replaces the default 🌿 emoji block.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-brand-pale pb-4">
            <h2 className="font-display text-lg font-bold text-brand-charcoal">Leadership & Team</h2>
            <button 
              type="button" 
              onClick={() => {
                const newTeam = [...content.about.leadership.team, { name: "New Member", role: "Role", bio: "", image: "" }];
                setContent({ ...content, about: { ...content.about, leadership: { ...content.about.leadership, team: newTeam } } });
              }}
              className="text-xs font-bold text-brand-forest bg-brand-forest/10 px-3 py-1.5 rounded-md hover:bg-brand-forest/20"
            >
              + Add Member
            </button>
          </div>
          
          <div className="space-y-6">
            {content.about.leadership.team.map((member, idx) => (
              <div key={idx} className="bg-brand-sand/30 p-5 rounded-xl border border-brand-pale flex flex-col md:flex-row gap-6 relative">
                <button type="button" onClick={() => {
                  const newTeam = content.about.leadership.team.filter((_, i) => i !== idx);
                  setContent({ ...content, about: { ...content.about, leadership: { ...content.about.leadership, team: newTeam } } });
                }} className="absolute top-3 right-3 text-red-500 hover:text-red-600 text-xs font-bold px-2 py-1 bg-red-50 rounded-md">Remove</button>
                
                <div className="w-32 shrink-0">
                  <label className="block text-xs font-bold text-brand-charcoal mb-1">Avatar / Photo</label>
                  <p className="text-[10px] text-brand-gray mb-2 italic">1:1 Square (400x400px)</p>
                  {member.image && member.image.startsWith("http") ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border border-brand-pale bg-white flex items-center justify-center">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImage("leadership", idx)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">✕</button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                       <input 
                         type="text" 
                         placeholder="Emoji (e.g. 👨‍💼)" 
                         value={member.image} 
                         onChange={e => {
                           const newTeam = [...content.about.leadership.team];
                           newTeam[idx].image = e.target.value;
                           setContent({ ...content, about: { ...content.about, leadership: { ...content.about.leadership, team: newTeam } } });
                         }}
                         className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale"
                       />
                       <span className="text-xs text-brand-gray text-center block">OR</span>
                       <label className="block w-full text-xs text-center py-2 border border-brand-forest text-brand-forest rounded-lg cursor-pointer hover:bg-brand-forest/5">
                         <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0], "leadership", idx); }} />
                         {uploading === `team-${idx}` ? "Uploading..." : "Upload Photo"}
                       </label>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal mb-1">Name</label>
                      <input type="text" value={member.name} onChange={e => {
                        const newTeam = [...content.about.leadership.team];
                        newTeam[idx].name = e.target.value;
                        setContent({ ...content, about: { ...content.about, leadership: { ...content.about.leadership, team: newTeam } } });
                      }} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal mb-1">Role</label>
                      <input type="text" value={member.role} onChange={e => {
                        const newTeam = [...content.about.leadership.team];
                        newTeam[idx].role = e.target.value;
                        setContent({ ...content, about: { ...content.about, leadership: { ...content.about.leadership, team: newTeam } } });
                      }} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal mb-1">Bio <span className="font-normal text-brand-gray">(15-25 words)</span></label>
                    <textarea rows={2} value={member.bio} onChange={e => {
                      const newTeam = [...content.about.leadership.team];
                      newTeam[idx].bio = e.target.value;
                      setContent({ ...content, about: { ...content.about, leadership: { ...content.about.leadership, team: newTeam } } });
                    }} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-charcoal border-b border-brand-pale pb-4">Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Mission Title <span className="font-normal text-brand-gray">(2-4 words)</span></label>
                <input type="text" value={content.about.mission.title} onChange={e => setContent({...content, about: {...content.about, mission: {...content.about.mission, title: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Mission Text <span className="font-normal text-brand-gray">(20-40 words)</span></label>
                <textarea rows={4} value={content.about.mission.desc} onChange={e => setContent({...content, about: {...content.about, mission: {...content.about.mission, desc: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Vision Title <span className="font-normal text-brand-gray">(2-4 words)</span></label>
                <input type="text" value={content.about.vision.title} onChange={e => setContent({...content, about: {...content.about, vision: {...content.about.vision, title: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Vision Text <span className="font-normal text-brand-gray">(20-40 words)</span></label>
                <textarea rows={4} value={content.about.vision.desc} onChange={e => setContent({...content, about: {...content.about, vision: {...content.about.vision, desc: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none" />
              </div>
            </div>
          </div>
        </div>


        <div className="flex items-center gap-4 pt-4 sticky bottom-6 z-20">
          <button type="submit" disabled={saving}
            className="px-8 py-3 bg-brand-forest text-white font-semibold rounded-xl hover:bg-brand-green transition-colors disabled:opacity-60 flex items-center gap-2 shadow-xl shadow-brand-forest/20">
            {saving ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>) : "Publish Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
