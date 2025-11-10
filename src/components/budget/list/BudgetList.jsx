import BudgetItem from './BudgetItem';

const BudgetList = ({ budgets, onEdit, onDelete }) => {
  return (
    <div className="grid gap-6">
      {budgets.map((budget) => (
        <BudgetItem
          key={budget._id || budget.id}
          budget={budget}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BudgetList;