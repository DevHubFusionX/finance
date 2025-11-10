const NotificationHeader = ({ unreadCount, onMarkAllAsRead, onClearAll }) => {
  return (
    <div className="p-4 border-b border-accent/10 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-primary">Notifications</h3>
        {unreadCount > 0 && (
          <p className="text-sm text-accent">{unreadCount} unread</p>
        )}
      </div>
      <div className="flex space-x-2">
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
          >
            Mark all read
          </button>
        )}
        <button
          onClick={onClearAll}
          className="text-xs text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default NotificationHeader;