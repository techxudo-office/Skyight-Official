import React, { useEffect, useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Input, Button, Spinner, Select } from "../../components/components";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../_core/features/userSlice";
import { getRoles } from "../../_core/features/roleSlice";
import { useNavigate } from "react-router-dom";

const inputFields = [
  {
    name: "first_name",
    label: "First Name*",
    type: "text",
    placeholder: "Enter First Name",
  },
  {
    name: "last_name",
    label: "Last Name*",
    type: "text",
    placeholder: "Enter Last Name",
  },
  { name: "email", label: "Email*", type: "email", placeholder: "Enter Email" },
  {
    name: "mobile_number",
    label: "Mobile Number*",
    type: "text",
    placeholder: "Enter Mobile Number",
  },
  {
    name: "password",
    label: "Password*",
    type: "password",
    placeholder: "Enter Password",
  },
];

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  mobile_number: "",
  password: "",
  role_id: "",
};

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [selectedRole, setSelectedRole] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const { roles, isLoadingRoles } = useSelector((state) => state.role);
  const { isCreatingUser } = useSelector((state) => state.user);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Mobile number must be 10 digits";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.role_id) newErrors.role_id = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!userData?.token) return;
    dispatch(getRoles(userData?.token));
  }, [dispatch]);

  useEffect(() => {
    console.log(roles, "roles");
  }, [roles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role) => {
    let data = {
      id: role.value,
      role: role.label,
    };
    setSelectedRole(data);
    setFormData((prev) => ({
      ...prev,
      role_id: Number(role.id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    dispatch(createUser({ token: userData.token, data: formData }))
      .unwrap()
      .then(() => {
        setFormData(initialState);
        navigate(-1);
      });
  };

  return (
    <>
      <Toaster />
      <CardLayoutContainer>
        <CardLayoutHeader heading="Create User" />
        <form onSubmit={handleSubmit} noValidate>
          <CardLayoutBody>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-5 mb-7">
              {inputFields.map(({ name, label, type }) => (
                <div key={name} className="relative">
                  <Input
                    id={name}
                    name={name}
                    label={label}
                    type={type}
                    placeholder={`Enter ${label}`}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                  {errors[name] && (
                    <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
                  )}
                </div>
              ))}
              <Select
                id="roles"
                label="Role"
                value={selectedRole ? selectedRole.role : ""}
                onChange={handleRoleSelect}
                options={roles.map((role) => ({
                  value: role.id,
                  label: role.role,
                }))}
                placeholder="Select a Role"
                isLoading={isLoadingRoles}
              />
            </div>
          </CardLayoutBody>

          <CardLayoutFooter>
            <Button
              text={isCreatingUser ? <Spinner /> : "Create User"}
              disabled={isCreatingUser}
              type="submit"
            />
          </CardLayoutFooter>
        </form>
      </CardLayoutContainer>
    </>
  );
};

export default CreateUser;
