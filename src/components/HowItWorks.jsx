import { motion } from 'framer-motion';
import { UserPlus, BarChart3, Target, TrendingUp, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Create Your Account',
      description: 'Sign up in seconds with just your email. No credit card required to get started.',
      image: '📊',
      color: 'accent'
    },
    {
      number: '02',
      icon: BarChart3,
      title: 'Connect Your Data',
      description: 'Link your accounts or manually add transactions. Our AI automatically categorizes everything.',
      image: '🔗',
      color: 'info'
    },
    {
      number: '03',
      icon: Target,
      title: 'Set Your Goals',
      description: 'Define budgets and financial goals. Get personalized recommendations to achieve them faster.',
      image: '🎯',
      color: 'success'
    },
    {
      number: '04',
      icon: TrendingUp,
      title: 'Track & Optimize',
      description: 'Monitor your progress with real-time insights and AI-powered suggestions to improve your finances.',
      image: '📈',
      color: 'warning'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-info/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-sm font-semibold text-accent">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
            Get Started in
            <br />
            <span className="text-accent">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            From signup to financial mastery in minutes. No complicated setup required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center space-x-4">
                  <div className={`text-6xl font-bold text-${step.color}/20`}>
                    {step.number}
                  </div>
                  <div className={`w-16 h-16 bg-${step.color}/10 rounded-2xl flex items-center justify-center`}>
                    <step.icon className={`w-8 h-8 text-${step.color}`} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-4">{step.title}</h3>
                  <p className="text-lg text-secondary leading-relaxed">{step.description}</p>
                </div>

                {index === steps.length - 1 && (
                  <div className="pt-4">
                    <button className="group flex items-center space-x-2 text-accent font-semibold hover:gap-3 transition-all">
                      <span>Start your journey</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-background border border-light rounded-2xl p-12 shadow-finance-lg"
                >
                  <div className="aspect-square flex items-center justify-center">
                    <div className="text-9xl">{step.image}</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="hidden lg:block absolute left-1/2 top-1/3 bottom-1/3 w-0.5 bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 -z-10" />
      </div>
    </section>
  );
};

export default HowItWorks;
