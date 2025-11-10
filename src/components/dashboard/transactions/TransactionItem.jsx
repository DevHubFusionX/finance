import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useFinanceStore } from '../../../store';
import { useCurrency } from '../../../hooks/useCurrency';

const TransactionItem = ({ transaction }) => {
  const { categories } = useFinanceStore();
  const { formatAmount } = useCurrency();
  
  const categoryName = categories.find(c => c.id === transaction.categoryId)?.name || 
                      transaction.category || 'Other';
  const isIncome = transaction.type === 'income';
  
  return (
    <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-light hover:border-accent hover:shadow-finance transition-finance group">
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isIncome ? 'bg-success/10 group-hover:bg-success/20' : 'bg-danger/10 group-hover:bg-danger/20'
        } transition-finance`}>
          {isIncome ? (
            <ArrowUpRight className="w-5 h-5 text-success" />
          ) : (
            <ArrowDownRight className="w-5 h-5 text-danger" />
          )}
        </div>
        <div>
          <h4 className="font-semibold text-primary group-hover:text-accent transition-finance">
            {transaction.description}
          </h4>
          <p className="text-sm text-secondary">
            {categoryName} • {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <span className={`text-lg font-bold ${
        isIncome ? 'text-success' : 'text-danger'
      }`}>
        {isIncome ? '+' : '-'}{formatAmount(Math.abs(transaction.amount))}
      </span>
    </div>
  );
};

export default TransactionItem;