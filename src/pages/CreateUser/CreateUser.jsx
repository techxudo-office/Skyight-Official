import React, { useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Input, Button, Switch, Spinner, Select } from "../../components/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createUser } from "../../utils/api_handler";
import { userSchema } from "../../validations/index"

const CreateUser = () => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(null);
  const roleData=[
    {value:'super_admin',label:'Super Admin'},
    {value:'admin',label:'Admin'},
    {value:'manager',label:'Manager'},
  ]

  const createUserHandler = async (payload, resetForm) => {
    console.log(payload)
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


  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      password: "",
      role_id: 0,
    },
    userSchema, // Assuming userSchema is your validation schema
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
        </CardLayoutHeader>
        <form onSubmit={handleFormSubmit} noValidate>
          <CardLayoutBody>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
                <div
                  className={`relative ${formik.touched.first_name && formik.errors.first_name
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
                  className={`relative ${formik.touched.last_name && formik.errors.last_name
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
                  className={`relative ${formik.touched.email && formik.errors.email ? "mb-5" : ""
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
                  className={`relative ${formik.touched.mobile_number && formik.errors.mobile_number
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
                  className={`relative ${formik.touched.password && formik.errors.password
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
                  className={`relative ${formik.touched.role && formik.errors.role ? "mb-5" : ""
                    }`}
                >
                  {/* <Input
                    placeholder={"Enter Role of User"}
                    id={"role_id"}
                    name={"role_id"}
                    label={"Role*"}
                    type={"number"}
                    value={formik.values.role_id || ""} 
                    onChange={(e) => {
                      const value = e.target.value;
                      formik.setFieldValue("role_id", value === "" ? "" : Number(value)); // Allow empty string
                    }}
                    onBlur={formik.handleBlur}
                  /> */}
                  <Select
                  name={'role'}
                  label={'Role'}
                  options={roleData}
                  value={role}
                  onChange={(option)=>setRole(option.value)}
                  />
                  {formik.touched.role_id && formik.errors.role_id && (
                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                      {formik.errors.role_id}
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
