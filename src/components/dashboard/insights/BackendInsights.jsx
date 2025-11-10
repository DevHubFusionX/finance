import { Lightbulb, TrendingUp, PieChart, AlertTriangle, Sparkles } from 'lucide-react';
import { useInsights } from '../../../hooks/useQueries';
import InsightCard from './InsightCard';
import LoadingSpinner from '../../common/LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BackendInsights = ({ timeframe = '30d' }) => {
  const { data: insights = {}, isLoading: loading } = useInsights(timeframe);
  
  const formattedInsights = [];
  
  if (insights.netSavings > 0) {
    formattedInsights.push({
      type: 'Savings',
      icon: TrendingUp,
      message: `You saved $${insights.netSavings.toFixed(2)} this period!`,
      recommendation: 'Keep up the great work!',
      color: 'success'
    });
  } else if (insights.netSavings < 0) {
    formattedInsights.push({
      type: 'Alert',
      icon: AlertTriangle,
      message: `You spent $${Math.abs(insights.netSavings).toFixed(2)} more than earned`,
      recommendation: 'Consider reviewing your expenses',
      color: 'danger'
    });
  }
  
  if (insights.savingsRate > 20) {
    formattedInsights.push({
      type: 'Achievement',
      icon: Sparkles,
      message: `Excellent ${insights.savingsRate}% savings rate!`,
      recommendation: 'You\'re on track to meet your goals',
      color: 'info'
    });
  }
  
  if (insights.topCategories?.length > 0) {
    const topCategory = insights.topCategories[0];
    formattedInsights.push({
      type: 'Top Spending',
      icon: PieChart,
      message: `${topCategory.name}: $${topCategory.amount.toFixed(2)}`,
      recommendation: 'Your highest expense category',
      color: 'accent'
    });
  }

  if (loading) {
    return (
      <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-bold text-primary">AI Insights</h3>
        </div>
        <LoadingSpinner text="Analyzing..." />
      </div>
    );
  }

  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-bold text-primary">AI Insights</h3>
      </div>
      <div>
        {insights.recommendations?.length > 0 && insights.recommendations[0].markdown ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({node, ...props}) => <p className="text-secondary leading-relaxed mb-2" {...props} />,
              strong: ({node, ...props}) => <strong className="text-primary font-semibold" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
              li: ({node, ...props}) => <li className="text-secondary text-sm" {...props} />
            }}
          >
            {insights.recommendations[0].message}
          </ReactMarkdown>
        ) : formattedInsights.length > 0 ? (
          formattedInsights.map((insight, index) => (
            <InsightCard key={index} insight={insight} />
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <p className="text-secondary text-sm">Add transactions to see insights</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackendInsights;