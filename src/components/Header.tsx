import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Download, Github, Linkedin, Instagram } from 'lucide-react';
import { useTheme } from '../contexts/useTheme';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/abhibadak', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/abhishek-badak-73899228a', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/abhi_badak01', label: 'Instagram' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-black/30 backdrop-blur-xl border-b border-white/10'
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold font-rajdhani">AB</span>
            </div>
            <span className="text-xl font-bold font-rajdhani bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
              Abhishek Badak
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-orange-300 transition-colors duration-200 hover:scale-110 transform"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Download Resume */}
            <button
              onClick={scrollToContact}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-glow-orange"
            >
              <Download size={16} />
              <span className="text-sm font-semibold">Resume</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-xl border-b border-white/10 animate-fadeIn">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white/80 hover:text-orange-300 transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-orange-300 transition-colors duration-200"
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
                <button
                  onClick={scrollToContact}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black px-4 py-2 rounded-full transition-all duration-200 w-fit"
                >
                  <Download size={16} />
                  <span className="text-sm font-semibold">Download Resume</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
