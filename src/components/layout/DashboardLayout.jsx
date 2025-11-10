import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Notifications from '../Notifications';
import ThemeToggle from '../ThemeToggle';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{backgroundColor: '#F7FAFC'}}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 px-4 py-3 border-b flex items-center justify-between" style={{backgroundColor: '#F7FAFC', borderColor: 'rgba(74, 85, 104, 0.1)'}}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-3 rounded-xl hover:bg-opacity-20 transition-colors shadow-sm"
            style={{backgroundColor: 'rgba(74, 85, 104, 0.1)'}}
          >
            <Menu className="w-6 h-6" style={{color: '#2D3748'}} />
          </button>
          <h1 className="text-lg font-semibold" style={{color: '#2D3748'}}>FinanceAI</h1>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Notifications />
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;