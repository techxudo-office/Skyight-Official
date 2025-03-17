import React, { useEffect, useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
} from "../../components/CardLayout/CardLayout";

import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaRegCircleCheck, FaPlus } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";

import {
  ConfirmModal,
  SecondaryButton,
  Table,
} from "../../components/components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRole, getRoles } from "../../_core/features/roleSlice";

const Roles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);
  const { roles, isLoadingRoles, isDeletingRole } = useSelector(
    (state) => state.role
  );
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(getRoles({ page: 0, limit: 10, token: userData?.token }));
  }, [dispatch, userData?.token]);

  const roleColumns = [
    {
      name: "ROLE",
      selector: (row) => row.role,
      sortable: false,
      minwidth: "150px",
      center: true,
    },
    {
      name: "ROLE ID",
      selector: (row) => row.id,
      sortable: false,
      minwidth: "150px",
      center: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: false,
      minwidth: "150px",
      center: true,
    },
    {
      name: "",
      selector: (row) => (
        <div className="flex items-center gap-x-4">
          <span
            className="text-xl cursor-pointer"
            onClick={() => navigate("/dashboard/update-reason", { state: row })}
          >
            <MdEditSquare title="Edit" className="text-blue-500" />
          </span>
          <span
            className="text-xl cursor-pointer"
            onClick={() => {
              setModalStatus(true);
              setDeleteId(row.id);
            }}
          >
            <MdAutoDelete title="Delete" className="text-red-500" />
          </span>
        </div>
      ),
      sortable: false,
      minwidth: "150px",
      center: true,
    },
  ];

  const deleteUserHandler = () => {
    console.log(deleteId, "deleteId TABLE");
    if (!deleteId) {
      errorToastify("Failed to delete this user");
      setModalStatus(false);
      return;
    }

    dispatch(deleteRole({ id: deleteId, token: userData?.token })).then(() => {
      setModalStatus(false);
      setDeleteId(null);
    });
  };

  const abortDeleteHandler = () => {
    setModalStatus(false);
    setDeleteId(null);
  };

  return (
    <>
      <ConfirmModal
        status={modalStatus}
        loading={isDeletingRole}
        onAbort={abortDeleteHandler}
        onConfirm={deleteUserHandler}
      />
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Roles"}
          className="flex items-center justify-between"
        >
          <div className="relative">
            <SecondaryButton
              text={"Create New Role"}
              icon={<FaPlus />}
              onClick={() => {
                navigate("/dashboard/create-role");
              }}
              className="mb-4"
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <Table
            pagination={true}
            columnsData={roleColumns}
            tableData={roles || []}
            progressPending={isLoadingRoles}
            paginationTotalRows={roles.length}
            paginationComponentOptions={{ noRowsPerPage: "10" }}
          />
        </CardLayoutBody>
      </CardLayoutContainer>
    </>
  );
};

export default Roles;
