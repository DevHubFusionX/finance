const InsightCard = ({ insight }) => {
  const { type, title, message, bgColor, borderColor } = insight;

  return (
    <div className={`p-5 ${bgColor} rounded-lg border ${borderColor} hover:shadow-finance transition-finance`}>
      <h4 className="font-bold text-primary mb-2 text-base">{title}</h4>
      <p className="text-secondary text-sm leading-relaxed">{message}</p>
    </div>
  );
};

export default InsightCard;