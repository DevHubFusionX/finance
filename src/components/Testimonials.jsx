import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Financial Advisor',
      content: 'FinanceAI has completely transformed how I manage my clients\' portfolios. The AI insights are incredibly accurate and save me hours of analysis.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Small Business Owner',
      content: 'Finally found a tool that makes financial planning simple. The automated expense tracking and budget alerts have improved my cash flow significantly.',
      rating: 5
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Healthcare Professional',
      content: 'The goal tracking feature helped me save for my dream home. The predictive analytics showed me exactly how much I needed to save each month.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Trusted by
            <span className="text-accent"> Finance Professionals</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            See how FinanceAI is helping thousands of users take control of their financial future.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-background border border-light rounded-xl p-6 shadow-finance hover:shadow-finance-lg transition-finance"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-secondary leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <h4 className="font-bold text-primary">{testimonial.name}</h4>
                <p className="text-muted text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-background border border-light rounded-xl p-8 max-w-4xl mx-auto shadow-finance">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Join Over 10,000 Happy Users
            </h3>
            <p className="text-secondary text-lg mb-6">
              Start your journey to financial freedom today with our AI-powered platform.
            </p>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-accent text-surface px-8 py-3 rounded-lg font-semibold shadow-finance hover:shadow-finance-lg transition-finance"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;