import React from "react";
import { HiOutlineBell } from "react-icons/hi"; // Importing an icon for notification

const NotificationCard = ({ notification }) => {
  const { title, description, type, user } = notification;

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white flex items-start gap-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex-shrink-0">
        {/* User image or initials */}
        {user.image_url ? (
          <img
            src={user.image_url}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg border-2 border-indigo-500">
            {user.first_name[0].toUpperCase()}
            {user.last_name[0].toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <HiOutlineBell className="text-indigo-500 text-xl" />
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-2">
          Type: <span className="font-medium text-indigo-600">{type}</span>
        </p>
      </div>
    </div>
  );
};

// Example usage
const App = () => {
  const notificationData = {
    id: 16,
    created_at: "2025-01-06T23:47:38.997Z",
    title: "New Booking Created",
    description: "New Booking has been created by ali",
    type: "UserToAdmin",
    user: {
      id: 63,
      first_name: "ali",
      last_name: "khan",
      image_url: null, // Set to a valid URL if available
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <NotificationCard notification={notificationData} />
    </div>
  );
};

export default App;
