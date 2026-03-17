import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import projectsData from '../projectsData';

const categoryGradients: Record<string, string> = {
  JavaScript: 'bg-gradient-to-br from-orange-400 via-pink-500 to-pink-400', // 1st card style
  Docker: 'bg-gradient-to-br from-green-400 via-teal-400 to-teal-500', // 2nd card style
  Python: 'bg-gradient-to-br from-[#FCE7F3] to-[#E0F2FE]', // 5th card style
  'Python + Docker': 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600', // 3rd card style
};

const filterTags = [
  'All',
  'Docker',
  'Python + Docker',
  'Linux',
  'Python',
  'JavaScript',
  'Blog',
];

const Projects: React.FC = () => {
  const [activeTag, setActiveTag] = useState('All');

  const filteredProjects =
    activeTag === 'All'
      ? projectsData
      : projectsData.filter(
          (project) => project.category === activeTag || project.type.toLowerCase() === activeTag.toLowerCase()
        );

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold font-rajdhani mb-2">
            <span className="text-white">Hands-On</span>{' '}
            <span className="text-purple-400">Tasks</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Explore practical DevOps, Linux, and coding challenges.
          </p>
        </div>
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filterTags.map((tag) => (
            <button
              key={tag}
              className={`px-4 py-2 rounded-full font-medium border transition-all duration-200 text-sm
                ${
                  activeTag === tag
                    ? 'bg-purple-500 text-white border-purple-500 shadow-lg'
                    : 'bg-white/10 text-white border-white/20 hover:bg-purple-400/20 hover:text-purple-200'
                }
              `}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            // Determine card and button styles based on category
            const cardGradient = categoryGradients[project.category] || 'bg-white/5';
            let buttonGradient = 'bg-black/30 hover:bg-black/60';
            let buttonText = 'text-white';
            if (project.category === 'JavaScript') {
              buttonGradient = 'bg-gradient-to-r from-orange-400 to-pink-500 hover:opacity-90';
            } else if (project.category === 'Docker') {
              buttonGradient = 'bg-gradient-to-r from-green-400 to-teal-500 hover:opacity-90';
            } else if (project.category === 'Python') {
              buttonGradient = 'bg-gradient-to-r from-pink-200 to-blue-200 hover:opacity-90';
              buttonText = 'text-gray-900';
            } else if (project.category === 'Python + Docker') {
              buttonGradient = 'bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-90';
            }
            return (
              <div
                key={project.title}
                className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-105 hover:shadow-2xl border border-white/10 group ${cardGradient}`}
              >
                <div>
                  <h3
                    className={`text-xl font-bold mb-2 transition-colors ${
                      project.category === 'Python'
                        ? 'text-slate-800 group-hover:text-purple-500'
                        : 'text-white group-hover:text-purple-200'
                    }`}
                  >
                    {project.title}
                  </h3>
                  {project.description && (
                    <p
                      className={`text-sm mb-4 ${
                        project.category === 'Python' ? 'text-slate-600' : 'text-white/80'
                      }`}
                    >
                      {project.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 mt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors border border-white/10 ${buttonGradient} ${buttonText}`}
                    >
                      <Github size={16} /> View on GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors border border-white/10 ${buttonGradient} ${buttonText}`}
                    >
                      <ExternalLink size={16} /> Run Live
                    </a>
                  )}
                  {project.linkedin && (
                    <a
                      href={project.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors border border-white/10 ${buttonGradient} ${buttonText}`}
                    >
                      <ExternalLink size={16} /> Read Blog
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {filteredProjects.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
            No projects match this filter yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
