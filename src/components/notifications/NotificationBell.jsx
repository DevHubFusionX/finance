import { Bell } from 'lucide-react';

const NotificationBell = ({ unreadCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-accent/10 transition-colors"
    >
      <Bell className="w-6 h-6" style={{color: '#4A5568'}} />
      {unreadCount > 0 && (
        <span 
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
          style={{backgroundColor: '#EF4444'}}
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;