import React, { useEffect, useState } from "react";
import {
  SecondaryButton,
  ConfirmModal,
  TableNew,
  Table,
} from "../../components/components";

import { MdAdd, MdEditSquare, MdAutoDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { FaEye } from "react-icons/fa";
import { ticketColumns } from "../../data/columns";
import { errorToastify } from "../../helper/toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteTicket, getTickets } from "../../_core/features/ticketSlice";

const ViewTickets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigationHandler = () => {
    setActiveIndex(null);
    navigate("/dashboard/create-ticket");
  };

  const [modalStatus, setModalStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const { tickets, isLoadingTickets, isDeletingTicket } = useSelector(
    (state) => state.ticket
  );

  const columns = [
    {
      name: "TITLE",
      selector: (row) => row.title,
      sortable: false,
      minwidth: "150px",
      center: true,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.description,
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
          <span className="text-xl cursor-pointer">
            <FaEye title="View" className="text-green-500" />
          </span>
          <span
            className="text-xl cursor-pointer"
            onClick={() => {
              setModalStatus(true);
              setDeleteId(row.id);
            }}>
            <MdAutoDelete title="Delete" className="text-red-500" />
          </span>
        </div>
      ),
      sortable: false,
      minwidth: "150px",
      center: true,
    },
  ];

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
      name: "Delete",
      icon: <MdAutoDelete title="Delete" className="text-red-500" />,
      handler: (_, item) => {
        setModalStatus(true);
        setDeleteId(item.id);
      },
    },
  ];

  const deleteTicketHandler = () => {
    if (!deleteId) {
      errorToastify("Failed to delete this ticket");
      setModalStatus(false);
    } else {
      dispatch(deleteTicket({ id: deleteId, token: userData?.token })).then(
        () => {
          setModalStatus(false);
          setDeleteId(null);
        }
      );
    }
  };

  const abortDeleteHandler = () => {
    setModalStatus(false);
    setDeleteId(null);
  };

  useEffect(() => {
    dispatch(getTickets(userData?.token));
  }, []);

  useEffect(() => {
    console.log(tickets, "tickets");
  }, [tickets]);

  return (
    <>
      <ConfirmModal
        loading={isDeletingTicket}
        status={modalStatus}
        onAbort={abortDeleteHandler}
        onConfirm={deleteTicketHandler}
      />
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Tickets"}
          className="flex items-center justify-between">
          <div className="relative">
            <SecondaryButton
              icon={<MdAdd />}
              text={"Create New Ticket"}
              onClick={navigationHandler}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <Table
            pagination={true}
            columnsData={columns}
            tableData={tickets || []}
            progressPending={isLoadingTickets}
            paginationTotalRows={tickets.length}
            paginationComponentOptions={{ noRowsPerPage: "10" }}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default ViewTickets;
