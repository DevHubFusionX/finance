import { Home, BarChart3, Target, FileText, Settings, User, TrendingUp, Tag, X, Wallet, LogOut, DollarSign } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { financeAPI } from '../../services';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: financeAPI.getProfile,
    staleTime: 5 * 60 * 1000
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: financeAPI.getTransactions,
    staleTime: 60 * 1000
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const mainNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Budget', href: '/budget', icon: Wallet },
    { name: 'Goals', href: '/goals', icon: Target }
  ];

  const secondaryNavItems = [
    { name: 'Categories', href: '/categories', icon: Tag },
    { name: 'Reports', href: '/reports', icon: FileText }
  ];

  const accountNavItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];

  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-primary/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 z-40 bg-surface border-r border-light shadow-finance-lg transform transition-transform duration-300 lg:translate-x-0 flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="p-6 border-b border-light flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent">
              <TrendingUp className="w-6 h-6 text-surface" />
            </div>
            <span className="text-xl font-bold text-primary">FinanceAI</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-background transition-finance"
          >
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-light">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <User className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary truncate">{profile?.name || user?.email || 'User'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 px-2">Main</p>
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href} onClick={onClose}>
                    <div className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-finance ${
                      isActive 
                        ? 'bg-accent text-surface shadow-finance' 
                        : 'text-secondary hover:bg-background hover:text-primary'
                    }`}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 px-2">Manage</p>
            <div className="space-y-1">
              {secondaryNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href} onClick={onClose}>
                    <div className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-finance ${
                      isActive 
                        ? 'bg-accent text-surface shadow-finance' 
                        : 'text-secondary hover:bg-background hover:text-primary'
                    }`}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Account Navigation */}
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 px-2">Account</p>
            <div className="space-y-1">
              {accountNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href} onClick={onClose}>
                    <div className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-finance ${
                      isActive 
                        ? 'bg-accent text-surface shadow-finance' 
                        : 'text-secondary hover:bg-background hover:text-primary'
                    }`}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-light">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-danger hover:bg-danger/10 transition-finance"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
