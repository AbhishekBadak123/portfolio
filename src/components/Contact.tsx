import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Phone, MapPin, Send, Terminal, Github, Linkedin, 
  Instagram, MessageCircle, Calendar, Clock, CheckCircle
} from 'lucide-react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Welcome to Abhishek\'s Contact Terminal v1.0',
    'Type "help" for available commands',
    ''
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTerminalCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let response = '';

    switch (cmd) {
      case 'help':
        response = `Available commands:
  • hire --name "Your Name" --message "Your message"
  • social --platform [linkedin|github|instagram]
  • status
  • skills
  • contact
  • clear`;
        break;
      case 'status':
        response = `🟢 Online and available for opportunities
📧 Response time: Within 24 hours
🎯 Currently seeking: DevOps/Cloud Engineering roles`;
        break;
      case 'skills':
        response = `Core skills: DevOps, Docker, Kubernetes, AWS, CI/CD, Python, JavaScript`;
        break;
      case 'contact':
        response = `📧 Email: badakabhishek170@gmail.com\n📱 Phone: 9175510587\n📍 Location: Aurangabad, Maharashtra, India`;
        break;
      case 'clear':
        setTerminalOutput([
          'Terminal cleared.',
          'Type "help" for available commands',
          ''
        ]);
        return;
      default:
        if (cmd.startsWith('hire ')) {
          response = `Thank you for your interest! I'll get back to you soon. 🚀`;
        } else if (cmd.startsWith('social ')) {
          const platform = cmd.split(' ')[1];
          switch (platform) {
            case 'linkedin':
              response = `Opening LinkedIn: https://linkedin.com/in/abhishek-badak-73899228a`;
              break;
            case 'github':
              response = `Opening GitHub: https://github.com/abhibadak`;
              break;
            case 'instagram':
              response = `Opening Instagram: https://instagram.com/abhi_badak01`;
              break;
            default:
              response = `Unknown platform. Available: linkedin, github, instagram`;
          }
        } else {
          response = `Command not found: ${cmd}. Type "help" for available commands.`;
        }
    }

    setTerminalOutput(prev => [...prev, `$ ${command}`, response, '']);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      handleTerminalCommand(terminalInput);
      setTerminalInput('');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'badakabhishek170@gmail.com',
      href: 'mailto:badakabhishek170@gmail.com',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '9175510587',
      href: 'tel:9175510587',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Aurangabad, Maharashtra',
      href: '#',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Calendar,
      label: 'Availability',
      value: 'Open to Opportunities',
      href: '#',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/abhibadak',
      color: 'from-gray-700 to-gray-800',
      username: '@abhibadak'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/abhishek-badak-73899228a',
      color: 'from-blue-600 to-blue-700',
      username: 'Abhishek Badak'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/abhi_badak01',
      color: 'from-pink-500 to-purple-600',
      username: '@abhi_badak01'
    },
    {
      icon: MessageCircle,
      label: 'Discord',
      href: '#',
      color: 'from-indigo-500 to-indigo-600',
      username: 'abhibadak'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden text-offwhite">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-paytone mb-4 text-candy-pink drop-shadow-neonPink">
            Let's Connect
          </h2>
          <p className="text-offwhite/85 max-w-2xl mx-auto text-base md:text-lg">
            Ready to collaborate on your next DevOps project? Let's connect and build something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {/* Status Card */}
            <div className="bg-slate-950/42 backdrop-blur-lg rounded-2xl p-6 border border-white/12">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-candy-green font-medium">Available</span>
                </div>
                <div className="flex items-center space-x-2 text-offwhite/65">
                  <Clock size={16} />
                  <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-candy-pink mb-2">Let's Build Something Great!</h3>
              <p className="text-offwhite/78">
                I'm currently seeking opportunities in DevOps and Cloud Engineering. 
                Open to freelance projects, internships, and full-time positions.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((contact, index) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className={`group block p-4 bg-slate-950/42 backdrop-blur-lg rounded-xl border border-white/12 hover:border-candy-pink/40 transition-all duration-300 hover:scale-105 transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-neon-purple`}>
                      <contact.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-offwhite/65">{contact.label}</div>
                      <div className="text-offwhite font-medium">{contact.value}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-slate-950/42 backdrop-blur-lg rounded-2xl p-6 border border-white/12">
              <h3 className="text-xl font-bold text-candy-pink mb-4">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center space-x-3 p-3 bg-white/6 rounded-xl border border-white/12 hover:border-candy-pink/40 transition-all duration-300 hover:scale-105 transform transition-all duration-1000 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-neon-purple`}>
                      <social.icon size={20} className="text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-offwhite font-medium text-sm">{social.label}</div>
                      <div className="text-offwhite/65 text-xs truncate">{social.username}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal Interface */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/12 overflow-hidden shadow-neon-purple">
              {/* Terminal Header */}
              <div className="bg-white/8 px-4 py-3 border-b border-white/12">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2 text-offwhite/65">
                    <Terminal size={16} />
                    <span className="text-sm font-fira-code">badakabhishek170@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 h-80 overflow-y-auto font-fira-code text-sm">
                {terminalOutput.map((line, index) => (
                  <div key={index} className={`${line.startsWith('$') ? 'text-green-400' : 'text-offwhite/85'} whitespace-pre-wrap`}>
                    {line}
                  </div>
                ))}
              </div>

              {/* Terminal Input */}
              <form onSubmit={handleTerminalSubmit} className="border-t border-white/12 p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-fira-code">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type a command..."
                    className="flex-1 bg-transparent text-offwhite outline-none font-fira-code placeholder-offwhite/40 focus-neon"
                  />
                  <button
                    type="submit"
                    className="w-8 h-8 bg-candy-pink hover:brightness-110 rounded-full flex items-center justify-center transition-colors shadow-neon-pink"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => handleTerminalCommand('hire --name "Visitor" --message "Hello!"')}
                className="bg-candy-green text-black hover:brightness-110 px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-neon-green animate-neon-flicker"
              >
                <MessageCircle size={16} />
                <span>Quick Hire</span>
              </button>
              <button
                onClick={() => handleTerminalCommand('status')}
                className="bg-slate-950/42 hover:bg-slate-900/55 border border-white/12 hover:border-candy-pink/40 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <CheckCircle size={16} />
                <span>Check Status</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
