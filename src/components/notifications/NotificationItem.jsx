import { motion } from 'framer-motion';
import { X, AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';

const NotificationItem = ({ notification, onMarkAsRead, onRemove }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertCircle;
      default: return Info;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'success': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'error': return '#EF4444';
      default: return '#3B82F6';
    }
  };

  const Icon = getIcon(notification.type);
  const color = getColor(notification.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 border-b border-accent/5 hover:bg-accent/5 transition-colors ${
        !notification.read ? 'bg-accent/5' : ''
      }`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 mt-0.5" style={{color}} />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-primary text-sm">
            {notification.title}
          </p>
          <p className="text-xs text-accent mt-1">
            {notification.message}
          </p>
          <p className="text-xs text-accent/70 mt-2">
            {new Date(notification.timestamp).toLocaleString()}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(notification.id);
          }}
          className="p-1 hover:bg-accent/10 rounded"
        >
          <X className="w-4 h-4 text-accent" />
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationItem;