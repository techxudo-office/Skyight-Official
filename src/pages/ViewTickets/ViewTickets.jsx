import React, { useEffect, useState } from "react";
import {
  SecondaryButton,
  ConfirmModal,
  TableNew,
} from "../../components/components";
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
