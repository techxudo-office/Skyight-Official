import React, { useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Input, Button, Switch, Spinner } from "../../components/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createUser } from "../../utils/api_handler";

const CreateUser = () => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const createUserHandler = async (payload, resetForm) => {
    try {
      setLoading(true);

      const response = await createUser(payload);
      if (response) {
        if (response.status) {
          toast.success(response.message);
          resetForm();
          setTimeout(() => {
            navigate("/dashboard/users");
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

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Please enter first name"),
    last_name: Yup.string().required("Please enter last name"),
    email: Yup.string().required("Please enter email address"),
    mobile_number: Yup.string().required("Please enter mobile number"),
    password: Yup.string().required("Please set a password"),
    role: Yup.string().required("Please enter role"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      password: "",
      role: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      createUserHandler(values, resetForm);
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
          heading="Create User"
          className={"flex items-center justify-between"}
        >
          <span
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <Switch switchStatus={isActive} />
          </span>
        </CardLayoutHeader>
        <form onSubmit={handleFormSubmit} noValidate>
          <CardLayoutBody>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
                <div
                  className={`relative ${
                    formik.touched.first_name && formik.errors.first_name
                      ? "mb-5"
                      : ""
                  }`}
                >
                  <Input
                    placeholder={"Enter First Name"}
                    id={"first_name"}
                    name={"first_name"}
                    label={"First Name*"}
                    type={"text"}
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                      {formik.errors.first_name}
                    </div>
                  )}
                </div>
                <div
                  className={`relative ${
                    formik.touched.last_name && formik.errors.last_name
                      ? "mb-5"
                      : ""
                  }`}
                >
                  <Input
                    placeholder={"Enter Last Name"}
                    id={"last_name"}
                    name={"last_name"}
                    label={"Last Name*"}
                    type={"text"}
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                      {formik.errors.last_name}
                    </div>
                  )}
                </div>
                <div
                  className={`relative ${
                    formik.touched.email && formik.errors.email ? "mb-5" : ""
                  }`}
                >
                  <Input
                    placeholder={"Enter Email"}
                    id={"email"}
                    name={"email"}
                    label={"Email*"}
                    type={"email"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div
                  className={`relative ${
                    formik.touched.mobile_number && formik.errors.mobile_number
                      ? "mb-5"
                      : ""
                  }`}
                >
                  <Input
                    placeholder={"Enter Mobile Number"}
                    id={"mobile_number"}
                    name={"mobile_number"}
                    label={"Mobile Number*"}
                    type={"mobile_number"}
                    value={formik.values.mobile_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.mobile_number &&
                    formik.errors.mobile_number && (
                      <div className="text-red-500 text-sm mt-2 absolute left-0">
                        {formik.errors.mobile_number}
                      </div>
                    )}
                </div>
                <div
                  className={`relative ${
                    formik.touched.password && formik.errors.password
                      ? "mb-5"
                      : ""
                  }`}
                >
                  <Input
                    placeholder={"Enter Password"}
                    id={"password"}
                    name={"password"}
                    label={"Password*"}
                    type={"password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div
                  className={`relative ${
                    formik.touched.role && formik.errors.role ? "mb-5" : ""
                  }`}
                >
                  <Input
                    placeholder={"Enter Role"}
                    id={"role"}
                    name={"role"}
                    label={"Role*"}
                    type={"role"}
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.role && formik.errors.role && (
                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                      {formik.errors.role}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardLayoutBody>
          <CardLayoutFooter>
            <div>
              <Button
                text={loading ? <Spinner /> : "Create User"}
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

export default CreateUser;
