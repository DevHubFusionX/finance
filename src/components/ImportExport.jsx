import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, FileText, Database } from 'lucide-react';
import { useFinanceStore } from '../store';

const ImportExport = ({ isOpen, onClose }) => {
  const { exportData, exportCSV, importData } = useFinanceStore();
  const [importing, setImporting] = useState(false);

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const success = importData(e.target.result);
      setImporting(false);
      if (success) {
        alert('Data imported successfully!');
        onClose();
      } else {
        alert('Import failed. Please check your file format.');
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-primary mb-6">Import/Export Data</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-accent/20 rounded-xl">
            <h3 className="font-semibold text-primary mb-2 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </h3>
            <div className="space-y-2">
              <button
                onClick={exportData}
                className="w-full p-3 bg-primary text-background rounded-lg hover:bg-accent transition-colors flex items-center justify-center"
              >
                <Database className="w-4 h-4 mr-2" />
                Export JSON (Full Backup)
              </button>
              <button
                onClick={exportCSV}
                className="w-full p-3 bg-accent/10 text-primary rounded-lg hover:bg-accent/20 transition-colors flex items-center justify-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export CSV (Transactions)
              </button>
            </div>
          </div>

          <div className="p-4 border border-accent/20 rounded-xl">
            <h3 className="font-semibold text-primary mb-2 flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </h3>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              disabled={importing}
              className="w-full p-3 border border-accent/20 rounded-lg text-primary"
            />
            {importing && <p className="text-accent text-sm mt-2">Importing...</p>}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 p-3 border border-accent/20 text-accent rounded-lg hover:bg-accent/10 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default ImportExport;