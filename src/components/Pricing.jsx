import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        'Up to 50 transactions/month',
        'Basic analytics',
        'Manual transaction entry',
        'Email support',
        'Mobile app access'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '9.99',
      description: 'For serious financial planning',
      features: [
        'Unlimited transactions',
        'AI-powered insights',
        'Automatic categorization',
        'Priority support',
        'Advanced analytics',
        'Budget alerts',
        'Goal tracking',
        'Export reports'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Business',
      price: '29.99',
      description: 'For teams and businesses',
      features: [
        'Everything in Pro',
        'Multi-user access',
        'Team collaboration',
        'Custom categories',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'White-label options'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-sm font-semibold text-accent">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
            Simple, Transparent
            <br />
            <span className="text-accent">Pricing</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-surface border rounded-2xl p-8 shadow-finance hover:shadow-finance-lg transition-finance ${
                plan.popular ? 'border-accent lg:scale-105' : 'border-light'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-1 px-4 py-1 bg-accent rounded-full shadow-finance">
                    <Sparkles className="w-3 h-3 text-surface" />
                    <span className="text-xs font-bold text-surface">MOST POPULAR</span>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                  <p className="text-sm text-secondary">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-primary">${plan.price}</span>
                  <span className="text-secondary ml-2">/month</span>
                </div>

                {/* CTA */}
                <Link to="/signup">
                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-finance ${
                      plan.popular
                        ? 'bg-accent text-surface shadow-finance hover:shadow-finance-lg'
                        : 'bg-background text-primary border border-light hover:border-accent'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>

                {/* Features */}
                <div className="space-y-3 pt-6 border-t border-light">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-secondary">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
