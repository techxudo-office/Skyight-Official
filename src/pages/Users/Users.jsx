import React, { useEffect, useState } from "react";
import {
  Table,
  SecondaryButton,
  ConfirmModal,
  TableNew,
} from "../../components/components";
import { getUsers, deleteUser } from "../../utils/api_handler";
import { MdEditSquare } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import toast from "react-hot-toast";

const Users = () => {
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate("/dashboard/create-user");
  };

  const [usersData, setUsersData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const columnsData = [
    // { columnName: "User", fieldName: "image", type: 'img' },
    { columnName: "First Name", fieldName: "first_name", type: "text" },
    { columnName: "Last Name", fieldName: "last_name", type: "text" },
    { columnName: "Email", fieldName: "email", type: "text" },
    { columnName: "Mobile Number", fieldName: "mobile_number", type: "text" },
    { columnName: "Id", fieldName: "id", type: "id" },
    { columnName: "Role", fieldName: "role", type: "text" },
    { columnName: "Status", fieldName: "status", type: "status" },
  ];

  const actionsData = [
    {
      name: "Edit",
      icon: <MdEditSquare title="Edit" className="text-blue-500" />,
      handler: (index, item) => {
        navigate("/dashboard/update-reason", { state: item });
      },
    },
    {
      name: "Delete",
      icon: <MdAutoDelete title="Delete" className="text-red-500" />,
      handler: (_, item) => {
        setModalStatus(true);
        setDeleteId(item.id);
      },
    },
  ];

  const gettingUsers = async () => {
    const response = await getUsers();
    if (response.status) {
      setUsersData(response.data);
    }
  };

  const deleteUserHandler = async () => {
    if (!deleteId) {
      toast.error("Failed to delete this user");
      setModalStatus(false);
    } else {
      const response = await deleteUser(deleteId);
      if (response.status) {
        setUsersData(usersData.filter(({ id }) => id !== deleteId));
        setModalStatus(false);
        setDeleteId(null);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }
  };

  const abortDeleteHandler = () => {
    setModalStatus(false);
    setDeleteId(null);
  };

  useEffect(() => {
    gettingUsers();
  }, []);

  return (
    <>
      <ConfirmModal
        status={modalStatus}
        abortDelete={abortDeleteHandler}
        deleteHandler={deleteUserHandler}
      />
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Users"}
          className="flex justify-between items-center"
        >
          <div className="relative">
            <SecondaryButton
              text={"Create New User"}
              onClick={navigationHandler}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          {/* <Table
            columns={columnsData}
            data={usersData}
            actions={actionsData}
          /> */}
          <TableNew
          columnsToView={columnsData}
          tableData={usersData}
          actions={actionsData}

          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default Users;
