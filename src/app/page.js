import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';
import Shapes from '@/components/Shapes';
import ContactForm from '@/components/ContactForm';
import ProjectGallery from '@/components/ProjectGallery';
import { Mail, ExternalLink, Star } from 'lucide-react';
import { Github, Linkedin, Instagram } from '@/components/SocialIcons';

const skillIcons = {
  "Analytical thinking": "🔍",
  "Problem solving": "🧩",
  "Data analysis": "📊",
  "Database design": "🗄️",
  "Backend development": "⚙️",
  "RESTful API development": "🌐",
  "System integration": "🔗",
  "Critical thinking": "🧠",
  "Teamwork": "🤝",
  "Leadership": "👑",
  "Communication": "💬",
  "Presentation": "📽️",
  "Project management": "📅",
  "Organizational skills": "📋",
  "Time management": "⏱️",
  "Adaptability": "🔄"
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function Home() {
  let data = null;
  try {
    data = await kv.get('portfolio_data');
  } catch (e) {
    console.log("KV not connected yet");
  }

  if (!data) {
    const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    data = JSON.parse(fileContents);
  }

  return (
    <main className="min-h-screen relative bg-[#111111] text-white font-sans">
      <Shapes />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 space-y-40">
        
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center gap-12 pt-10">
          <div className="flex-1 space-y-6">
            <div className="inline-block border border-gray-600 rounded-full px-6 py-2 text-sm tracking-widest mb-4">
              2026
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hello ! <br/>
              I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{data.name}</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              {data.bio}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a href="#contact" className="bg-yellow-500 text-[#111] font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform">
                MORE INFO <span className="font-black">&gt;&gt;</span>
              </a>
              <div className="flex gap-4 ml-4">
                {data.links?.linkedin && (
                  <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white" title="LinkedIn">
                    <Linkedin size={22} />
                  </a>
                )}
                {data.links?.instagram && (
                  <a href={data.links.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors text-white" title="Instagram">
                    <Instagram size={22} />
                  </a>
                )}
                {data.links?.github && (
                  <a href={data.links.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors text-white" title="GitHub">
                    <Github size={22} />
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mt-4">
              <Mail size={20} className="text-red-500"/> {data.email}
            </div>
          </div>
          <div className="w-64 h-64 md:w-96 md:h-96 shrink-0 relative">
            <div className="absolute inset-0 bg-purple-500 rounded-full mix-blend-screen blur-xl opacity-50 animate-pulse"></div>
            <div className="w-full h-full rounded-full border-4 border-purple-500 overflow-hidden relative z-10 bg-gray-800">
              {data.photo ? (
                <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
                  Photo
                </div>
              )}
            </div>
          </div>
        </section>

        {/* GRID CARDS: EDUCATION, ORG, CERT, SKILLS */}
        <section className="grid md:grid-cols-2 gap-8">
          
          {/* Education */}
          <div className="bg-white text-black rounded-3xl overflow-hidden border-b-[8px] border-r-[8px] border-gray-600 hover:-translate-y-2 transition-transform">
            <div className="bg-cyan-400 p-3 flex gap-2">
              <div className="w-4 h-4 rounded-full bg-white border border-black/20"></div>
              <div className="w-4 h-4 rounded-full bg-white border border-black/20"></div>
              <div className="w-4 h-4 rounded-full bg-white border border-black/20"></div>
            </div>
            <div className="p-8 text-center space-y-4">
              <h3 className="font-bold text-xl text-blue-900 border-b-2 border-blue-900 inline-block uppercase">Education</h3>
              {data.education.map((edu, i) => (
                <div key={i} className="pt-4">
                  <div className="text-4xl mb-4">🎓</div>
                  <h4 className="font-bold text-lg">{edu.institution}</h4>
                  <p className="text-gray-600 italic mt-2">{edu.degree} ({edu.years})</p>
                </div>
              ))}
            </div>
          </div>

          {/* Organization */}
          <div className="bg-white text-black rounded-3xl overflow-hidden border-b-[8px] border-r-[8px] border-gray-600 hover:-translate-y-2 transition-transform">
            <div className="bg-yellow-400 p-3 flex gap-2">
              <div className="w-4 h-4 rounded-full bg-white border border-black/20"></div>
              <div className="w-4 h-4 rounded-full bg-white border border-black/20"></div>
              <div className="w-4 h-4 rounded-full bg-white border border-black/20"></div>
            </div>
            <div className="p-8 text-center space-y-4">
              <h3 className="font-bold text-xl text-blue-900 border-b-2 border-blue-900 inline-block uppercase">Organization</h3>
              {data.organizations.map((org, i) => (
                <div key={i} className="pt-4">
                  <div className="text-4xl mb-4">👥</div>
                  <h4 className="font-bold text-lg">{org.name}</h4>
                  <p className="text-gray-600 italic mt-2">{org.role} ({org.years})</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Tools */}
          <div className="bg-white text-black rounded-3xl overflow-hidden border-b-[8px] border-r-[8px] border-gray-600 md:col-span-2 hover:-translate-y-2 transition-transform">
            <div className="bg-purple-400 p-3 flex gap-2">
              <div className="w-4 h-4 rounded-full bg-white border border-black/20"></div>
              <div className="w-4 h-4 rounded-full bg-white border border-black/20"></div>
              <div className="w-4 h-4 rounded-full bg-white border border-black/20"></div>
            </div>
            <div className="p-8 space-y-10">
              
              {/* Skillset */}
              <div className="text-center space-y-4">
                <h3 className="font-bold text-xl text-blue-900 border-b-2 border-blue-900 inline-block uppercase tracking-wider">Skillset</h3>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  {(data.skills || []).map((skill, i) => (
                    <div key={i} className="bg-purple-50 text-purple-900 px-5 py-2.5 rounded-xl font-semibold shadow-sm border border-purple-200 text-sm hover:scale-105 transition-transform">
                      {skillIcons[skill] || "🧠"} {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Toolset */}
              <div className="text-center space-y-4 pt-4 border-t border-gray-200">
                <h3 className="font-bold text-xl text-purple-900 border-b-2 border-purple-900 inline-block uppercase tracking-wider">Toolset</h3>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  {(data.tools || ["Node.js", "Express.js", "React.js", "MySQL", "SQL Server Management Studio (SSMS)", "Git", "GitHub", "Docker", "Docker Compose", "Microsoft Excel", "Microsoft Word", "Amazon Bedrock", "Postman", "Visual Studio Code", "Draw.io", "Canva", "XAMPP", "Laravel", "Android Studio"]).map((tool, i) => (
                    <div key={i} className="bg-cyan-50 text-cyan-900 px-5 py-2.5 rounded-xl font-semibold shadow-sm border border-cyan-200 text-sm hover:scale-105 transition-transform">
                      🛠️ {tool}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* PROJECTS SECTION */}
        <section className="space-y-12">
          <div className="inline-block bg-yellow-400 text-black px-8 py-3 text-4xl font-black rounded-xl uppercase">
            Project
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {data.projects.map((proj, i) => {
              const projectLink = proj.link || (proj.title?.toUpperCase().includes('TEKKOMDIK') || proj.title?.toUpperCase().includes('SIMPRAK') ? 'https://tekkomdik-intern.vercel.app/' : 'https://tekkomdik-intern.vercel.app/');
              return (
                <div key={i} className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500 transition-colors group flex flex-col justify-between">
                  <div>
                    <div className="h-48 bg-gray-800 w-full relative flex items-center justify-center">
                      <ProjectGallery images={proj.images && proj.images.length > 0 ? proj.images : (proj.image ? [proj.image] : [])} title={proj.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none"></div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                        {projectLink && (
                          <a href={projectLink} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 p-2 rounded-lg bg-yellow-400/10 hover:bg-yellow-400/20 transition-colors" title="Open Project Link">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-400 whitespace-pre-line leading-relaxed">{proj.description}</p>
                      
                      {proj.features && proj.features.length > 0 && (
                        <div className="mt-8">
                          <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2 uppercase tracking-widest">
                            <Star size={14} className="text-yellow-400" /> Key Features
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {proj.features.map((feature, fIdx) => (
                              <div key={fIdx} className="bg-[#222]/50 border border-gray-700/50 p-4 rounded-xl hover:bg-[#222] hover:border-cyan-500/50 transition-all group/feature">
                                <h5 className="font-bold text-cyan-400 text-sm mb-1 group-hover/feature:text-cyan-300">{feature.title}</h5>
                                <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {proj.tools && proj.tools.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {proj.tools.map((tool, tIdx) => (
                            <span key={tIdx} className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {projectLink && (
                    <div className="p-8 pt-0">
                      <a 
                        href={projectLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-extrabold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-lg text-lg uppercase tracking-wider"
                      >
                        PROJECT LINK <ExternalLink size={20} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCES / PARTICIPANTS */}
        <section className="space-y-12">
          <div className="inline-block bg-purple-400 text-black px-8 py-3 text-4xl font-black rounded-xl uppercase">
            Experience
          </div>
          
          <div className="grid gap-8">
            {(data.experiences || []).map((exp, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-colors relative">
                {((exp.images && exp.images.length > 0) || exp.image) && (
                  <div className="h-48 w-full relative">
                    <ProjectGallery images={exp.images && exp.images.length > 0 ? exp.images : (exp.image ? [exp.image] : [])} title={exp.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none"></div>
                  </div>
                )}
                <div className="p-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -z-10"></div>
                  <h3 className="text-2xl font-bold mb-4">{exp.title}</h3>
                  <p className="text-gray-400 whitespace-pre-line text-lg leading-relaxed">{exp.description}</p>
                  {exp.link && (
                    <div className="mt-6">
                      <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex bg-purple-500 text-white font-bold px-6 py-2 rounded-full items-center gap-2 hover:scale-105 transition-transform">
                        VIEW MORE <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="pt-20">
          <ContactForm />
        </section>
        
        {/* FOOTER */}
        <footer className="py-20 text-center border-t border-gray-800">
          <div className="bg-white text-black inline-block px-12 py-8 rounded-2xl border-b-[8px] border-r-[8px] border-gray-600">
            <h2 className="text-4xl font-bold mb-4">Thank You For<br/>Your Attention</h2>
            <div className="bg-purple-500 text-white px-8 py-2 rounded-full inline-block font-bold mt-4">
              {data.name}
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
