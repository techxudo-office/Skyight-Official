import React, { useEffect, useState } from "react";
import { Table } from "../../components/components";
import { getSetting } from "../../utils/api_handler";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";

const Setting = () => {
  const navigate = useNavigate();

  const [settingData, setSettingData] = useState([]);

  const columnsData = [
    { columnName: "No.", fieldName: "no.", type: "no." },
    { columnName: "Commission", fieldName: "commission", type: "text" },
    { columnName: "ID", fieldName: "id", type: "id" },
    { columnName: "Rate", fieldName: "rate", type: "id" },
    { columnName: "From", fieldName: "from", type: "id" },
    { columnName: "Status", fieldName: "status", type: "status" },
    { columnName: "Actions", fieldName: "actions", type: "actions" },
  ];

  const actionsData = [
    {
      name: "Edit",
      icon: <MdEditSquare title="Edit" className="text-blue-500" />,
      handler: (index,item) => {
        navigate("/dashboard/update-setting", { state: item });
      },
    },
  ];

  const callSettingApi = async () => {
    const response = await getSetting();
    if (response.status) {
      // is object than put in array and set into state otherwise put array in state
      setSettingData([response.data]);
    }
  };

  useEffect(() => {
    callSettingApi();
  }, []);

  return (
    <>
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader removeBorder={true} heading={"Setting"} />
        <CardLayoutBody removeBorder={true}>
          <Table
            columns={columnsData}
            data={settingData}
            actions={actionsData}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default Setting;
