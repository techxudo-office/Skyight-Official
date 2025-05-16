import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window"; // Import List from react-window

import { IoNotificationsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../../_core/features/notificationSlice";
import { CardLayoutContainer, CardLayoutHeader } from "../../CardLayout/CardLayout";
import { BellIcon, Spinner } from "../../components";
import dayjs from "dayjs";

const NotificationDrop = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.auth);
    const { notifications, isLoadingNotifications } = useSelector(
        (state) => state.notification
    );
    console.log(notifications, "notifications");
    useEffect(() => {
        if (!userData?.token) return;
        dispatch(
            getNotifications(userData?.token)
        );
    }, [userData?.token]);

    useEffect(() => {
        console.log(notifications, "notifications");
    }, [notifications]);

    // Render function for each item in the list
    const renderRow = ({ index, style }) => {
        const item = notifications[index];
        return (
            <div style={style} key={index}>
                <CardLayoutContainer removeBg={true} className="w-full  mb-2">
                    <CardLayoutHeader
                        className="flex  items-center justify-start gap-3 py-2"
                        removeBorder={true}
                    >
                        <BellIcon
                            icon={
                                <IoNotificationsOutline className="text-[20px] text-[#5372D8]" />
                            }
                        />
                        <div className=" ">
                            <h3 className="text-xs text-[#333]">
                                {dayjs(item?.created_at).format('ddd-DD-MMM-YYYY')}
                            </h3>
                            <h4 className="mb-0 text-xs font-semibold text-[#666]">
                                {item?.title}
                            </h4>
                            <h4 className="mb-0 text-xs text-text">
                                {item?.description}
                            </h4>
                        </div>
                    </CardLayoutHeader>
                </CardLayoutContainer>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-fit items-center justify-center w-full">
            {isLoadingNotifications && <Spinner className="mx-auto text-primary" />}
            {notifications?.length > 0 ? (
                <>
                    <List
                        height={300} // Set the height of the viewport
                        itemCount={notifications?.length > 3 ? 3 : notifications?.length} // Number of items to render
                        itemSize={100} // Height of each item in pixels (adjust as needed)
                        width="100%" // Set the width of the list
                    >
                        {renderRow}
                    </List>
                    <Link to={"notifications"} className=" text-sm hover:underline hover:text-primary">View more</Link>

                </>

            ) : (
                <>
                    {!isLoadingNotifications && (
                        <h2 className="text-center capitalize text-text">
                            No Notifications Found
                        </h2>
                    )}
                </>
            )}

        </div>
    );
};

export default NotificationDrop;
