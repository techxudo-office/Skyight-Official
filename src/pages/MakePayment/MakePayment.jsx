import React, { useState } from "react";

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
} from "../../components/components";

import { createTransaction } from "../../utils/api_handler";

import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  bank_name: Yup.string().required("Please enter bank name"),
  bank_number: Yup.string().required("Please enter bank number"),
  account_holder_name: Yup.string().required(
    "Please enter account holder name"
  ),
  document_number: Yup.string().required("Please enter document number"),
  payment_date: Yup.string().required("Please enter payment date"),
  amount: Yup.string().required("Please enter amount"),
  comment: Yup.string().required("Please enter comment"),
});

const MakePayment = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    bank_name: "",
    bank_number: "",
    account_holder_name: "",
    document_number: "",
    payment_date: "",
    amount: "",
    comment: "",
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const makePaymentHandler = async (payload) => {
    setLoading(true);
    const response = await createTransaction(payload);
    setLoading(false);
    console.log(response);

    if (response.status) {
      // if (response.data.PricedItineraries.PricedItinerary.length > 0) {
      //   navigate("/dashboard/flight-results", {
      //     state: { flightsData: response.data },
      //   });
      // }
    } else {
      response.message.map((error) => {
        return toast.error(error.toUpperCase());
      });
    }
  };

  const handleSubmit = (values) => {
    console.log("Form Values: ", values);
    makePaymentHandler(values);
  };

  return (
    <>
      <Toaster />
      <CardLayoutContainer>
        <CardLayoutHeader
          heading="Make Payment"
          className={"flex items-center justify-between"}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <CardLayoutBody>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
                  <div className="relative mb-5">
                    <Input
                      id={"bank_name"}
                      name={"bank_name"}
                      label={"Bank Name"}
                      type={"text"}
                      value={values.bank_name}
                      placeholder={"Enter Bank Name"}
                      onChange={(e) =>
                        setFieldValue("bank_name", e.target.value)
                      }
                    />
                    {touched.bank_name && errors.bank_name && (
                      <div className="text-red-500 text-sm mt-2 absolute left-0">
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
                      <div className="text-red-500 text-sm mt-2 absolute left-0">
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
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.account_holder_name}
                        </div>
                      )}
                  </div>
                  <div className="relative mb-5">
                    <Input
                      id={"document_number"}
                      name={"document_number"}
                      label={"Document Number"}
                      type={"text"}
                      value={values.document_number}
                      placeholder={"Enter Document Number"}
                      onChange={(e) =>
                        setFieldValue("document_number", e.target.value)
                      }
                    />
                    {touched.document_number && errors.document_number && (
                      <div className="text-red-500 text-sm mt-2 absolute left-0">
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
                      onChange={(e) => setFieldValue("amount", e.target.value)}
                    />
                    {touched.amount && errors.amount && (
                      <div className="text-red-500 text-sm mt-2 absolute left-0">
                        {errors.amount}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-5">
                    <Input
                      id={"comment"}
                      name={"comment"}
                      label={"Comment"}
                      type={"text"}
                      value={values.comment}
                      placeholder={"Enter Comment"}
                      onChange={(e) => setFieldValue("comment", e.target.value)}
                    />
                    {touched.comment && errors.comment && (
                      <div className="text-red-500 text-sm mt-2 absolute left-0">
                        {errors.comment}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-5">
                    <Input
                      id={"payment_date"}
                      name={"payment_date"}
                      label={"Payment Date"}
                      type={"datetime-local"}
                      value={values.payment_date}
                      placeholder={"Select Payment Date"}
                      onChange={(e) =>
                        setFieldValue("payment_date", e.target.value)
                      }
                    />
                    {touched.payment_date && errors.payment_date && (
                      <div className="text-red-500 text-sm mt-2 absolute left-0">
                        {errors.payment_date}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-4 mt-2">
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Uploaded Preview"
                      className="h-20 object-cover rounded-3xl border-2 border-gray-300"
                    />
                  )}
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-blue-100 hover:bg-secondary text-primary hover:text-white py-2 font-semibold px-4 rounded-full transition duration-300"
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
                    text={loading ? <Spinner /> : "Make Payment"}
                    type="submit"
                    disabled={loading}
                  />
                </div>
              </CardLayoutFooter>
            </Form>
          )}
        </Formik>
      </CardLayoutContainer>
    </>
  );
};

export default MakePayment;
