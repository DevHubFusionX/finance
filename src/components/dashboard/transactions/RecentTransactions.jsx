import { useState } from 'react';
import { Plus, Receipt, ChevronLeft, ChevronRight } from 'lucide-react';
import TransactionItem from './TransactionItem';

const ITEMS_PER_PAGE = 5;

const RecentTransactions = ({ transactions, onAddTransaction }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-surface border border-light rounded-xl p-6 shadow-finance">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Receipt className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-bold text-primary">Recent Transactions</h2>
          <span className="text-sm text-secondary">({transactions.length})</span>
        </div>
        <button
          onClick={onAddTransaction}
          className="flex items-center space-x-2 bg-accent text-surface px-4 py-2 rounded-lg text-sm font-medium hover:shadow-finance-lg transition-finance"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Transaction</span>
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">No transactions yet</h3>
          <p className="text-secondary mb-6">Start tracking your finances by adding your first transaction</p>
          <button
            onClick={onAddTransaction}
            className="bg-accent text-surface px-6 py-3 rounded-lg shadow-finance hover:shadow-finance-lg transition-finance"
          >
            Add Your First Transaction
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedTransactions.map((transaction) => (
              <TransactionItem key={transaction._id || transaction.id} transaction={transaction} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-light">
              <p className="text-sm text-secondary">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, transactions.length)} of {transactions.length}
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-light bg-background text-primary hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-finance"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-primary">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-light bg-background text-primary hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-finance"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecentTransactions;