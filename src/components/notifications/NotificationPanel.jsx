import { motion } from 'framer-motion';
import NotificationHeader from './NotificationHeader';
import NotificationList from './NotificationList';

const NotificationPanel = ({ 
  notifications, 
  unreadCount, 
  onMarkAsRead, 
  onRemove, 
  onMarkAllAsRead, 
  onClearAll 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 top-12 w-80 bg-background border border-accent/10 rounded-2xl shadow-lg z-50"
    >
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllAsRead={onMarkAllAsRead}
        onClearAll={onClearAll}
      />
      <NotificationList
        notifications={notifications}
        onMarkAsRead={onMarkAsRead}
        onRemove={onRemove}
      />
    </motion.div>
  );
};

export default NotificationPanel;