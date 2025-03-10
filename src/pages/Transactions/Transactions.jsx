import React, { useEffect, useState } from "react";
import {
  Table,
  SecondaryButton,
  ConfirmModal,
  TableNew,
} from "../../components/components";
import { FaEye } from "react-icons/fa";
import { MdAdd, MdEditSquare } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { transactionColumns } from "../../data/columns";
import { successToastify, errorToastify } from "../../helper/toast";
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
          <TableNew
            actions={actionsData}
            tableData={transactions}
            activeIndex={activeIndex}
            loader={isLoadingTransactions}
            columnsToView={transactionColumns}
            extraRows={["comment", "account_holder_name", "document_url"]}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default Transactions;
