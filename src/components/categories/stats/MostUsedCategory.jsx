const MostUsedCategory = ({ category }) => {
  if (!category.name) return null;

  return (
    <div className="pt-4 border-t border-light">
      <h4 className="text-sm font-medium mb-2 text-primary">Most Used Category</h4>
      <div className="flex items-center space-x-2">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{backgroundColor: category.color}}
        />
        <span className="text-sm text-secondary">{category.name}</span>
        <span className="text-xs text-muted">({category.transactionCount} transactions)</span>
      </div>
    </div>
  );
};

export default MostUsedCategory;