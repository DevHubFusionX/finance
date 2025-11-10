import { Edit2, Trash2, Lock } from 'lucide-react';

const CategoryItem = ({ category, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-light hover:border-accent hover:shadow-finance transition-finance group">
      <div className="flex items-center space-x-3">
        <div 
          className="w-3 h-3 rounded-full group-hover:scale-125 transition-finance" 
          style={{backgroundColor: category.color || '#8B5CF6'}}
        />
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-primary group-hover:text-accent transition-finance">{category.name}</span>
            {category.isDefault && (
              <Lock className="w-3 h-3 text-secondary" title="Default category" />
            )}
          </div>
          <p className="text-xs text-secondary">{category.type}</p>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <button 
          onClick={() => onEdit(category)}
          className="p-2 rounded-lg hover:bg-surface transition-finance"
          title="Edit category"
        >
          <Edit2 className="w-4 h-4 text-secondary" />
        </button>
        {!category.isDefault && (
          <button 
            onClick={() => onDelete(category._id || category.id)}
            className="p-2 rounded-lg hover:bg-danger/10 transition-finance"
            title="Delete category"
          >
            <Trash2 className="w-4 h-4 text-danger" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;