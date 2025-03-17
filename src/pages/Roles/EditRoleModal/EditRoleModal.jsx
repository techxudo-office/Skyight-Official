import React, { useState, useEffect } from "react";
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
import './EditRoleModal.css'

Modal.setAppElement("#root");

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4"
      />
      <span>{label}</span>
    </label>
  );
};

const EditRoleModal = ({ isOpen, onClose, roleData }) => {
  const dispatch = useDispatch();

  const [rolesData, setRolesData] = useState(roleData || {});
  const { userData } = useSelector((state) => state.auth);
  const { isLoadingUpdateRole } = useSelector((state) => state.role);

  useEffect(() => {
    console.log(roleData);
    if (roleData) setRolesData(roleData);
  }, [roleData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRolesData({ ...rolesData, [name]: value });
  };

  const handleCheckboxChange = (category, key) => {
    setRolesData((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [key]: !prevState[category][key],
      },
    }));
  };

  const handleSubmit = () => {
    if (!rolesData.role.trim() || !rolesData.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const payload = {
      name: rolesData?.role,
      description: rolesData?.description,
      page_permission: {
        dashboard: true,
        flights: true,
        bookings: true,
        credits: true,
        transactions: true,
        history: true,
        administrators: true,
        tickets: true,
        help_and_support: true,
      },
      action_permission: rolesData?.action_permission,
    };

    dispatch(
      editRole({ data: payload, token: userData?.token, id: rolesData?.id })
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Role"
      className="modal-content w-[600px] bg-white rounded-xl shadow-lg p-6"
      overlayClassName="modal-overlay fixed inset-0 flex justify-center items-center"
      closeTimeoutMS={300}
    >
      <CardLayoutContainer>
        <CardLayoutHeader heading="Edit Role" />
        <CardLayoutBody>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Enter Role Name"
              label="Role Name"
              name="name"
              value={rolesData.role || ""}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Enter Role Description"
              label="Role Description"
              name="description"
              value={rolesData.description || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-6">
            <h3 className="mb-2 font-semibold">Page Permissions</h3>
            <div className="grid grid-cols-2 gap-3">
              {rolesData?.page_permission &&
                Object.keys(rolesData.page_permission).map((key) => (
                  <Checkbox
                    key={key}
                    label={key.replace(/_/g, " ")}
                    checked={rolesData.page_permission[key]}
                    onChange={() =>
                      handleCheckboxChange("page_permission", key)
                    }
                  />
                ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 font-semibold">Action Permissions</h3>
            <div className="grid grid-cols-2 gap-3">
              {rolesData?.action_permission &&
                Object.keys(rolesData.action_permission).map((key) => (
                  <Checkbox
                    key={key}
                    label={key.replace(/_/g, " ")}
                    checked={rolesData.action_permission[key]}
                    onChange={() =>
                      handleCheckboxChange("action_permission", key)
                    }
                  />
                ))}
            </div>
          </div>
        </CardLayoutBody>

        <CardLayoutFooter className="flex justify-end gap-4 mt-4">
          <Button
            text={isLoadingUpdateRole ? <Spinner /> : "Update Role"}
            onClick={handleSubmit}
            disabled={isLoadingUpdateRole}
          />
          <Button text="Cancel" onClick={onClose} />
        </CardLayoutFooter>
      </CardLayoutContainer>
    </Modal>
  );
};

export default EditRoleModal;
