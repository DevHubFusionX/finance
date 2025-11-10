import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">AI-Powered Financial Intelligence</span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-primary">Master Your</span>
                <br />
                <span className="text-accent">
                  Financial Future
                </span>
              </h1>
              <p className="text-xl text-secondary leading-relaxed max-w-3xl mx-auto">
                Transform your finances with AI-powered insights. Track spending, set budgets, and achieve your financial goals with intelligent automation.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { icon: TrendingUp, text: 'Real-time Analytics' },
                { icon: Shield, text: 'Bank-level Security' },
                { icon: Zap, text: 'Instant Insights' },
                { icon: BarChart3, text: 'Smart Budgeting' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <feature.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-secondary">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg bg-accent text-surface shadow-finance hover:shadow-finance-lg transition-finance flex items-center justify-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg bg-surface text-primary border border-light hover:border-accent transition-finance shadow-finance hover:shadow-finance-lg"
                >
                  Sign In
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 pt-4 text-sm text-muted">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">10,000+</span>
                <span>Active Users</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
