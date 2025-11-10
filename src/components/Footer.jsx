import { TrendingUp, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const links = {
    product: ['Features', 'Pricing', 'Security', 'API'],
    company: ['About', 'Blog', 'Careers', 'Press'],
    support: ['Help Center', 'Contact', 'Documentation', 'Status'],
    legal: ['Terms', 'Privacy', 'Security', 'Compliance']
  };

  return (
    <footer className="py-16 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-accent">
                <TrendingUp className="w-6 h-6 text-surface" />
              </div>
              <span className="text-2xl font-bold text-primary">FinanceAI</span>
            </div>
            <p className="text-secondary mb-6 max-w-sm">
              AI-powered financial management platform helping users make smarter money decisions.
            </p>
            <div className="space-y-3 text-sm text-muted">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@financeai.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 capitalize text-primary">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-secondary hover:text-primary transition-finance text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-light pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted text-sm">
            © 2024 FinanceAI. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted hover:text-primary transition-finance">Privacy Policy</a>
            <a href="#" className="text-muted hover:text-primary transition-finance">Terms of Service</a>
            <a href="#" className="text-muted hover:text-primary transition-finance">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;