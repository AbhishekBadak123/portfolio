import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Download, MapPin, Calendar, Code, Server, Cloud } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const Hero: React.FC = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const titles = [
    'DevOps Engineer',
    'Cloud Architect',
    'CI/CD Specialist',
    'Container Orchestrator',
    'Infrastructure Automator'
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles.length]);

  const stats = [
    { label: 'Containers Deployed', value: '500+', icon: Server },
    { label: 'Pipelines Built', value: '50+', icon: Code },
    { label: 'Cloud Projects', value: '25+', icon: Cloud },
  ];

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column - Text Content */}
        <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          {/* Greeting */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-fira-code text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Hello World, I'm</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-rajdhani bg-gradient-to-r from-white via-purple-200 to-cyan-400 bg-clip-text text-transparent">
              Abhishek Badak
            </h1>
          </div>

          {/* Rotating Title */}
          <div className="h-20 flex items-center">
            <div className="text-2xl md:text-3xl font-medium text-purple-300 font-poppins">
              <span className="text-white/80">I'm a </span>
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold inline-block transform transition-all duration-500">
                {titles[currentTitle]}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-white/80 max-w-xl leading-relaxed">
            3rd Year BSc (Hons) Student at MGM University's Pathrikar College, passionate about 
            DevOps, Cloud Infrastructure, and Container Orchestration. Building the future of 
            software delivery, one pipeline at a time.
          </p>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-cyan-400" />
              <span>Aurangabad, Maharashtra</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-purple-400" />
              <span>Available for Opportunities</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToContact}
              className="group bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Download Resume</span>
            </button>
            <a
              href="https://github.com/abhibadak"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <Github size={20} />
              <span>View GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Column - Profile & Stats */}
        <div className={`space-y-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          {/* Profile Image with Holographic Effect */}
          <div className="relative mx-auto w-80 h-80 group sm:w-60 sm:h-60 xs:w-40 xs:h-40">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-spin-slow opacity-75"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-slate-900 to-purple-900 rounded-full"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-500">
              <img
                src={profileImg}
                alt="Abhishek Badak"
                className="w-full h-full max-w-full max-h-full object-cover object-center rounded-full border-4 border-white/20 shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center animate-bounce">
              <Server size={24} className="text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center animate-bounce delay-75">
              <Cloud size={24} className="text-white" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 ${
                  isVisible ? 'animate-fadeInUp' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex justify-center mb-2">
                  <stat.icon size={24} className="text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://linkedin.com/in/abhishek-badak-73899228a"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              <Linkedin size={20} className="text-white" />
            </a>
            <a
              href="https://github.com/abhibadak"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              <Github size={20} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
