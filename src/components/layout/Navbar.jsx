import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            animate={{
              backgroundColor: scrolled ? 'rgba(var(--surface-rgb), 0.98)' : 'rgba(var(--surface-rgb), 0.95)',
              boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.12)' : '0 4px 16px rgba(0, 0, 0, 0.08)'
            }}
            className="backdrop-blur-xl rounded-2xl border border-light"
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
              <Link to="/" className="flex items-center gap-2.5 group">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-accent rounded-xl shadow-finance"
                >
                  <TrendingUp className="w-5 h-5 text-surface" />
                </motion.div>
                <div className="hidden sm:block">
                  <div className="font-bold text-lg text-primary">FinanceAI</div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span className="text-[10px] text-secondary font-medium tracking-wide">SMART FINANCE</span>
                  </div>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <motion.div
                      whileHover={{ y: -1 }}
                      className={`relative px-4 py-2 rounded-lg font-medium transition-finance ${
                        isActive(item.href)
                          ? 'text-accent bg-accent/10'
                          : 'text-secondary hover:text-primary hover:bg-background'
                      }`}
                    >
                      {item.name}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-2">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2 text-primary hover:bg-background rounded-lg font-medium transition-finance"
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2 bg-accent text-surface rounded-lg font-semibold shadow-finance transition-finance flex items-center gap-1.5"
                  >
                    Get Started
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 hover:bg-background rounded-lg transition-finance"
              >
                <Menu className="w-6 h-6 text-primary" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-surface shadow-2xl z-[70] lg:hidden border-l border-light"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-light">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-accent rounded-xl shadow-finance">
                      <TrendingUp className="w-5 h-5 text-surface" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-primary">FinanceAI</div>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-accent" />
                        <span className="text-[10px] text-secondary font-medium tracking-wide">SMART FINANCE</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-background rounded-lg transition-finance"
                  >
                    <X className="w-5 h-5 text-secondary" />
                  </motion.button>
                </div>

                <nav className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {navItems.map((item, i) => (
                      <Link key={item.name} to={item.href}>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-finance ${
                            isActive(item.href)
                              ? 'bg-accent/10 text-accent border border-accent/20'
                              : 'text-secondary hover:text-primary hover:bg-background border border-transparent'
                          }`}
                        >
                          {item.name}
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </nav>

                <div className="p-6 border-t border-light space-y-3">
                  <Link to="/signup">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3.5 bg-accent text-surface rounded-xl font-semibold shadow-finance flex items-center justify-center gap-2"
                    >
                      Get Started Free
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <Link to="/login">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3.5 bg-background text-primary rounded-xl font-medium border border-light hover:border-accent transition-finance"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <p className="text-center text-xs text-secondary pt-1">
                    No credit card required • Free forever
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
