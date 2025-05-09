import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../../components/CardLayout/CardLayout";
import {
  Input,
  Button,
  Spinner,
  ModalWrapper,
  Select,
  PhoneNumberInput,
} from "../../../components/components";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../../_core/features/roleSlice";
import toast from "react-hot-toast";
import { editUser } from "../../../_core/features/userSlice";
import { updateUserValidation } from "../../../utils/validations";

Modal.setAppElement("#root");

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
  {
    name: "email",
    label: "Email*",
    type: "text",
    placeholder: "Enter Email",
  },
  {
    name: "password",
    label: "Password*",
    type: "password",
    placeholder: "Enter New Password",
  }
];

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  mobile_number: "",
  role_id: "",
};

const EditUserModal = ({ isOpen, onClose, usersData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const { roles, isLoadingRoles } = useSelector((state) => state.role);
  const { isEditingUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (usersData) {
      setFormData({
        first_name: usersData.first_name || "",
        last_name: usersData.last_name || "",
        email: usersData.email || "",
        mobile_number: usersData.mobile_number || "",
        role_id: usersData.role.id || "",
      });

      const role = roles?.find((r) => r.id === usersData.role.id);
      setSelectedRole(role || null);
    }
  }, [usersData, roles]);

  useEffect(() => {
    if (!userData?.token) return;
    dispatch(getRoles({ token: userData?.token }));
  }, [dispatch, userData?.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    let data = {
      id: role.value,
      role: role.label,
    };
    setSelectedRole(data);
    setFormData((prev) => ({ ...prev, role_id: role.id }));
  };


  const handleSubmit = () => {
    if (!updateUserValidation(formData, setErrors)) {

      toast.error("Please fix the errors before submitting.");
      return;
    }

    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      mobile_number: formData.mobile_number,
      password: formData.password,
      role_id: Number(formData.role_id),
    };

    dispatch(
      editUser({ data: payload, token: userData?.token, id: usersData?.id })
    ).then(() => {
      onClose();
    });
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Role"
    >
      <CardLayoutContainer>
        <CardLayoutHeader heading="Edit User" />
        <CardLayoutBody>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {inputFields.map(({ name, label, type }) => (
              <div key={name} className="relative">
                <Input
                  name={name}
                  label={label}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
                />
                {errors[name] && (
                  <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
                )}
              </div>
            ))}
            <div key={name} className="relative">
              <PhoneNumberInput
                id={"mobile_number"}
                name={"mobile_number"}
                type={"text"}
                label={"Mobile Number*"}
                value={formData.mobile_number}
                onChange={(number) => {
                  setFormData(prev => ({
                    ...prev,
                    mobile_number: number.country_code + number.area_code + number.number
                  }))
                }}
                placeholder="Enter Mobile Number"
              />
            </div>
            <div>
              <Select
                id="roles"
                label="Role"
                height="h-12"
                value={selectedRole ? selectedRole.role : ""}
                onChange={handleRoleSelect}
                options={roles.map((role) => ({
                  value: role.id,
                  label: role.role,
                }))}
                placeholder="Select a Role"
                isLoading={isLoadingRoles}
              />
              {errors["role_id"] && (
                <p className="mt-1 text-sm text-red-500">{errors["role_id"]}</p>
              )}
            </div>
          </div>
        </CardLayoutBody>
        <CardLayoutFooter>
          <div className="space-x-2">
            <Button
              text={isEditingUser ? <Spinner /> : "Update User"}
              onClick={handleSubmit}
              disabled={isEditingUser}
            />
            <Button text="Cancel" onClick={onClose} />
          </div>
        </CardLayoutFooter>
      </CardLayoutContainer>
    </ModalWrapper>
  );
};

export default EditUserModal;
