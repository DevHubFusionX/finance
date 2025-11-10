import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, Shield, Zap, ArrowRight, CheckCircle2, Star, DollarSign } from 'lucide-react';
import Navbar from '@components/layout/Navbar';
import Hero from '@components/Hero';
import CTA from '@components/CTA';
import Footer from '@components/Footer';

const LandingPage = () => {
  const features = [
    { icon: Brain, title: 'AI-Powered Insights', desc: 'Smart predictions for your finances' },
    { icon: TrendingUp, title: 'Real-Time Analytics', desc: 'Track spending as it happens' },
    { icon: Shield, title: 'Bank-Level Security', desc: 'Your data is always protected' },
    { icon: Zap, title: 'Instant Sync', desc: 'Connect all your accounts' },
  ];

  const steps = [
    { num: '1', title: 'Sign Up Free', desc: 'Create your account in 30 seconds' },
    { num: '2', title: 'Connect Accounts', desc: 'Link your financial accounts securely' },
    { num: '3', title: 'Get Insights', desc: 'AI analyzes and provides recommendations' },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <Navbar />
      <Hero />

      {/* Features Preview */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Powerful Features</h2>
            <p className="text-secondary text-lg">Everything you need to master your finances</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface p-6 rounded-xl border border-light hover:border-accent/50 transition-finance"
              >
                <feature.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-secondary">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/features" className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium">
              Explore All Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="relative py-20 px-4 bg-surface/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Get Started in Minutes</h2>
            <p className="text-secondary text-lg">Simple setup, powerful results</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent text-surface rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-finance">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-secondary">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/how-it-works" className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium">
              See Detailed Process <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Preview */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold text-gold" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Loved by 10,000+ Users</h2>
          <p className="text-secondary text-lg mb-8">Join thousands who've transformed their financial lives</p>
          <div className="bg-surface p-8 rounded-2xl border border-light shadow-finance max-w-2xl mx-auto mb-8">
            <p className="text-lg text-primary mb-4 italic">
              "FinanceAI helped me save $5,000 in just 3 months. The AI insights are incredibly accurate!"
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                JD
              </div>
              <div className="text-left">
                <div className="font-semibold text-primary">John Doe</div>
                <div className="text-sm text-secondary">Product Manager</div>
              </div>
            </div>
          </div>
          <Link to="/testimonials" className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium">
            Read More Success Stories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="relative py-20 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Simple, Transparent Pricing</h2>
          <p className="text-secondary text-lg mb-12">Start free, upgrade when you're ready</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-surface p-6 rounded-xl border border-light">
              <div className="text-2xl font-bold text-primary mb-2">Free</div>
              <div className="text-3xl font-bold text-accent mb-4">$0<span className="text-sm text-secondary">/mo</span></div>
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2 text-secondary"><CheckCircle2 className="w-4 h-4 text-accent" /> Basic tracking</li>
                <li className="flex items-center gap-2 text-secondary"><CheckCircle2 className="w-4 h-4 text-accent" /> 3 accounts</li>
              </ul>
            </div>
            <div className="bg-accent p-6 rounded-xl border-2 border-accent shadow-finance-lg transform scale-105">
              <div className="text-2xl font-bold text-surface mb-2">Pro</div>
              <div className="text-3xl font-bold text-surface mb-4">$9<span className="text-sm text-surface/80">/mo</span></div>
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2 text-surface"><CheckCircle2 className="w-4 h-4 text-surface" /> AI insights</li>
                <li className="flex items-center gap-2 text-surface"><CheckCircle2 className="w-4 h-4 text-surface" /> Unlimited accounts</li>
              </ul>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-light">
              <div className="text-2xl font-bold text-primary mb-2">Business</div>
              <div className="text-3xl font-bold text-accent mb-4">$29<span className="text-sm text-secondary">/mo</span></div>
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2 text-secondary"><CheckCircle2 className="w-4 h-4 text-accent" /> Team features</li>
                <li className="flex items-center gap-2 text-secondary"><CheckCircle2 className="w-4 h-4 text-accent" /> Priority support</li>
              </ul>
            </div>
          </div>
          <Link to="/pricing" className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium">
            View Full Pricing Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;