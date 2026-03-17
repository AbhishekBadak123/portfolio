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
    { icon: Code, label: 'DevOps', color: 'from-purple-500 to-purple-600' },
    { icon: Cloud, label: 'Cloud', color: 'from-cyan-500 to-cyan-600' },
    { icon: Server, label: 'Infrastructure', color: 'from-green-500 to-green-600' },
    { icon: Zap, label: 'Automation', color: 'from-orange-500 to-orange-600' },
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
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-10 left-10 w-[420px] h-[420px] bg-candy-pink/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] bg-candy-green/20 rounded-full blur-3xl animate-blob" style={{animationDelay:'2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-paytone mb-4 text-candy-pink drop-shadow-neonPink">
            About Me
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Passionate about building scalable infrastructure and automating complex workflows
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10">
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                activeTab === 'journey'
                  ? 'bg-candy-pink text-black shadow-neon-pink'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Professional Journey
            </button>
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                activeTab === 'philosophy'
                  ? 'bg-candy-green text-black shadow-neon-green'
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
          <div className={`space-y-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {activeTab === 'journey' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-neon-purple">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-candy-pink rounded-full flex items-center justify-center shadow-neon-pink">
                      <GraduationCap size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-candy-pink">Education</h3>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-candy-pink">BSc (Hons) Computer Science</h4>
                    <p className="text-white/80">MGM University - Pathrikar College</p>
                    <p className="text-white/60">3rd Year Student | 2022-2025</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-candy-pink mb-4">Current Focus</h3>
                  <p className="text-white/80 leading-relaxed">
                    Currently diving deep into DevOps practices, cloud infrastructure, and container orchestration. 
                    I'm passionate about building reliable, scalable systems and automating complex workflows 
                    to improve software delivery processes.
                  </p>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-candy-pink">Journey Milestones</h3>
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-candy-green rounded-full flex items-center justify-center flex-shrink-0 shadow-neon-green">
                        <achievement.icon size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-white">{achievement.title}</h4>
                          <span className="text-xs bg-candy-pink/20 text-candy-pink px-2 py-1 rounded-full">
                            {achievement.year}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Heart size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">My Philosophy</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    I believe in the power of automation and continuous improvement. Every problem is an opportunity 
                    to build something better, more efficient, and more reliable. My approach combines technical 
                    excellence with creative problem-solving.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Core Values</h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span>Continuous Learning and Adaptation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      <span>Automation Over Manual Processes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Reliability and Security First</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      <span>Collaboration and Knowledge Sharing</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Future Vision</h3>
                  <p className="text-white/80 leading-relaxed">
                    I envision a future where software delivery is seamless, secure, and sustainable. 
                    My goal is to contribute to building infrastructures that can scale with business needs 
                    while maintaining high availability and performance.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Passions */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-candy-pink mb-6">My Passions</h3>
              <div className="grid grid-cols-2 gap-4">
                {passions.map((passion) => (
                  <div
                    key={passion.label}
                    className="group cursor-pointer p-4 bg-white/5 rounded-xl border border-white/10 hover:border-candy-pink/40 transition-all duration-300 hover:scale-105"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${passion.color} rounded-full flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-300 shadow-neon-purple`}>
                      <passion.icon size={20} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {passion.label}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-candy-pink mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Learning Hours/Week</span>
                  <span className="text-candy-pink font-semibold">25+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Projects Completed</span>
                  <span className="text-candy-green font-semibold">15+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Technologies Explored</span>
                  <span className="text-candy-green font-semibold">20+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Coffee Cups/Day</span>
                  <span className="text-candy-pink font-semibold">3-4</span>
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
