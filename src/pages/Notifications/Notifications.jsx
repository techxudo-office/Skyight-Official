import React from "react";

const NotificationItem = ({ title, message, time, isNew }) => (
  <div
    className={`flex items-start gap-4 p-4 border-b ${
      isNew ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
    }`}
  >
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
      N
    </div>
    <div className="flex-1">
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600">{message}</p>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
    {isNew && (
      <span className="text-xs text-blue-500 font-semibold px-2 py-1 border border-blue-500 rounded-md">
        New
      </span>
    )}
  </div>
);

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Message",
      message: "You have received a new message from John.",
      time: "5 mins ago",
      isNew: true,
    },
    {
      id: 2,
      title: "Meeting Reminder",
      message: "Don't forget about your meeting at 3 PM.",
      time: "2 hours ago",
      isNew: false,
    },
    {
      id: 3,
      title: "System Update",
      message: "A new system update is available. Please update your app.",
      time: "Yesterday",
      isNew: false,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white text-center py-4">
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
