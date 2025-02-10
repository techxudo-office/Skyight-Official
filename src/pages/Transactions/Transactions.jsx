import React, { useEffect, useState } from "react";
import {
  Table,
  SecondaryButton,
  ConfirmModal,
  TableNew,
} from "../../components/components";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";

import { getTransactions } from "../../utils/api_handler";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { transactionColumns } from "../../data/columns";
import { successToastify, errorToastify } from "../../helper/toast";

const Transactions = () => {
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate("/dashboard/create-transaction");
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const [transactionsData, setTransactionsData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);

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

  const gettingTransactions = async () => {
    const response = await getTransactions();
    if (response.status) {
      setTransactionsData(response.data);
    }
  };


  useEffect(() => {
    gettingTransactions();
  }, []);

  return (
    <>
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Transactions"}
          className="flex justify-between items-center"
        >
          <div className="relative">
            <SecondaryButton
              text={"Create New Transaction"}
              onClick={navigationHandler}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <TableNew
          columnsToView={transactionColumns}
          tableData={transactionsData}
          actions={actionsData}
          activeIndex={activeIndex}

          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default Transactions;
