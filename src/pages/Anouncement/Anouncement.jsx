import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import {
  CardLayoutContainer,
  CardLayoutHeader,
} from "../../components/CardLayout/CardLayout";
import { Spinner, BellIcon } from "../../components/components";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "../../_core/features/notificationSlice";

const Announcement = () => {
  const dispatch = useDispatch();
  const { announcements, isLoadingAnnouncements } = useSelector(
    (state) => state.notification
  );
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData?.token) return;
    dispatch(getAnnouncements(userData.token));
  }, [dispatch, userData?.token]);

  const announcementData = announcements?.[0] || [];

  const renderRow = ({ index, style }) => {
    const item = announcementData[index];
    return (
      <div style={style} key={item?.id || index}>
        <CardLayoutContainer className="w-full mb-5">
          <CardLayoutHeader
            className="flex flex-wrap items-center justify-start gap-5 py-3"
            removeBorder={true}
          >
            <BellIcon
              icon={
                <HiOutlineSpeakerphone className="text-[30px] text-primary" />
              }
            />
            <div>
              <h3 className="text-[12px] text-[#333]">
                {new Date(item?.created_at).toISOString().split("T")[0]}
              </h3>
              <h4 className="mb-0 text-[18px] font-semibold text-[#666]">
                {item?.title || "No Title"}
              </h4>
              <h4 className="mb-0 text-[12px] text-text">
                {item?.description || "No Description"}
              </h4>
            </div>
          </CardLayoutHeader>
        </CardLayoutContainer>
      </div>
    );
  };
  console.log(announcementData, "announeceents")
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {isLoadingAnnouncements ? (
        <Spinner className="mx-auto text-primary" />
      ) : announcementData.length > 0 ? (
        <List
          height={600}
          itemCount={announcementData.length}
          itemSize={100}
          width="100%"
        >
          {renderRow}
        </List>
      ) : (
        <h2 className="text-center capitalize text-text">
          No Announcements yet
        </h2>
      )}
    </div>
  );
};

export default Announcement;
