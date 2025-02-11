import React, { useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Input, Button, Switch, Spinner, TextArea } from "../../components/components";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createTicket } from "../../utils/api_handler";
import { ticketSchema } from "../../validations";

const CreateTicket = () => {
  const navigate = useNavigate();
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
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: ""
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
        </CardLayoutHeader>
        <form onSubmit={handleFormSubmit} noValidate>
          <CardLayoutBody>
            <div>
              <div className="flex flex-col gap-5 md:gap-9 mb-7">
                <div
                  className={`relative ${formik.touched.title && formik.errors.title ? "mb-5" : ""
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
                    className={'w-full'}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                      {formik.errors.title}
                    </div>
                  )}
                </div>
                <div
                  className={`relative ${formik.touched.description && formik.errors.description
                      ? "mb-5"
                      : ""
                    }`}
                >
                  <TextArea
                    placeholder={"Enter Ticket Description"}
                    id={"description"}
                    name={"description"}
                    label={"Ticket Description*"}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={'w-full'}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
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
