import React, { useEffect, useState } from "react";
import {
  Table,
  SecondaryButton,
  ConfirmModal,
  TableNew,
  Spinner,
} from "../../components/components";
import { getTickets, deleteTicket } from "../../utils/api_handler";

import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { FaEye } from "react-icons/fa";
import { ticketColumns } from "../../data/columns";
import { successToastify, errorToastify } from "../../helper/toast"
import { MdAdd } from "react-icons/md";

const ViewTickets = () => {
  const navigate = useNavigate();

  const navigationHandler = () => {
    setActiveIndex(null); // Reset active state
    navigate("/dashboard/create-ticket");
  };

  const [ticketsData, setTicketsData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);


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
  ];

  const gettingTickets = async () => {
    const response = await getTickets();
    if (response.status) {
      setTicketsData(response.data);
    }
  };

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
    gettingTickets();
  }, []);

  return (
    <>
      <ConfirmModal
        status={modalStatus}
        abortDelete={abortDeleteHandler}
        deleteHandler={deleteTicketHandler}
      />
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Tickets"}
          className="flex justify-between items-center"
        >
          <div className="relative">
            <SecondaryButton
            icon={<MdAdd/>}
              text={"Create New Ticket"}
              onClick={navigationHandler}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <TableNew
            columnsToView={ticketColumns}
            tableData={ticketsData}
            actions={actionsData}
            activeIndex={activeIndex}
            extraRows={['title','description']}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default ViewTickets;
