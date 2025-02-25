import React, { useEffect, useState } from "react";
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
  Select,
} from "../../components/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createUser, getRoles } from "../../utils/api_handler";
import { userSchema } from "../../validations/index";

const CreateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  
  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await getRoles();
        if (response.status) {
          const roleOptions = response.data.roles.map((role) => ({
            value: role.id, // value should be role.id (not role.name)
            label: role.name,
          }));
          setRoles(roleOptions);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Failed to fetch roles.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRoles();
  }, []);
  
  const createUserHandler = async (payload, resetForm) => {
    try {
      setLoading(true);
      const response = await createUser(payload);
      if (response?.status) {
        toast.success(response.message);
        resetForm();
        setTimeout(() => navigate("/dashboard/users"), 1000);
      } else {
        Array.isArray(response.message)
          ? response.message.forEach((error) => toast.error(error))
          : toast.error(response.message);
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
      role_id: "", // Ensure role_id stores the role ID
    },
    userSchema,
    onSubmit: (values, { resetForm }) => {
      createUserHandler(values, resetForm);
    },
  });
  
  return (
    <>
      <Toaster />
      <CardLayoutContainer>
        <CardLayoutHeader
          heading="Create User"
          className="flex items-center justify-between"
        />
        <form onSubmit={formik.handleSubmit} noValidate>
          <CardLayoutBody>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-5 mb-7">
              {/* Input Fields */}
              {[
                { name: "first_name", label: "First Name*", type: "text", placeholder: "Enter First Name" },
                { name: "last_name", label: "Last Name*", type: "text", placeholder: "Enter Last Name" },
                { name: "email", label: "Email*", type: "email", placeholder: "Enter Email" },
                { name: "mobile_number", label: "Mobile Number*", type: "text", placeholder: "Enter Mobile Number" },
                { name: "password", label: "Password*", type: "password", placeholder: "Enter Password" },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name} className="relative">
                  <Input
                    id={name}
                    name={name}
                    label={label}
                    type={type}
                    placeholder={placeholder}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched[name] && formik.errors[name] && (
                    <div className="absolute left-0 mt-2 text-sm text-red-500">
                      {formik.errors[name]}
                    </div>
                  )}
                </div>
              ))}
  
              {/* Role Dropdown */}
              <div className="relative">
                <Select
                  name="role"
                  label="Role"
                  options={roles}
                  value={roles.find((role) => role.value === formik.values.role_id) || null}
                  onChange={(option) => {
                    console.log("Selected Role:", option);
                    setSelectedRole(option.value); // Store only role ID
                    formik.setFieldValue("role_id", option.value); // Ensure Formik gets the role ID
                  }}
                  isLoading={loading}
                />
                {formik.touched.role_id && formik.errors.role_id && (
                  <div className="absolute left-0 mt-2 text-sm text-red-500">
                    {formik.errors.role_id}
                  </div>
                )}
              </div>
            </div>
          </CardLayoutBody>
  
          <CardLayoutFooter>
            <Button
              text={loading ? <Spinner /> : "Create User"}
              disabled={loading}
              type="submit"
            />
          </CardLayoutFooter>
        </form>
      </CardLayoutContainer>
    </>
  );  
};

export default CreateUser;
