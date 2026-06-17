import fs from 'fs';
import path from 'path';
import Shapes from '@/components/Shapes';
import ContactForm from '@/components/ContactForm';
import { Mail, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  const data = JSON.parse(fileContents);

  return (
    <main className="min-h-screen relative bg-[#111111] text-white font-sans">
      <Shapes />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 space-y-40">
        
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center gap-12 pt-10">
          <div className="flex-1 space-y-6">
            <div className="inline-block border border-gray-600 rounded-full px-6 py-2 text-sm tracking-widest mb-4">
              2025
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hello ! <br/>
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{data.name}</span>
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
                  <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors font-bold text-xl">
                    LinkedIn
                  </a>
                )}
                {data.links?.instagram && (
                  <a href={data.links.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors font-bold text-xl">
                    Instagram
                  </a>
                )}
                {data.links?.github && (
                  <a href={data.links.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors font-bold text-xl">
                    Git Hub
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
            <div className="p-8 text-center space-y-8">
              <h3 className="font-bold text-xl text-blue-900 border-b-2 border-blue-900 inline-block uppercase">Skills and Tools</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {data.skills.map((skill, i) => (
                  <div key={i} className="bg-gray-100 px-6 py-3 rounded-xl font-bold text-gray-800 shadow-sm border border-gray-200 flex items-center gap-2">
                    {skill}
                  </div>
                ))}
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
            {data.projects.map((proj, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500 transition-colors group">
                <div className="h-48 bg-gray-800 w-full relative overflow-hidden flex items-center justify-center">
                  {proj.image ? (
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="text-gray-500 font-bold">Project Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
                </div>
                <div className="p-8 flex flex-col h-full">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                  <p className="text-gray-400 whitespace-pre-line mb-8">{proj.description}</p>
                  {proj.link && (
                    <div className="mt-auto">
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-flex bg-yellow-500 text-black font-bold px-6 py-2 rounded-full items-center gap-2 hover:scale-105 transition-transform">
                        CLICK HERE <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCES / PARTICIPANTS */}
        <section className="space-y-12">
          <div className="inline-block bg-purple-400 text-black px-8 py-3 text-4xl font-black rounded-xl uppercase">
            Experience
          </div>
          
          <div className="grid gap-8">
            {data.experiences.map((exp, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 hover:border-purple-500 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -z-10"></div>
                <h3 className="text-2xl font-bold mb-4">{exp.title}</h3>
                <p className="text-gray-400 whitespace-pre-line text-lg leading-relaxed">{exp.description}</p>
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
