import { ArrowRight, CheckCircle } from 'lucide-react';

const CTA = () => {
  const benefits = [
    'Free 14-day trial',
    'No credit card required',
    'Full access to AI insights',
    'Cancel anytime'
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Ready to Take Control of
            <span className="text-accent"> Your Finances?</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Join thousands of users who have already transformed their financial future with FinanceAI.
          </p>
        </div>

        {/* CTA Card */}
        <div className="bg-surface border border-light rounded-xl p-8 md:p-12 shadow-finance-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">
                Start Your Free Trial Today
              </h3>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-secondary">{benefit}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted">
                Over 10,000 users trust FinanceAI to manage their finances smarter.
              </p>
            </div>

            {/* Right Side - CTA Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => window.location.href = '/signup'}
                className="w-full bg-accent text-surface px-8 py-4 rounded-lg font-bold text-lg shadow-finance hover:shadow-finance-lg transition-finance flex items-center justify-center space-x-3"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button 
                onClick={() => window.location.href = '/login'}
                className="w-full bg-background border border-medium text-primary px-8 py-4 rounded-lg font-semibold hover:bg-surface transition-finance"
              >
                Already have an account? Sign In
              </button>

              <p className="text-sm text-muted text-center mt-4">
                No setup fees • No hidden costs • Cancel anytime
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <p className="text-muted">
            Questions? Contact our support team at{' '}
            <span className="text-accent font-medium">support@financeai.com</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;