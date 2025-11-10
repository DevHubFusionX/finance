import { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../../../utils/apiClient';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AIInsights = () => {
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAIInsights();
  }, []);

  const fetchAIInsights = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/insights?timeframe=30d');
      setInsights(response.data.aiInsights);
    } catch (err) {
      setError('Failed to load AI insights');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">AI Financial Insights</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold">AI Insights Unavailable</h3>
        </div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Brain className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Financial Insights</h3>
          <p className="text-sm text-gray-600">Powered by OpenAI</p>
        </div>
      </div>
      
      <div className="text-sm">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-2" {...props} />,
            strong: ({node, ...props}) => <strong className="text-gray-900 font-semibold" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
            li: ({node, ...props}) => <li className="text-gray-700" {...props} />
          }}
        >
          {insights}
        </ReactMarkdown>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-200">
        <button
          onClick={fetchAIInsights}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Refresh Insights</span>
        </button>
      </div>
    </motion.div>
  );
};

export default AIInsights;