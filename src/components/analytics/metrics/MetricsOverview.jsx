import MetricCard from './MetricCard';

const MetricsOverview = ({ insights }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {insights.map((insight) => (
        <MetricCard key={insight.label} insight={insight} />
      ))}
    </div>
  );
};

export default MetricsOverview;