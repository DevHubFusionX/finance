import { Bell } from 'lucide-react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications, onMarkAsRead, onRemove }) => {
  if (notifications.length === 0) {
    return (
      <div className="p-6 text-center text-accent">
        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No notifications</p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {notifications.slice(0, 10).map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default NotificationList;