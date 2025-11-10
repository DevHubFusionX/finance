import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '../store/notifications';
import NotificationBell from './notifications/NotificationBell';
import NotificationPanel from './notifications/NotificationPanel';

const Notifications = () => {
  const { 
    notifications, 
    markAsRead, 
    removeNotification, 
    markAllAsRead,
    clearAllNotifications,
    getUnreadCount 
  } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = getUnreadCount();

  return (
    <div className="relative">
      <NotificationBell 
        unreadCount={unreadCount}
        onClick={() => setIsOpen(!isOpen)}
      />

      <AnimatePresence>
        {isOpen && (
          <NotificationPanel
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={markAsRead}
            onRemove={removeNotification}
            onMarkAllAsRead={markAllAsRead}
            onClearAll={clearAllNotifications}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;