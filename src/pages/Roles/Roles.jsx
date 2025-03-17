import React, { useEffect, useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";

import { FaEye } from "react-icons/fa";
import { MdEditSquare, MdFilterList } from "react-icons/md";
import { FaRegCircleCheck, FaPlus } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";

import {
  Dropdown,
  SecondaryButton,
  Table,
  TableNew,
} from "../../components/components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../_core/features/roleSlice";
import { roleColumns } from "../../data/columns";

const Roles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const { roles, isLoadingRoles } = useSelector((state) => state.role);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(getRoles({ page: 0, limit: 10, token: userData?.token }));
  }, [dispatch, userData?.token]);

  const actionsData = [
    {
      name: "View",
      icon: <FaEye title="View" className="text-green-500" />,
      handler: (index) => {
        if (activeIndex === index) {
          setActiveIndex(null);
        } else setActiveIndex(index);
      },
    },
    {
      name: "Edit",
      icon: <MdEditSquare title="Edit" className="text-blue-500" />,
      handler: () => {
        alert("Hello Im Edit Alert !");
      },
    },
    {
      name: "Rights",
      icon: (
        <FaRegCircleCheck title="Rights" className="text-sm text-orange-500" />
      ),
      handler: () => {
        alert("Hello Im Rights Alert !");
      },
    },
    {
      name: "Delete",
      icon: <MdAutoDelete title="Delete" className="text-red-500" />,
      handler: () => {
        alert("Hello Im Delete Alert !");
      },
    },
  ];

  const filterOptions = [
    {
      name: "Filter One",
      handler: () => {
        setDropdownStatus(!dropdownStatus);
      },
    },
    {
      name: "Filter Two",
      handler: () => {
        setDropdownStatus(!dropdownStatus);
      },
    },
    {
      name: "Filter Three",
      handler: () => {
        setDropdownStatus(!dropdownStatus);
      },
    },
  ];

  return (
    <>
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Roles"}
          className="flex items-center justify-between">
          <div className="relative">
            <SecondaryButton
              text={"Create New Role"}
              icon={<FaPlus />}
              onClick={() => {
                navigate("/dashboard/create-role");
              }}
              className="mb-4"
            />
            <SecondaryButton
              text={"Filters"}
              icon={<MdFilterList />}
              onClick={() => {
                setDropdownStatus(!dropdownStatus);
              }}
            />
            <Dropdown
              className={"top-16 right-10"}
              status={dropdownStatus}
              changeStatus={setDropdownStatus}
              options={filterOptions}
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
