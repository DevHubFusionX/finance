import { Tag } from 'lucide-react';
import CategoryHeader from './list/CategoryHeader';
import CategoryItem from './list/CategoryItem';

const CategoryList = ({ categories, type, onEdit, onDelete }) => {
  if (categories.length === 0) return null;

  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <CategoryHeader type={type} count={categories.length} />
      <div className="space-y-2 mt-4">
        {categories.map((category) => (
          <CategoryItem
            key={category._id || category.id}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;