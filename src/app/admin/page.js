"use client";

import { useState, useEffect } from "react";
import { Save, MessageSquare, Briefcase, User, Settings, LayoutDashboard, Trash2, ImagePlus, Link as LinkIcon } from "lucide-react";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio"); // portfolio or messages
  
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");

  const fetchData = async () => {
    setLoading(true);
    try {
      const resPort = await fetch("/api/portfolio");
      const jsonPort = await resPort.json();
      setData(jsonPort);

      const resMsg = await fetch("/api/messages");
      const jsonMsg = await resMsg.json();
      setMessages(jsonMsg);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Password salah! (Hint: admin123)");
    }
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch (err) {
      setSaveStatus("error");
    }
  };

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleLinkChange = (network, value) => {
    setData({ ...data, links: { ...data.links, [network]: value } });
  };

  const handleFileUpload = async (file, callback) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (json.url) {
        callback(json.url);
        setSaveStatus("success");
      } else {
        setSaveStatus("error");
      }
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
    }
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const handleArrayChange = (field, index, subfield, value) => {
    const newArray = [...data[field]];
    newArray[index] = { ...newArray[index], [subfield]: value };
    setData({ ...data, [field]: newArray });
  };

  const addArrayItem = (field, defaultItem) => {
    setData({ ...data, [field]: [...data[field], { ...defaultItem, id: Date.now().toString() }] });
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...data[field]];
    newArray.splice(index, 1);
    setData({ ...data, [field]: newArray });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
        <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <button type="submit" className="w-full bg-purple-500 text-white font-bold py-3 rounded-lg hover:bg-purple-600 transition-colors">
              Login
            </button>
            <p className="text-gray-500 text-sm text-center">Default password: admin123</p>
          </form>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">Loading Data...</div>;
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1a] border-r border-gray-800 p-6 flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-8 text-cyan-400 flex items-center gap-2">
          <Settings size={24}/> Admin Panel
        </h2>
        
        <button 
          onClick={() => setActiveTab("portfolio")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'portfolio' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:bg-[#222]'}`}
        >
          <LayoutDashboard size={20} />
          Edit Portfolio
        </button>
        <button 
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'messages' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:bg-[#222]'}`}
        >
          <MessageSquare size={20} />
          Messages
          {messages.length > 0 && (
            <span className="ml-auto bg-cyan-500 text-black text-xs font-bold px-2 py-1 rounded-full">
              {messages.length}
            </span>
          )}
        </button>
        <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#222] transition-colors mt-auto">
          View Live Site
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-10">
        
        {activeTab === "portfolio" && (
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <User /> Personal Information
              </h1>
              <button 
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <Save size={18} />
                {saveStatus === "saving" ? "Saving..." : saveStatus === "success" ? "Saved!" : "Save Changes"}
              </button>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={data.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  value={data.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Bio</label>
                <textarea 
                  rows={6}
                  value={data.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Profile Photo</label>
                <div className="flex items-center gap-4">
                  {data.photo && <img src={data.photo} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-gray-700" />}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files[0], (url) => handleChange('photo', url))}
                    className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-bold text-lg">Social Links</label>
                <div className="space-y-3">
                  <div className="flex gap-4 items-center">
                    <span className="w-24 text-gray-400">LinkedIn:</span>
                    <input type="text" value={data.links?.linkedin || ""} onChange={(e) => handleLinkChange('linkedin', e.target.value)} className="flex-1 bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="w-24 text-gray-400">GitHub:</span>
                    <input type="text" value={data.links?.github || ""} onChange={(e) => handleLinkChange('github', e.target.value)} className="flex-1 bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="https://github.com/..." />
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="w-24 text-gray-400">Instagram:</span>
                    <input type="text" value={data.links?.instagram || ""} onChange={(e) => handleLinkChange('instagram', e.target.value)} className="flex-1 bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="https://instagram.com/..." />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold flex items-center gap-3 pt-8">
              <Briefcase /> Skillset (Comma separated)
            </h1>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
              <textarea 
                rows={3}
                value={(data.skills || []).join(", ")}
                onChange={(e) => {
                  const newSkills = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                  handleChange('skills', newSkills);
                }}
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white resize-none"
              />
            </div>

            <h1 className="text-3xl font-bold flex items-center gap-3 pt-8">
              <Briefcase /> Toolset (Comma separated)
            </h1>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
              <textarea 
                rows={3}
                value={(data.tools || ["Node.js", "Express.js", "React.js", "MySQL", "SQL Server Management Studio (SSMS)", "Git", "GitHub", "Docker", "Docker Compose", "Microsoft Excel", "Microsoft Word", "Amazon Bedrock", "Postman", "Visual Studio Code", "Draw.io", "Canva", "XAMPP", "Laravel", "Android Studio"]).join(", ")}
                onChange={(e) => {
                  const newTools = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                  handleChange('tools', newTools);
                }}
                className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white resize-none"
              />
            </div>
            
            <h1 className="text-3xl font-bold flex items-center gap-3 pt-8">
              <User /> Education
            </h1>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 relative group">
                  <button onClick={() => removeArrayItem('education', index)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Institution</label>
                      <input type="text" value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Degree</label>
                      <input type="text" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Years</label>
                      <input type="text" value={edu.years} onChange={(e) => handleArrayChange('education', index, 'years', e.target.value)} className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem('education', { institution: "New Institution", degree: "New Degree", years: "2024" })} className="w-full border-2 border-dashed border-gray-700 text-gray-400 rounded-xl py-4 hover:border-cyan-500 hover:text-cyan-400 transition-colors font-bold">+ Add Education</button>
            </div>

            <h1 className="text-3xl font-bold flex items-center gap-3 pt-8">
              <Briefcase /> Experiences
            </h1>
            <div className="space-y-4">
              {(data.experiences || []).map((exp, index) => (
                <div key={exp.id || index} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 relative group">
                  <button onClick={() => removeArrayItem('experiences', index)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Job / Role Title</label>
                      <input type="text" value={exp.title} onChange={(e) => handleArrayChange('experiences', index, 'title', e.target.value)} className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Description</label>
                      <textarea rows={4} value={exp.description} onChange={(e) => handleArrayChange('experiences', index, 'description', e.target.value)} className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white resize-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 mb-1"><LinkIcon size={14} className="inline mr-1" />Experience Link / URL</label>
                        <input type="text" value={exp.link || ""} onChange={(e) => handleArrayChange('experiences', index, 'link', e.target.value)} placeholder="https://..." className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white" />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1"><ImagePlus size={14} className="inline mr-1" />Experience Image (Paste URL)</label>
                        <div className="flex gap-2">
                          <input type="text" value={exp.image || ""} onChange={(e) => handleArrayChange('experiences', index, 'image', e.target.value)} placeholder="Paste image URL here..." className="flex-1 bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white text-sm" />
                        </div>
                        {exp.image && <img src={exp.image} alt="preview" className="mt-2 h-20 rounded-lg border border-gray-700 object-cover" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem('experiences', { title: "New Experience", description: "Experience description", image: "", link: "" })} className="w-full border-2 border-dashed border-gray-700 text-gray-400 rounded-xl py-4 hover:border-purple-500 hover:text-purple-400 transition-colors font-bold">+ Add Experience</button>
            </div>

            <h1 className="text-3xl font-bold flex items-center gap-3 pt-8">
              <Briefcase /> Projects
            </h1>
            <div className="space-y-4">
              {data.projects.map((proj, index) => (
                <div key={proj.id} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 relative group">
                  <button onClick={() => removeArrayItem('projects', index)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Title</label>
                      <input type="text" value={proj.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Description</label>
                      <textarea rows={4} value={proj.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white resize-none" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-1"><LinkIcon size={14} className="inline mr-1" />Project Link / URL</label>
                        <input type="text" value={proj.link || ""} onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)} placeholder="https://..." className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white" />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1"><ImagePlus size={14} className="inline mr-1" />Project Images</label>
                        <div className="flex flex-col gap-3">
                          {/* Preview gambar yang sudah ada */}
                          <div className="flex flex-wrap gap-2">
                            {(proj.images || (proj.image ? [proj.image] : [])).map((imgUrl, imgIdx) => (
                              <div key={imgIdx} className="relative group/img">
                                <img src={imgUrl} alt={`${proj.title}-${imgIdx}`} className="h-16 w-16 object-cover rounded-lg border border-gray-700" />
                                <button onClick={() => {
                                  const currentImages = proj.images || (proj.image ? [proj.image] : []);
                                  const newImages = [...currentImages];
                                  newImages.splice(imgIdx, 1);
                                  handleArrayChange('projects', index, 'images', newImages);
                                }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 shadow-lg"><Trash2 size={12}/></button>
                              </div>
                            ))}
                          </div>

                          {/* Opsi 1: Paste URL gambar (SELALU BISA) */}
                          <div className="bg-[#191919] border border-gray-700 rounded-lg p-3">
                            <p className="text-xs text-green-400 font-bold mb-2">✅ Paste Image URL (Recommended)</p>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                id={`img-url-${index}`}
                                placeholder="Paste image URL here (e.g. from Google Drive, Imgur, etc.)"
                                className="flex-1 bg-[#222] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  const input = document.getElementById(`img-url-${index}`);
                                  const url = input.value.trim();
                                  if (url) {
                                    const currentImages = proj.images || (proj.image ? [proj.image] : []);
                                    handleArrayChange('projects', index, 'images', [...currentImages, url]);
                                    input.value = '';
                                  }
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                              >Add</button>
                            </div>
                          </div>

                          {/* Opsi 2: Upload file (hanya bisa di Vercel dengan Blob) */}
                          <div className="bg-[#191919] border border-gray-700 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-2">📁 Or Upload File (requires Vercel Blob)</p>
                            <input 
                              type="file" 
                              accept="image/*"
                              multiple
                              onChange={async (e) => {
                                const files = Array.from(e.target.files);
                                const uploadedUrls = [];
                                setSaveStatus("saving");
                                for (const file of files) {
                                  const formData = new FormData();
                                  formData.append("file", file);
                                  try {
                                    const res = await fetch("/api/upload", { method: "POST", body: formData });
                                    const json = await res.json();
                                    if (json.url) uploadedUrls.push(json.url);
                                    else { alert("Upload gagal: " + (json.error || 'Unknown error')); }
                                  } catch (err) {
                                    console.error(err);
                                    alert("Upload error: " + err.message);
                                  }
                                }
                                if (uploadedUrls.length > 0) {
                                  const currentImages = proj.images || (proj.image ? [proj.image] : []);
                                  const uniqueImages = Array.from(new Set([...currentImages, ...uploadedUrls]));
                                  handleArrayChange('projects', index, 'images', uniqueImages);
                                  setSaveStatus("success");
                                } else {
                                  setSaveStatus("error");
                                }
                                setTimeout(() => setSaveStatus("idle"), 3000);
                                e.target.value = "";
                              }}
                              className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem('projects', { title: "New Project", description: "Project description", images: [], link: "" })} className="w-full border-2 border-dashed border-gray-700 text-gray-400 rounded-xl py-4 hover:border-purple-500 hover:text-purple-400 transition-colors font-bold">+ Add Project</button>
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-3 mb-8">
              <MessageSquare /> Inbox Messages
            </h1>
            
            {messages.length === 0 ? (
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-10 text-center text-gray-500">
                No messages yet.
              </div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-cyan-400">{msg.name}</h3>
                      <p className="text-sm text-gray-500">{msg.email}</p>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(msg.date).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-300 bg-[#222] p-4 rounded-lg">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
