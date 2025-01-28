import React, { useEffect, useState, useCallback } from "react";
import { FixedSizeList as List } from "react-window"; // Import List from react-window
import {
  CardLayoutContainer,
  CardLayoutHeader,
} from "../../components/CardLayout/CardLayout";
import { getNotifications } from "../../utils/api_handler";
import { IoNotificationsOutline } from "react-icons/io5";

const Notifications = () => {
  const [notificationsData, setNotificationsData] = useState([]);

  const getNotificationsHandler = useCallback(async () => {
    let response = await getNotifications();
    if (response.status) {
      setNotificationsData(response.data);
    }
  }, []);

  useEffect(() => {
    getNotificationsHandler();
  }, [getNotificationsHandler]);

  // Render function for each item in the list
  const renderRow = ({ index, style }) => {
    const item = notificationsData[index];
    return (
      <div style={style} key={index}>
        <CardLayoutContainer className="w-full mb-5">
          <CardLayoutHeader
            className="flex items-center justify-start flex-wrap gap-5 py-3"
            removeBorder={true}
          >
            {/* <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjUuYcnZ-xqlGZiDZvuUy_iLx3Nj6LSaZSzQ&s"
              }
              alt="profile-img"
              className="rounded-full h-16 w-16 me-3"
            /> */}
            <IoNotificationsOutline  className="text-[46px] text-[#4B9E33]"/>
            <div>
              <h3 className="text-[12px] text-[#333]">
                {new Date(item?.created_at).toISOString().split("T")[0]}
                {/* {item?.created_at} */}
              </h3>
              <h4 className="mb-0 text-[18px] font-semibold text-[#666]">
                {item?.title}
              </h4>
              <h4 className="mb-0 text-[12px] text-text">
                {item?.description}
              </h4>
            </div>
          </CardLayoutHeader>
        </CardLayoutContainer>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      {notificationsData.length > 0 ? (
        <List
          height={600} // Set the height of the viewport
          itemCount={notificationsData.length} // Number of items to render
          itemSize={100} // Height of each item in pixels (adjust as needed)
          width="100%" // Set the width of the list
        >
          {renderRow}
        </List>
      ) : (
        <p>No notifications found</p>
      )}
    </div>
  );
};

export default Notifications;
