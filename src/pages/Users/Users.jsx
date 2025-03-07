import React, { useEffect, useState } from "react";
import {
  Table,
  SecondaryButton,
  ConfirmModal,
  TableNew,
} from "../../components/components";
// import { getUsers, deleteUser } from "../../utils/api_handler";
import { MdAdd, MdEditSquare } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { userColumns } from "../../data/columns";
import { successToastify, errorToastify } from "../../helper/toast";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../_core/features/userSlice";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const { users, isLoadingUsers, isCreatingUser, isDeletingUser } = useSelector(
    (state) => state.user
  );

  const navigationHandler = () => {
    navigate("/dashboard/create-user");
  };
  const actionsData = [
    {
      name: "Edit",
      icon: <MdEditSquare title="Edit" className="text-blue-500" />,
      handler: (index, item) => {
        console.log("item", item);
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

  const deleteUserHandler = async (idx) => {
    if (!idx) {
      errorToastify("Failed to delete this user");
      setModalStatus(false);
    } else {
      const response = await deleteUser(idx);
      if (response.status) {
        setUsersData(usersData.filter(({ id }) => id !== idx));
        setModalStatus(false);
        setDeleteId(null);
        successToastify(response.message);
      } else {
        errorToastify(response.message);
      }
    }
  };

  const abortDeleteHandler = () => {
    setModalStatus(false);
    setDeleteId(null);
  };

  useEffect(() => {
    dispatch(getUsers(userData?.token));
  }, []);

  return (
    <>
      <ConfirmModal
        status={modalStatus}
        onAbort={abortDeleteHandler}
        onConfirm={deleteUserHandler}
      />
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Users"}
          className="flex items-center justify-between"
        >
          <div className="relative">
            <SecondaryButton
              icon={<MdAdd />}
              text={"Create New User"}
              onClick={navigationHandler}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <TableNew
            columnsToView={userColumns}
            tableData={users[0]}
            // onDeleteUser={deleteUserHandler}
            actions={actionsData}
            loader={isLoadingUsers}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default Users;
