import React, { useState } from 'react';
import { Github, ExternalLink, Terminal, Container, Code, Layers, FileText, ArrowUpRight } from 'lucide-react';
import projectsData from '../projectsData';

const filterTags = [
  'All',
  'Docker',
  'Python + Docker',
  'Linux',
  'Python',
  'JavaScript',
  'Blog',
];

const getCategoryIcon = (category: string, type: string) => {
  if (type === 'blog') return FileText;
  switch (category) {
    case 'Linux': return Terminal;
    case 'Docker': return Container;
    case 'Python + Docker': return Layers;
    default: return Code;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Linux': return 'text-orange-400 border-orange-400/30 bg-orange-400/10 group-hover:border-orange-400/50 group-hover:shadow-[0_0_20px_rgba(251,146,60,0.15)]';
    case 'Docker': return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]';
    case 'Python': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10 group-hover:border-yellow-400/50 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.15)]';
    case 'JavaScript': return 'text-yellow-200 border-yellow-200/30 bg-yellow-200/10 group-hover:border-yellow-200/50 group-hover:shadow-[0_0_20px_rgba(254,240,138,0.15)]';
    case 'Python + Docker': return 'text-blue-400 border-blue-400/30 bg-blue-400/10 group-hover:border-blue-400/50 group-hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]';
    default: return 'text-purple-400 border-purple-400/30 bg-purple-400/10 group-hover:border-purple-400/50 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.15)]';
  }
};

const Projects: React.FC = () => {
  const [activeTag, setActiveTag] = useState('All');

  const filteredProjects =
    activeTag === 'All'
      ? projectsData
      : projectsData.filter(
          (project) => project.category === activeTag || project.type.toLowerCase() === activeTag.toLowerCase()
        );

  return (
    <section id="projects" className="py-24 relative overflow-hidden text-offwhite min-h-screen">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-candy-pink/30 bg-candy-pink/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-candy-pink animate-pulse"></span>
            <span className="text-sm font-fira-code text-candy-pink">~/portfolio/projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-rajdhani mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-offwhite to-slate-400">Hands-On</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-candy-pink">Tasks</span>
          </h2>
          <p className="text-offwhite/70 max-w-2xl mx-auto text-lg leading-relaxed">
            A curated showcase of practical engineering challenges, robust cloud architecture implementations, and insightful tech blogs.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTags.map((tag) => (
            <button
              key={tag}
              className={`px-5 py-2.5 rounded-xl font-fira-code transition-all duration-300 text-sm tracking-wide backdrop-blur-md
                ${
                  activeTag === tag
                    ? 'bg-candy-pink/10 text-candy-pink border border-candy-pink/50 shadow-[0_0_15px_rgba(255,72,185,0.2)]'
                    : 'bg-slate-950/40 text-offwhite/60 border border-white/10 hover:bg-white/5 hover:text-offwhite hover:border-white/20'
                }
              `}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const Icon = getCategoryIcon(project.category, project.type);
            const colorClass = getCategoryColor(project.category);
            const isBlog = project.type === 'blog';

            // Split the hover classes from the base classes to apply them nicely
            const baseColors = colorClass.split(' ').filter(c => !c.startsWith('group-hover')).join(' ');
            const hoverColors = colorClass.split(' ').filter(c => c.startsWith('group-hover')).join(' ');

            return (
              <div
                key={project.title + idx}
                className={`group relative flex flex-col justify-between p-7 rounded-2xl transition-all duration-500 hover:-translate-y-2 border backdrop-blur-xl bg-slate-950/40 hover:bg-slate-900/60 ${baseColors} ${hoverColors}`}
              >
                {/* Glow Effect Behind Card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 group-hover:border-white/20 transition-colors">
                      <Icon size={22} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {isBlog && (
                      <span className="px-3 py-1 rounded-full text-xs font-fira-code border border-purple-400/30 text-purple-400 bg-purple-400/10">
                        Article
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-offwhite group-hover:text-white transition-colors leading-snug">
                    {project.title}
                  </h3>
                  
                  {project.description && (
                    <p className="text-sm font-medium leading-relaxed text-offwhite/60 mb-6 group-hover:text-offwhite/80 transition-colors">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-fira-code opacity-70 border-b border-transparent group-hover:border-current transition-colors">
                    {project.category}
                  </span>
                  
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-offwhite/70 hover:text-white transition-all hover:scale-110"
                        title="View Source Code"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-offwhite/70 hover:text-white transition-all hover:scale-110"
                        title="Live Demo"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                    {project.linkedin && (
                      <a
                        href={project.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 hover:border-blue-500/40 transition-all text-sm font-semibold"
                        title="Read on LinkedIn"
                      >
                        Read <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-12 rounded-2xl border border-white/10 bg-slate-950/40 p-12 text-center backdrop-blur-lg">
            <Container size={48} className="mx-auto text-offwhite/20 mb-4" />
            <p className="text-offwhite/60 font-fira-code text-lg">No matching modules found in the registry.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
