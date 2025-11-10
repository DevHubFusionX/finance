import { useState, useCallback, useEffect } from 'react';
import { useTransactions } from './useQueries';
import { useAsyncOperation } from './useAsyncOperation';

const useReports = () => {
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState('30d');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [reportHistory, setReportHistory] = useState([]);
  const { execute, loading: isGenerating } = useAsyncOperation();

  const { data: transactions = [] } = useTransactions();
  
  // Generate report data from transactions
  useEffect(() => {
    const mockReportData = {
      summary: {
        totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
        totalExpenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
        transactionCount: transactions.length
      },
      transactions
    };
    setReportData(mockReportData);
  }, [transactions, reportType, dateRange]);

  const generateReport = useCallback(async () => {
    const params = {
      type: reportType,
      dateRange,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined
    };
    
    const result = await execute(
      () => financeAPI.generateReport(params),
      'Failed to generate report'
    );
    
    if (result) {
      setReportData(result.data);
    }
  }, [reportType, dateRange, selectedCategories, execute]);

  const loadReportHistory = useCallback(async () => {
    const history = await execute(
      () => financeAPI.getReportHistory(),
      'Failed to load report history'
    );
    setReportHistory(history || []);
  }, [execute]);

  const exportReport = useCallback(async (format) => {
    if (!reportData) return;
    
    const params = {
      type: reportType,
      dateRange,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      format
    };
    
    const result = await execute(
      () => financeAPI.generateReport(params),
      `Failed to export report as ${format.toUpperCase()}`
    );
    
    if (result) {
      // Create download link
      const dataStr = format === 'json' ? 
        JSON.stringify(result.data, null, 2) : 
        convertToCSV(result.data);
      
      const dataBlob = new Blob([dataStr], { 
        type: format === 'json' ? 'application/json' : 'text/csv' 
      });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `financial-report-${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }, [reportData, reportType, dateRange, selectedCategories, execute]);

  const scheduleReport = useCallback(() => {
    console.log('Scheduling report - feature coming soon');
    // TODO: Implement scheduling logic
  }, []);

  const openCustomFilters = useCallback(() => {
    console.log('Custom filters - feature coming soon');
    // TODO: Implement custom filters modal
  }, []);

  // Helper function to convert data to CSV
  const convertToCSV = (data) => {
    if (data.transactions) {
      const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
      const rows = data.transactions.map(t => [
        t.date,
        t.type,
        t.category,
        t.description,
        t.amount
      ]);
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
    return JSON.stringify(data, null, 2);
  };

  return {
    reportType,
    dateRange,
    selectedCategories,
    reportData,
    reportHistory,
    isGenerating,
    setReportType,
    setDateRange,
    setSelectedCategories,
    generateReport,
    exportReport,
    scheduleReport,
    openCustomFilters,
    loadReportHistory
  };
};

export default useReports;