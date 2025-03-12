import React, { useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Input, Button, Spinner, TextArea } from "../../components/components";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../../_core/features/ticketSlice";

const CreateTicket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isCreatingTicket } = useSelector((state) => state.ticket);
  const { userData } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Ticket title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Ticket description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(createTicket({ data: formData, token: userData?.token })).then(
      () => {
        setFormData({
          title: "",
          description: "",
        });
        navigate("/dashboard/view-tickets");
      }
    );
  };

  return (
    <>
      <Toaster />
      <CardLayoutContainer>
        <CardLayoutHeader
          heading="Create Ticket"
          className="flex items-center justify-between"
        />
        <form onSubmit={handleSubmit} noValidate>
          <CardLayoutBody>
            <div className="flex flex-col gap-5 md:gap-9 mb-7">
              <div className="relative">
                <Input
                  placeholder="Enter Ticket Title"
                  id="title"
                  name="title"
                  label="Ticket Title*"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full"
                />
                {errors.title && (
                  <div className="absolute left-0 mt-2 text-sm text-red-500">
                    {errors.title}
                  </div>
                )}
              </div>

              <div className="relative">
                <TextArea
                  placeholder="Enter Ticket Description"
                  id="description"
                  name="description"
                  label="Ticket Description*"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full"
                />
                {errors.description && (
                  <div className="absolute left-0 mt-2 text-sm text-red-500">
                    {errors.description}
                  </div>
                )}
              </div>
            </div>
          </CardLayoutBody>

          <CardLayoutFooter>
            <Button
              text={isCreatingTicket ? <Spinner /> : "Create Ticket"}
              disabled={isCreatingTicket}
              type="submit"
            />
          </CardLayoutFooter>
        </form>
      </CardLayoutContainer>
    </>
  );
};

export default CreateTicket;
