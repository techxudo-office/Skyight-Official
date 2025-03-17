import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../../components/CardLayout/CardLayout";
import { Input, Button, Spinner } from "../../../components/components";
import { useDispatch, useSelector } from "react-redux";
import { editRole } from "../../../_core/features/roleSlice";
import { getRoles } from "../../../_core/features/roleSlice";
import { FaCaretDown } from "react-icons/fa";
import toast from "react-hot-toast";
import { editUser } from "../../../_core/features/userSlice";
// import "./EditRoleModal.css";

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
    name: "mobile_number",
    label: "Mobile Number*",
    type: "text",
    placeholder: "Enter Mobile Number",
  },
];

const initialState = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  role_id: "",
};

const EditUserModal = ({ isOpen, onClose, usersData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state.role);
  const { isEditingUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (usersData) {
      console.log(usersData, "usersData");
      setFormData({
        first_name: usersData.first_name || "",
        last_name: usersData.last_name || "",
        mobile_number: usersData.mobile_number || "",
        role_id: usersData.role_id || "",
      });

      const role = roles?.find((r) => r.id === usersData.id);
      setSelectedRole(role || null);
    }
  }, [usersData, roles]);

  useEffect(() => {
    dispatch(getRoles({token: userData?.token }));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData((prev) => ({ ...prev, role_id: role.id }));
    setDropdownOpen(false);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      mobile_number: formData.mobile_number,
      role_id: Number(formData.role_id),
    };

    dispatch(
      editUser({ data: payload, token: userData?.token, id: usersData?.id })
    ).then(() => {
      onClose();
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit User"
      className="modal-content w-[600px] bg-white rounded-xl shadow-lg p-6"
      overlayClassName="modal-overlay fixed inset-0 flex justify-center items-center"
      closeTimeoutMS={300}
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
            <div className="relative">
              <div
                className="relative flex items-center justify-between w-full p-3 bg-white border border-gray-300 rounded-md cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>
                  {selectedRole ? selectedRole.role : "Select a Role"}
                </span>
                <FaCaretDown className="text-gray-500" />
              </div>
              {dropdownOpen && (
                <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md min-h-12 max-h-40">
                  {roles?.map((role) => (
                    <li
                      key={role.id}
                      className="p-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleRoleSelect(role)}
                    >
                      {role.role}
                    </li>
                  ))}
                </ul>
              )}
              {errors.role_id && (
                <p className="mt-1 text-sm text-red-500">{errors.role_id}</p>
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
    </Modal>
  );
};

export default EditUserModal;
