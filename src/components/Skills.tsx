import React, { useState, useEffect, useRef } from 'react';
import {
  Server, Cloud, Code, Database, GitBranch, Shield,
  Container, Monitor, Settings, Network,
  CheckCircle, ArrowRight
} from 'lucide-react';

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      name: 'DevOps & CI/CD',
      icon: GitBranch,
      color: 'from-orange-500 to-orange-600',
      barColor: 'from-orange-500 to-amber-500',
      skills: [
        { name: 'Jenkins', level: 85, icon: Settings },
        { name: 'GitHub Actions', level: 80, icon: GitBranch },
        { name: 'Docker', level: 90, icon: Container },
        { name: 'Kubernetes', level: 75, icon: Server },
      ]
    },
    {
      name: 'Cloud Platforms',
      icon: Cloud,
      color: 'from-amber-500 to-amber-600',
      barColor: 'from-amber-500 to-yellow-500',
      skills: [
        { name: 'AWS', level: 80, icon: Cloud },
        { name: 'Azure', level: 75, icon: Cloud },
        { name: 'Google Cloud', level: 70, icon: Cloud },
        { name: 'Digital Ocean', level: 85, icon: Cloud },
      ]
    },
    {
      name: 'Infrastructure',
      icon: Server,
      color: 'from-yellow-500 to-yellow-600',
      barColor: 'from-yellow-500 to-orange-400',
      skills: [
        { name: 'Terraform', level: 80, icon: Code },
        { name: 'Ansible', level: 75, icon: Settings },
        { name: 'Linux', level: 90, icon: Monitor },
        { name: 'Nginx', level: 85, icon: Network },
      ]
    },
    {
      name: 'Monitoring & Security',
      icon: Shield,
      color: 'from-red-400 to-orange-500',
      barColor: 'from-red-400 to-orange-400',
      skills: [
        { name: 'Prometheus', level: 75, icon: Monitor },
        { name: 'Grafana', level: 80, icon: Monitor },
        { name: 'Security Scanning', level: 70, icon: Shield },
        { name: 'Log Management', level: 85, icon: Database },
      ]
    },
    {
      name: 'Development',
      icon: Code,
      color: 'from-orange-400 to-red-400',
      barColor: 'from-orange-400 to-red-400',
      skills: [
        { name: 'Python', level: 85, icon: Code },
        { name: 'JavaScript', level: 80, icon: Code },
        { name: 'Bash/Shell', level: 90, icon: Code },
        { name: 'YAML', level: 95, icon: Code },
      ]
    },
    {
      name: 'Databases',
      icon: Database,
      color: 'from-amber-400 to-yellow-500',
      barColor: 'from-amber-400 to-yellow-400',
      skills: [
        { name: 'MongoDB', level: 80, icon: Database },
        { name: 'PostgreSQL', level: 75, icon: Database },
        { name: 'Redis', level: 70, icon: Database },
        { name: 'MySQL', level: 85, icon: Database },
      ]
    }
  ];

  const certifications = [
    'AWS Cloud Practitioner (In Progress)',
    'Docker Certified Associate (Planned)',
    'Kubernetes Administrator (Planned)',
    'Azure Fundamentals (Planned)',
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-orange-100/70 max-w-2xl mx-auto text-base md:text-lg">
            Comprehensive toolkit for modern DevOps and cloud infrastructure management
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className={`opacity-0 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: `${categoryIndex * 100 + 200}ms` }}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-400/30 transition-all duration-300 h-full">
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-glow-warm`}>
                    <category.icon size={24} className="text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-offwhite">{category.name}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="group cursor-pointer"
                      onMouseEnter={() => setActiveSkill(`${category.name}-${skill.name}`)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <skill.icon size={16} className="text-orange-100/60" />
                          <span className="text-offwhite font-medium">{skill.name}</span>
                        </div>
                        <span className="text-orange-100/50 text-sm">{skill.level}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${category.barColor} transition-all duration-1000 ease-out ${
                            activeSkill === `${category.name}-${skill.name}` ? 'animate-pulse' : ''
                          }`}
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 100) + (skillIndex * 100)}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CI/CD Pipeline Animation */}
        <div className={`mb-16 opacity-0 ${isVisible ? 'animate-fade-in-up animation-delay-600' : ''}`}>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-orange-300 mb-6 text-center font-rajdhani">My DevOps Workflow</h3>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {[
                { name: 'Code', icon: Code, color: 'from-orange-500 to-orange-600' },
                { name: 'Build', icon: Settings, color: 'from-amber-500 to-amber-600' },
                { name: 'Test', icon: CheckCircle, color: 'from-yellow-500 to-yellow-600' },
                { name: 'Deploy', icon: Container, color: 'from-orange-400 to-red-400' },
                { name: 'Monitor', icon: Monitor, color: 'from-red-400 to-orange-500' },
              ].map((step, index) => (
                <React.Fragment key={step.name}>
                  <div className="group flex flex-col items-center space-y-2">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow-warm`}>
                      <step.icon size={28} className="text-black" />
                    </div>
                    <span className="text-offwhite font-medium">{step.name}</span>
                  </div>
                  {index < 4 && (
                    <ArrowRight size={20} className="text-orange-400/40 hidden md:block animate-pulse" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className={`opacity-0 ${isVisible ? 'animate-fade-in-up animation-delay-800' : ''}`}>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-orange-300 mb-6 text-center font-rajdhani">Certifications & Goals</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-orange-400/30 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-glow-orange">
                    <CheckCircle size={16} className="text-black" />
                  </div>
                  <span className="text-orange-100/80">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
