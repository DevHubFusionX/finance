import { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ReportTypeSelector, ReportFilters, ReportPreview, ReportActions, ReportDetails } from '../components/reports';
import { TourGuide, TourPrompt } from '../components/tour';
import { reportsTour } from '../data/tourConfigs';
import { financeAPI } from '../services';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useCurrency } from '../hooks/useCurrency';

const Reports = () => {
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState('30d');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { formatAmount } = useCurrency();
  
  const { data: reportData, isLoading } = useQuery({
    queryKey: ['report', reportType, dateRange],
    queryFn: () => financeAPI.generateReport(reportType, dateRange)
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: financeAPI.getCategories
  });

  const exportReport = (format) => {
    alert(`Exporting report as ${format}...`);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-light px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-7 h-7 text-accent" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-primary">Financial Reports</h1>
                </div>
                <p className="text-sm sm:text-base text-secondary">Generate detailed insights and export your financial data.</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => exportReport('PDF')}
                  className="flex items-center space-x-2 bg-background border border-light text-primary px-4 py-2 rounded-lg hover:bg-accent/10 hover:border-accent transition-finance"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">PDF</span>
                </button>
                <button
                  onClick={() => exportReport('CSV')}
                  className="flex items-center space-x-2 bg-accent text-surface px-4 py-2 rounded-lg shadow-finance hover:shadow-finance-lg transition-finance"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          <TourPrompt 
            tourName="reports"
            title="Reports & Analytics Guide"
            description="Learn how to generate and export detailed financial reports."
          />
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner text="Loading report data..." />
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              {reportData && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-surface border border-light rounded-xl p-6 shadow-finance hover:shadow-finance-lg transition-finance">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mb-3">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      {formatAmount(reportData.totalIncome || 0)}
                    </div>
                    <div className="text-xs text-secondary">Total Income</div>
                  </div>
                  
                  <div className="bg-surface border border-light rounded-xl p-6 shadow-finance hover:shadow-finance-lg transition-finance">
                    <div className="w-10 h-10 bg-danger/10 rounded-full flex items-center justify-center mb-3">
                      <DollarSign className="w-5 h-5 text-danger" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      {formatAmount(reportData.totalExpenses || reportData.totalSpending || 0)}
                    </div>
                    <div className="text-xs text-secondary">Total Expenses</div>
                  </div>
                  
                  <div className="bg-surface border border-light rounded-xl p-6 shadow-finance hover:shadow-finance-lg transition-finance">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                      <DollarSign className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      {formatAmount(reportData.netSavings || reportData.totalRemaining || 0)}
                    </div>
                    <div className="text-xs text-secondary">
                      {reportData.netSavings !== undefined ? 'Net Savings' : 'Remaining'}
                    </div>
                  </div>
                  
                  <div className="bg-surface border border-light rounded-xl p-6 shadow-finance hover:shadow-finance-lg transition-finance">
                    <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center mb-3">
                      <PieChart className="w-5 h-5 text-info" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">{reportData.transactionCount || 0}</div>
                    <div className="text-xs text-secondary">Transactions</div>
                  </div>
                </div>
              )}

              {/* Filters */}
              <div data-tour="report-filters">
                <ReportFilters
                  dateRange={dateRange}
                  selectedCategories={selectedCategories}
                  categories={categories}
                  onDateRangeChange={setDateRange}
                  onCategoriesChange={setSelectedCategories}
                />
              </div>

              {/* Report Content */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div data-tour="report-types">
                  <ReportTypeSelector 
                    selectedType={reportType} 
                    onTypeChange={setReportType} 
                  />
                </div>
                
                <div data-tour="export-options">
                  <ReportPreview
                    reportData={reportData}
                    dateRange={dateRange}
                    onExport={exportReport}
                    isGenerating={isLoading}
                  />
                </div>
              </div>
              
              <ReportDetails
                reportData={reportData}
                reportType={reportType}
              />
            </>
          )}
        </div>
      </div>
      <TourGuide tourConfig={reportsTour} />
    </DashboardLayout>
  );
};

export default Reports;