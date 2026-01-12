import { Flag, Github, Twitter, Instagram, Youtube, Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    menu: [
      { label: "Pembalap", href: "/drivers" },
      { label: "Tim", href: "/teams" },
      { label: "Jadwal", href: "/schedule" },
      { label: "Klasemen", href: "/standings" },
    ],
    resources: [
      { label: "F1 Official", href: "https://www.formula1.com", external: true },
      { label: "F1 TV", href: "https://f1tv.formula1.com", external: true },
      { label: "YouTube", href: "https://www.youtube.com/@Formula1", external: true },
    ],
  };

  const socials = [
    { icon: Twitter, href: "https://twitter.com/F1", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/f1", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@Formula1", label: "YouTube" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] border-t border-white/10">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-t from-red-600/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-gradient-to-t from-orange-600/5 to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/30">
                <Flag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                F1 Hub
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Sumber informasi terlengkap seputar Formula 1. Klasemen, jadwal balapan, profil pembalap dan tim.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-orange-500 rounded-full" />
              Menu
            </h3>
            <ul className="space-y-3">
              {links.menu.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-orange-500 rounded-full" />
              Resources
            </h3>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 transition-all duration-300" />
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-orange-500 rounded-full" />
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Dapatkan update terbaru seputar Formula 1 langsung di inbox Anda.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors text-sm"
              />
              <button className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-500 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/25">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            © {currentYear} F1 Hub. Made with{" "}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
            for F1 fans
          </p>
          
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
