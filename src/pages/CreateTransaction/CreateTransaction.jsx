import React, { useState, useEffect, useMemo } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PiBankBold } from "react-icons/pi";

import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";

import {
  Input,
  Spinner,
  Button,
  SecondaryButton,
  Select,
  CustomDate,
  TextArea,
} from "../../components/components";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { transactionInitialValues, transactionSchema } from "../../validations";
import { allowedTypes } from "../../helper/allowedTypes";
import { errorToastify } from "../../helper/toast";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../../_core/features/transactionSlice";
import { getBanks } from "../../_core/features/bookingSlice";

const CreateTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const banksData = useSelector((state) => state.booking.banks);
  const { isCreatingTransaction } = useSelector((state) => state.transaction);

  useEffect(() => {
    if (!userData?.token) return;
    dispatch(getBanks(userData?.token));
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        errorToastify("Only JPG, JPEG, and PNG formats are allowed.");
      }
    }
  };

  const handleSubmit = (values) => {
    if (!selectedFile) {
      errorToastify("Please upload transaction receipt");
      return;
    }

    const formData = new FormData();
    formData.append("bank_name", values.bank_name);
    formData.append("bank_number", values.bank_number);
    formData.append("account_holder_name", values.account_holder_name);
    formData.append("document_number", values.document_number);
    formData.append("payment_date", values.payment_date);
    formData.append("amount", values.amount);
    formData.append("comment", values.comment);
    formData.append("document", selectedFile);

    dispatch(
      createTransaction({ data: formData, token: userData?.token })
    ).then(() => {
      navigate("/dashboard/transactions");
    });
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <CardLayoutContainer className={"mb-5"}>
          <CardLayoutHeader
            heading="Transaction Receipt"
            className={"flex items-center justify-between"}
          />
          <CardLayoutBody>
            <div className="flex flex-col items-center justify-center gap-4 mt-2">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Uploaded Preview"
                  className="object-cover border-2 rounded-xl border-slate-100"
                />
              ) : (
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center p-16"
                >
                  <FaCloudUploadAlt className="mb-3 text-5xl transition-all cursor-pointer text-slate-400 upload-icon" />
                  <h2 className="text-center text-md text-slate-500">
                    Upload Transaction Receipt
                  </h2>
                </label>
              )}
            </div>
          </CardLayoutBody>
          <CardLayoutFooter>
            <label
              htmlFor="image-upload"
              className="px-4 py-2 font-semibold transition duration-300 bg-blue-100 rounded-full cursor-pointer hover:bg-secondary text-primary hover:text-white"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </CardLayoutFooter>
        </CardLayoutContainer>
        <CardLayoutContainer>
          <CardLayoutHeader
            heading="Create Transaction"
            className={"flex items-center justify-between"}
          />
          <Formik
            initialValues={transactionInitialValues}
            validationSchema={transactionSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <CardLayoutBody>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-5 mb-7">
                    <div className="relative mb-5">
                      <Select
                        id="bank_name"
                        label="Bank Name"
                        options={banksData}
                        value={values.bank_name}
                        placeholder="Select Bank"
                        onChange={(option) =>
                          setFieldValue("bank_name", option.label)
                        }
                        optionIcons={<PiBankBold />}
                      />
                      {touched.bank_name && errors.bank_name && (
                        <div className="absolute left-0 mt-2 text-sm text-red-500">
                          {errors.bank_name}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-5">
                      <Input
                        id={"bank_number"}
                        name={"bank_number"}
                        label={"Bank Number"}
                        type={"text"}
                        value={values.bank_number}
                        placeholder={"Enter Bank Number"}
                        onChange={(e) =>
                          setFieldValue("bank_number", e.target.value)
                        }
                      />
                      {touched.bank_number && errors.bank_number && (
                        <div className="absolute left-0 mt-2 text-sm text-red-500">
                          {errors.bank_number}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-5">
                      <Input
                        id={"account_holder_name"}
                        name={"account_holder_name"}
                        label={"Account Holder Name"}
                        type={"text"}
                        value={values.account_holder_name}
                        placeholder={"Enter Account Holder Name"}
                        onChange={(e) =>
                          setFieldValue("account_holder_name", e.target.value)
                        }
                      />
                      {touched.account_holder_name &&
                        errors.account_holder_name && (
                          <div className="absolute left-0 mt-2 text-sm text-red-500">
                            {errors.account_holder_name}
                          </div>
                        )}
                    </div>
                    <div className="relative mb-5">
                      <Input
                        id={"document_number"}
                        name={"document_number"}
                        label={"Account Number"}
                        type={"text"}
                        value={values.document_number}
                        placeholder={"Enter Account Number"}
                        onChange={(e) =>
                          setFieldValue("document_number", e.target.value)
                        }
                      />
                      {touched.document_number && errors.document_number && (
                        <div className="absolute left-0 mt-2 text-sm text-red-500">
                          {errors.document_number}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-5">
                      <Input
                        id={"amount"}
                        name={"amount"}
                        label={"Amount"}
                        type={"number"}
                        value={values.amount}
                        placeholder={"Enter Amount"}
                        onChange={(e) =>
                          setFieldValue("amount", e.target.value)
                        }
                      />
                      {touched.amount && errors.amount && (
                        <div className="absolute left-0 mt-2 text-sm text-red-500">
                          {errors.amount}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-5">
                      <CustomDate
                        futureDate={false}
                        label={"Transaction Date"}
                        isTimePicker={true}
                        value={values.payment_date}
                        onChange={(e) =>
                          setFieldValue("payment_date", e.target.value)
                        }
                      />
                      {touched.payment_date && errors.payment_date && (
                        <div className="absolute left-0 mt-2 text-sm text-red-500">
                          {errors.payment_date}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="relative mb-5">
                    <TextArea
                      id={"comment"}
                      name={"comment"}
                      label={"Comment"}
                      value={values.comment}
                      placeholder={"Enter Comment"}
                      onChange={(e) => setFieldValue("comment", e.target.value)}
                    />
                    {touched.comment && errors.comment && (
                      <div className="absolute left-0 mt-2 text-sm text-red-500">
                        {errors.comment}
                      </div>
                    )}
                  </div>
                </CardLayoutBody>
                <CardLayoutFooter className={"gap-1"}>
                  <div>
                    <SecondaryButton
                      text={"Cancel"}
                      onClick={() => {
                        navigate(-1);
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      text={
                        isCreatingTransaction ? (
                          <Spinner />
                        ) : (
                          "Create Transaction"
                        )
                      }
                      type="submit"
                      disabled={isCreatingTransaction}
                    />
                  </div>
                </CardLayoutFooter>
              </Form>
            )}
          </Formik>
        </CardLayoutContainer>
      </div>
    </>
  );
};

export default CreateTransaction;
