import React, { useEffect, useState } from "react";
import { SecondaryButton, Table, TableNew } from "../../components/components";
import { FaEye } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { transactionColumns } from "../../data/columns";
import { getTransactions } from "../../_core/features/transactionSlice";
import { useDispatch, useSelector } from "react-redux";

const Transactions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigationHandler = () => {
    navigate("/dashboard/create-transaction");
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const { transactions, isLoadingTransactions } = useSelector(
    (state) => state.transaction
  );
  const columns = [
    {
      name: "BANK",
      selector: (row) => row.bank_name,
      sortable: false,
      minwidth: "150px",
      center: true,
    },
    {
      name: "BANK NO.",
      selector: (row) => row.bank_number,
      sortable: false,
      center: true,
    },
    {
      name: "PAYMENT NO.",
      selector: (row) => row.payment_date,
      sortable: false,
      center: true,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.amount,
      sortable: false,
      center: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: false,
      center: true,
    },
    {
      name: "",
      selector: () => (
        <span className="text-xl cursor-pointer">
          <FaEye title="View" className="text-green-500" />
        </span>
      ),
      sortable: false,
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
  ];

  useEffect(() => {
    dispatch(getTransactions({ token: userData?.token }));
  }, []);

  return (
    <>
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Transactions"}
          className="flex items-center justify-between"
        >
          <div className="relative">
            <SecondaryButton
              text={"Create New Transaction"}
              icon={<MdAdd />}
              onClick={navigationHandler}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <Table
            pagination={true}
            columnsData={columns}
            tableData={transactions}
            progressPending={isLoadingTransactions}
            paginationTotalRows={transactions.length}
            paginationComponentOptions={{ noRowsPerPage: "10" }}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default Transactions;
