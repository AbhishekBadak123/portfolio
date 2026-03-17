import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, Cloud, Code, Database, GitBranch, Shield, 
  Container, Zap, Monitor, Settings, Cpu, Network,
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
      color: 'from-purple-500 to-purple-600',
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
      color: 'from-cyan-500 to-cyan-600',
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
      color: 'from-green-500 to-green-600',
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
      color: 'from-orange-500 to-orange-600',
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
      color: 'from-pink-500 to-pink-600',
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
      color: 'from-blue-500 to-blue-600',
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
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        {/* Circuit Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-paytone mb-4 text-candy-pink drop-shadow-neonPink">
            Skills & Expertise
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Comprehensive toolkit for modern DevOps and cloud infrastructure management
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-candy-pink/40 transition-all duration-300 h-full">
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-neon-purple`}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
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
                          <skill.icon size={16} className="text-white/60" />
                          <span className="text-white font-medium">{skill.name}</span>
                        </div>
                        <span className="text-white/60 text-sm">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out ${
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
        <div className={`mb-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-candy-pink mb-6 text-center">My DevOps Workflow</h3>
            
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {[
                { name: 'Code', icon: Code, color: 'from-blue-500 to-blue-600' },
                { name: 'Build', icon: Settings, color: 'from-green-500 to-green-600' },
                { name: 'Test', icon: CheckCircle, color: 'from-yellow-500 to-yellow-600' },
                { name: 'Deploy', icon: Container, color: 'from-purple-500 to-purple-600' },
                { name: 'Monitor', icon: Monitor, color: 'from-red-500 to-red-600' },
              ].map((step, index) => (
                <React.Fragment key={step.name}>
                  <div className="group flex flex-col items-center space-y-2">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-neon-purple`}>
                      <step.icon size={28} className="text-white" />
                    </div>
                    <span className="text-white font-medium">{step.name}</span>
                  </div>
                  {index < 4 && (
                    <ArrowRight size={20} className="text-white/40 hidden md:block animate-pulse" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-candy-pink mb-6 text-center">Certifications & Goals</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={cert}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-candy-pink/40 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-candy-pink rounded-full flex items-center justify-center flex-shrink-0 shadow-neon-pink">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="text-white/80">{cert}</span>
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