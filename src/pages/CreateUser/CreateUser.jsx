import React, { useEffect, useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Input, Button, Spinner } from "../../components/components";
import toast, { Toaster } from "react-hot-toast";
import { FaCaretDown } from "react-icons/fa";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state.role);
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
    dispatch(getRoles({ page: 0, limit: 10, token: userData?.token }));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData((prev) => ({
      ...prev,
      role_id: role.id,
    }));
    setDropdownOpen(false);
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
              <div className="relative">
                <div
                  className="relative flex items-center justify-between w-full p-3 bg-white border border-gray-300 rounded-md cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <span>
                    {selectedRole ? selectedRole.name : "Select a Role"}
                  </span>
                  <FaCaretDown className="text-gray-500" />
                </div>
                {dropdownOpen && (
                  <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md max-h-40">
                    {roles.roles.length > 0 ? (
                      roles.roles.map((role) => (
                        <li
                          key={role.id}
                          className="p-3 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleRoleSelect(role)}>
                          {role.name}
                        </li>
                      ))
                    ) : (
                      <li className="p-3 text-gray-500">No roles found</li>
                    )}
                  </ul>
                )}
                {errors.role_id && (
                  <p className="mt-1 text-sm text-red-500">{errors.role_id}</p>
                )}
              </div>
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
