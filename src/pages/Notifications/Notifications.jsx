import React, { useEffect, useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { getNotifications } from "../../utils/api_handler";

const Notifications = () => {
  const [notificationsData, setNotificationsData] = useState([]);

  const getNotificationsHandler = async () => {
    let response = await getNotifications();
    console.log(response);
    if (response.status) {
      setNotificationsData(response.data);
    }
  };

  useEffect(() => {
    getNotificationsHandler();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        {notificationsData &&
          notificationsData.map((item, index) => {
            return (
              <CardLayoutContainer key={index} className="w-full mb-5">
                <CardLayoutHeader
                  className="flex items-center justify-start flex-wrap gap-5 py-3"
                  removeBorder={true}
                >
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjUuYcnZ-xqlGZiDZvuUy_iLx3Nj6LSaZSzQ&s"
                    }
                    alt="profile-img"
                    className="rounded-full h-16 w-16 me-3"
                  />
                  <div>
                    <h3 className="text-lg text-text font-semibold">
                      {item.user.first_name} {item.user.last_name}
                    </h3>
                    <h4 className="mb-0 text-xl font-semibold text-primary">
                      {item.title}
                    </h4>
                    <h4 className="mb-0 text-md text-text">
                      {item.description}
                    </h4>
                    {/* <h4 className="mb-0 text-sm text-primary italic">
                {notificationData.type}
              </h4> */}
                  </div>
                </CardLayoutHeader>
              </CardLayoutContainer>
            );
          })}
      </div>
    </>
  );
};

export default Notifications;
