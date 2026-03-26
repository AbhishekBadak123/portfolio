import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Award, Target, Heart, Code, Server, Cloud, Zap } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('journey');
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

  const passions = [
    { icon: Code, label: 'DevOps', color: 'from-orange-500 to-orange-600' },
    { icon: Cloud, label: 'Cloud', color: 'from-amber-500 to-amber-600' },
    { icon: Server, label: 'Infrastructure', color: 'from-yellow-500 to-yellow-600' },
    { icon: Zap, label: 'Automation', color: 'from-red-400 to-orange-500' },
  ];

  const achievements = [
    {
      year: '2025',
      title: 'Started DevOps Journey',
      description: 'Began exploring container technologies and CI/CD pipelines',
      icon: Target,
    },
    {
      year: '2025',
      title: 'Cloud Projects',
      description: 'Successfully deployed multiple applications on AWS and Azure',
      icon: Cloud,
    },
    {
      year: '2025',
      title: 'Open Source Contributor',
      description: 'Contributing to DevOps tools and sharing knowledge with the community',
      icon: Award,
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-orange-100/70 max-w-2xl mx-auto text-base md:text-lg">
            Passionate about building scalable infrastructure and automating complex workflows
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 opacity-0 ${isVisible ? 'animate-fade-in-up animation-delay-200' : ''}`}>
          <div className="bg-white/5 backdrop-blur-xl rounded-full p-2 border border-white/10">
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                activeTab === 'journey'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-glow-orange'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Professional Journey
            </button>
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                activeTab === 'philosophy'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-glow-amber'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Personal Philosophy
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Main Content */}
          <div className={`space-y-8 opacity-0 ${isVisible ? 'animate-fade-in-up animation-delay-400' : ''}`}>
            {activeTab === 'journey' && (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-glow-orange">
                      <GraduationCap size={20} className="text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-orange-300">Education</h3>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-amber-300">BSc (Hons) Computer Science</h4>
                    <p className="text-orange-100/80">MGM University - Pathrikar College</p>
                    <p className="text-orange-100/60">3rd Year Student | 2022-2025</p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                  <h3 className="text-xl font-bold text-orange-300 mb-4">Current Focus</h3>
                  <p className="text-orange-100/80 leading-relaxed">
                    Currently diving deep into DevOps practices, cloud infrastructure, and container orchestration.
                    I'm passionate about building reliable, scalable systems and automating complex workflows
                    to improve software delivery processes.
                  </p>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-orange-300">Journey Milestones</h3>
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-glow-amber">
                        <achievement.icon size={16} className="text-black" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-offwhite">{achievement.title}</h4>
                          <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">
                            {achievement.year}
                          </span>
                        </div>
                        <p className="text-orange-100/60 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-400 rounded-full flex items-center justify-center">
                      <Heart size={20} className="text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-orange-200">My Philosophy</h3>
                  </div>
                  <p className="text-orange-100/80 leading-relaxed">
                    I believe in the power of automation and continuous improvement. Every problem is an opportunity
                    to build something better, more efficient, and more reliable. My approach combines technical
                    excellence with creative problem-solving.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                  <h3 className="text-xl font-bold text-orange-200 mb-4">Core Values</h3>
                  <ul className="space-y-2 text-orange-100/80">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      <span>Continuous Learning and Adaptation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                      <span>Automation Over Manual Processes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      <span>Reliability and Security First</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      <span>Collaboration and Knowledge Sharing</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                  <h3 className="text-xl font-bold text-orange-200 mb-4">Future Vision</h3>
                  <p className="text-orange-100/80 leading-relaxed">
                    I envision a future where software delivery is seamless, secure, and sustainable.
                    My goal is to contribute to building infrastructures that can scale with business needs
                    while maintaining high availability and performance.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Passions */}
          <div className={`space-y-8 opacity-0 ${isVisible ? 'animate-fade-in-up animation-delay-600' : ''}`}>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-orange-300 mb-6">My Passions</h3>
              <div className="grid grid-cols-2 gap-4">
                {passions.map((passion) => (
                  <div
                    key={passion.label}
                    className="group cursor-pointer p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-400/40 transition-all duration-300 hover:scale-105"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${passion.color} rounded-full flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-300 shadow-glow-warm`}>
                      <passion.icon size={20} className="text-black" />
                    </div>
                    <h4 className="font-semibold text-offwhite group-hover:text-orange-200 transition-colors">
                      {passion.label}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-orange-300 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-orange-100/60">Learning Hours/Week</span>
                  <span className="text-orange-400 font-semibold">25+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-100/60">Projects Completed</span>
                  <span className="text-amber-400 font-semibold">15+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-100/60">Technologies Explored</span>
                  <span className="text-amber-400 font-semibold">20+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-100/60">Coffee Cups/Day</span>
                  <span className="text-orange-400 font-semibold">3-4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
