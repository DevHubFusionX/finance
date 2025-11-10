import { Sparkles } from 'lucide-react';
import InsightCard from './InsightCard';

const AIInsights = ({ insights }) => {
  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-bold text-primary">AI Financial Insights</h3>
      </div>
      {insights.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <p className="text-secondary">Add transactions to generate insights</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <InsightCard key={index} insight={insight} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AIInsights;