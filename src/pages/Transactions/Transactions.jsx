import React, { useEffect, useState } from "react";
import { SecondaryButton, Table } from "../../components/components";
import { FaEye } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { getTransactions } from "../../_core/features/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import "./Transaction.css";
import dayjs from "dayjs";

const Transactions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { userData } = useSelector((state) => state.auth);
  const { transactions, isLoadingTransactions } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(getTransactions({ token: userData?.token }));
  }, [dispatch, userData?.token]);

  const handleView = (row) => {
    console.log("Modal Open");
    setSelectedTransaction(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

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
      name: "PAYMENT DATE",
      selector: (row) => dayjs(row.payment_date).format("ddd-DD-MMM-YYYY"),
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
      selector: (row) => (
        <span
          className="text-xl cursor-pointer"
          onClick={() => handleView(row)}>
          <FaEye title="View" className="text-green-500" />
        </span>
      ),
      sortable: false,
      center: true,
    },
  ];

  return (
    <>
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Transactions"}
          className="flex items-center justify-between">
          <div className="relative">
            <SecondaryButton
              text={"Create New Transaction"}
              icon={<MdAdd />}
              onClick={() => navigate("/dashboard/create-transaction")}
            />
          </div>
        </CardLayoutHeader>

        <CardLayoutBody removeBorder={true}>
          <Table
            pagination={true}
            columnsData={columns}
            tableData={transactions || []}
            progressPending={isLoadingTransactions}
            paginationTotalRows={transactions.length}
            paginationComponentOptions={{ noRowsPerPage: "10" }}
          />
        </CardLayoutBody>

        <CardLayoutFooter />
      </CardLayoutContainer>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Transaction Details"
        className="modal-container"
        overlayClassName="modal-overlay"
        closeTimeoutMS={400}>
        {selectedTransaction && (
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Transaction Details</h2>
            <img
              src={selectedTransaction?.document_url}
              alt="Document"
              className="object-cover w-full h-40 mb-4 rounded-md"
            />
            <p>
              <strong>Bank:</strong> {selectedTransaction?.bank_name}
            </p>
            <p>
              <strong>Amount:</strong> {selectedTransaction?.amount}
            </p>
            <p>
              <strong>Status:</strong> {selectedTransaction?.status}
            </p>
            <button
              onClick={closeModal}
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md">
              Close
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Transactions;
