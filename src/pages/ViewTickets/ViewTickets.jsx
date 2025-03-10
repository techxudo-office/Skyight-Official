import React, { useEffect, useState } from "react";
import {
  SecondaryButton,
  ConfirmModal,
  TableNew,
} from "../../components/components";
import { deleteTicket } from "../../utils/api_handler";
import { MdAutoDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { FaEye } from "react-icons/fa";
import { ticketColumns } from "../../data/columns";
import { successToastify, errorToastify } from "../../helper/toast";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../_core/features/ticketSlice";

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
  const { tickets, isLoadingTickets } = useSelector((state) => state.ticket);

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

  const deleteTicketHandler = async () => {
    if (!deleteId) {
      errorToastify("Failed to delete this ticket");
      setModalStatus(false);
    } else {
      const response = await deleteTicket(deleteId);
      if (response.status) {
        // setTicketsData(ticketsData.filter(({ id }) => id !== deleteId));
        // Fix: Use prevState.filter() instead of directly modifying state.
        setTicketsData((prevTickets) =>
          prevTickets.filter(({ id }) => id !== deleteId)
        );
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
    dispatch(getTickets(userData?.token));
  }, []);

  useEffect(() => {
    console.log(tickets, "tickets");
  }, [tickets]);

  return (
    <>
      <ConfirmModal
        status={modalStatus}
        onAbort={abortDeleteHandler}
        onConfirm={deleteTicketHandler}
      />
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Tickets"}
          className="flex items-center justify-between"
        >
          <div className="relative">
            <SecondaryButton
              icon={<MdAdd />}
              text={"Create New Ticket"}
              onClick={navigationHandler}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <TableNew
            columnsToView={ticketColumns}
            tableData={tickets}
            actions={actionsData}
            activeIndex={activeIndex}
            extraRows={["title", "description"]}
            loader={isLoadingTickets}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default ViewTickets;
