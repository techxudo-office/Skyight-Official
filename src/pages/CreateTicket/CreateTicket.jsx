import React, { useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import {
  Input,
  Button,
  Switch,
  Spinner,
  Textarea,
} from "../../components/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createTicket } from "../../utils/api_handler";
import { ticketSchema } from "../../schema/validationSchema";
const CreateTicket = () => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const createTicketHandler = async (payload, resetForm) => {
    try {
      setLoading(true);

      const response = await createTicket(payload);
      if (response) {
        if (response.status) {
          toast.success(response.message);
          resetForm();
          setTimeout(() => {
            navigate("/dashboard/view-tickets");
          }, 1000);
        } else {
          if (Array.isArray(response.message)) {
            response.message.map((error) => {
              return toast.error(error);
            });
          } else {
            toast.error(response.message);
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      // status: isActive ? "open" : "close",
    },
    ticketSchema,
    onSubmit: (values, { resetForm }) => {
      createTicketHandler(values, resetForm);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      formik.handleSubmit();
    }
  };

  return (
    <>
      <Toaster />
      <CardLayoutContainer>
        <CardLayoutHeader
          heading="Create Ticket"
          className={"flex items-center justify-between"}
        >
          <span
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            {/* <Switch switchStatus={isActive} /> */}
          </span>
        </CardLayoutHeader>
        <form onSubmit={handleFormSubmit} noValidate>
          <CardLayoutBody>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
                <div
                  className={`relative ${
                    formik.touched.title && formik.errors.title ? "mb-5" : ""
                  }`}
                >
                  <Input
                    placeholder={"Enter Ticket Title"}
                    id={"title"}
                    name={"title"}
                    label={"Ticket Title*"}
                    type={"text"}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                      {formik.errors.title}
                    </div>
                  )}
                </div>
                <div
                  className={`relative ${
                    formik.touched.description && formik.errors.description
                      ? "mb-5"
                      : ""
                  }`}
                >
                  {/* <Input
                    placeholder={"Enter Ticket Description"}
                    id={"description"}
                    name={"description"}
                    label={"Ticket Description*"}
                    type={"text"}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                      {formik.errors.description}
                    </div>
                  )} */}
                </div>
              </div>
            </div>
            <Textarea
              id={"description"}
              name={"description"}
              label={"Ticket Description*"}
              placeholder={"Enter Ticket Description"}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-2 absolute left-0">
                {formik.errors.description}
              </div>
            )}
          </CardLayoutBody>
          <CardLayoutFooter>
            <div>
              <Button
                text={loading ? <Spinner /> : "Create Ticket"}
                disabled={loading}
                onClick={formik.handleSubmit}
                type="submit"
              />
            </div>
          </CardLayoutFooter>
        </form>
      </CardLayoutContainer>
    </>
  );
};

export default CreateTicket;
