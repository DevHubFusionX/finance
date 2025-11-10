import { motion } from 'framer-motion';
import { Brain, BarChart3, Shield, Zap, Target, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Smart algorithms analyze your spending patterns and provide personalized recommendations to optimize your finances.',
      benefits: ['Predictive analytics', 'Smart categorization', 'Spending forecasts']
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Beautiful, interactive dashboards give you instant visibility into your financial health with live data updates.',
      benefits: ['Live data sync', 'Custom reports', 'Visual insights']
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your financial data is protected with enterprise-grade 256-bit encryption and multi-factor authentication.',
      benefits: ['End-to-end encryption', 'Secure cloud storage', 'Privacy first']
    }
  ];

  const additionalFeatures = [
    { icon: Zap, title: 'Instant Sync', desc: 'Real-time updates across all devices' },
    { icon: Target, title: 'Goal Tracking', desc: 'Set and achieve financial milestones' },
    { icon: TrendingUp, title: 'Smart Budgets', desc: 'Automated budget recommendations' }
  ];

  return (
    <section id="features" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-sm font-semibold text-accent">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
            Everything You Need,
            <br />
            <span className="text-accent">All in One Place</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Comprehensive tools designed to give you complete control over your financial life.
          </p>
        </motion.div>

        {/* Main Features - Large Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-surface border border-light rounded-2xl p-8 shadow-finance hover:shadow-finance-lg transition-finance group"
            >
              <div className="space-y-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{feature.title}</h3>
                  <p className="text-secondary leading-relaxed mb-6">{feature.description}</p>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm text-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features - Compact Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-surface border border-light rounded-xl p-6 shadow-finance hover:shadow-finance-lg transition-finance"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">{feature.title}</h4>
                  <p className="text-sm text-secondary">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-surface border border-light rounded-3xl p-12 shadow-finance-lg overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="relative  text-center max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Ready to Transform Your Finances?
              </h3>
              <p className="text-lg text-secondary mb-8">
                Join over 10,000 users who are already making smarter financial decisions with FinanceAI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group px-8 py-4 bg-accent text-surface rounded-xl font-semibold shadow-finance hover:shadow-finance-lg transition-finance flex items-center justify-center space-x-2"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-background text-primary border border-light rounded-xl font-semibold hover:border-accent transition-finance"
                  >
                    Sign In
                  </motion.button>
                </Link>
              </div>

              <p className="text-sm text-muted mt-6">
                No credit card required • Free 14-day trial • Cancel anytime
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
