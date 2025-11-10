import { Download, Upload, Trash2 } from 'lucide-react';

const DataTab = () => {
  const handleExportData = () => {
    const data = {
      settings: JSON.parse(localStorage.getItem('userSettings') || '{}'),
      transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
      budgets: JSON.parse(localStorage.getItem('budgets') || '[]'),
      goals: JSON.parse(localStorage.getItem('goals') || '[]')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finance-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.settings) localStorage.setItem('userSettings', JSON.stringify(data.settings));
        if (data.transactions) localStorage.setItem('transactions', JSON.stringify(data.transactions));
        if (data.categories) localStorage.setItem('categories', JSON.stringify(data.categories));
        if (data.budgets) localStorage.setItem('budgets', JSON.stringify(data.budgets));
        if (data.goals) localStorage.setItem('goals', JSON.stringify(data.goals));
        alert('Data imported successfully');
      } catch (error) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure? This will permanently delete all your data.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <button 
          onClick={handleExportData}
          className="p-6 bg-accent text-surface rounded-lg hover:shadow-finance-lg transition-finance text-left"
        >
          <Download className="w-6 h-6 mb-2" />
          <h4 className="font-semibold mb-1">Export Data</h4>
          <p className="text-sm opacity-90">Download your financial data</p>
        </button>
        <label className="p-6 bg-info text-surface rounded-lg hover:shadow-finance-lg transition-finance text-left cursor-pointer">
          <Upload className="w-6 h-6 mb-2" />
          <h4 className="font-semibold mb-1">Import Data</h4>
          <p className="text-sm opacity-90">Import from backup file</p>
          <input
            type="file"
            accept=".json"
            onChange={handleImportData}
            className="hidden"
          />
        </label>
      </div>
      
      <div className="p-6 bg-danger/10 border border-danger/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-danger">Danger Zone</h4>
        <p className="text-sm mb-4 text-danger">Permanently delete all your financial data</p>
        <button 
          onClick={handleClearData}
          className="flex items-center space-x-2 px-4 py-2 bg-danger text-surface rounded-lg hover:shadow-finance-lg transition-finance"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All Data</span>
        </button>
      </div>
    </div>
  );
};

export default DataTab;