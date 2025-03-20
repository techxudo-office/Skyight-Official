import React, { useRef, useState, useEffect } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
} from "../../components/CardLayout/CardLayout";
import { Button, Input } from "../../components/components";
import { MdEdit } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateAccount } from "../../_core/features/authSlice";
import { uploadUserImage } from "../../_core/features/userSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.role);
  const { userData, isUpdatingAccount } = useSelector((state) => state.auth);
  const [editingField, setEditingField] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    country: "",
    role_id: "",
    role_name: "",
    mobile_number: "",
  });

  useEffect(() => {
    if (userData) {
      console.log(userData);
      setProfileData({
        first_name: userData.user.first_name || "",
        last_name: userData.user.last_name || "",
        email: userData.user.email || "",
        mobile_number: userData.user.mobile_number || "",
        city: userData.user.company.city || "",
        country: userData.user.company.country || "",
        role_id: userData.user.role_id || "",
        role_name: userData?.user?.role?.name || "Select a Role",
      });
    }
  }, [userData, roles]);

  useEffect(() => {
    dispatch(getUserInfo(userData?.token));
  }, []);

  const handleChange = (e, field) => {
    setProfileData({ ...profileData, [field]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    console.log(role);
    setProfileData((prev) => ({
      ...prev,
      role_id: Number(role.id),
      role_name: role.role,
    }));
    setDropdownOpen(false);
  };

  const handleSave = () => {
    const payload = {
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      mobile_number: profileData.mobile_number,
      role_id: profileData.role_id,
    };
    dispatch(
      updateAccount({
        data: payload,
        token: userData.token,
        id: userData.user.id,
      })
    );
    setEditingField(null);
  };

  const [profileImage, setProfileImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjUuYcnZ-xqlGZiDZvuUy_iLx3Nj6LSaZSzQ&s"
  );

  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // dispatch(uploadUserImage({ img: imageUrl, token: userData?.token }));
      setProfileImage(imageUrl);
    }
  };

  const profileFields = [
    { label: "First Name", field: "first_name", type: "text", edit: true },
    { label: "Last Name", field: "last_name", type: "text", edit: true },
    { label: "Email Address", field: "email", type: "email", edit: false },
    { label: "Phone Number", field: "mobile_number", type: "tel", edit: true },
  ];

  const addressFields = [
    { label: "City", field: "city", type: "text", edit: false },
    { label: "Country", field: "country", type: "text", edit: false },
  ];

  const renderEditableField = (label, field, type = "text", edit) => (
    <div className="flex flex-col w-full">
      <h4 className="mb-1 text-xs font-medium text-slate-500">{label}</h4>
      <div className="flex items-center gap-x-2">
        <Input
          edit={edit}
          type={type}
          profile={true}
          value={profileData[field]}
          disabled={editingField !== field}
          setEditingField={setEditingField}
          isSelected={editingField === field}
          onEditClick={() => setEditingField(field)}
          onChange={(e) => handleChange(e, field)}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <CardLayoutContainer className="w-full mb-5">
        <CardLayoutHeader
          className="flex flex-wrap items-center justify-start gap-5 py-3"
          removeBorder={true}
        >
          <div className="relative w-16 h-16 overflow-hidden rounded-full cursor-pointer group">
            <img
              src={profileImage}
              alt="profile-img"
              className="object-cover w-full h-full rounded-full"
            />
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
              onClick={() => fileInputRef.current.click()}
            >
              <MdEdit className="text-xl text-white" />
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text">{`${profileData.first_name} ${profileData.last_name}`}</h3>
            <h4 className="mb-0 text-sm text-text">{`${profileData.city}, ${profileData.country}`}</h4>
          </div>
        </CardLayoutHeader>
      </CardLayoutContainer>
      <CardLayoutContainer className="w-full mb-5">
        <CardLayoutHeader
          className="flex items-center justify-between gap-5 py-3"
          removeBorder={true}
        >
          <h2 className="text-2xl font-semibold text-text">
            Personal Information
          </h2>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-5 mb-7">
            {profileFields.map(({ label, field, type, edit }, index) => (
              <div key={index}>
                {renderEditableField(label, field, type, edit)}
              </div>
            ))}
            <div className="relative self-end">
              <div
                className="relative flex items-center justify-between w-full p-3 bg-white border border-gray-300 rounded-md cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{profileData.role_name}</span>
                <FaCaretDown className="text-gray-500" />
              </div>
              {dropdownOpen && (
                <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md max-h-40">
                  {roles?.length > 0 ? (
                    roles.map((role) => (
                      <li
                        key={role.id}
                        className="p-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleRoleSelect(role)}
                      >
                        {role.role}
                      </li>
                    ))
                  ) : (
                    <li className="p-3 text-gray-500">No roles found</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </CardLayoutBody>
        <CardLayoutHeader
          className="flex items-center justify-between gap-5 py-3"
          removeBorder={true}
        >
          <h2 className="text-2xl font-semibold text-text">Address</h2>
        </CardLayoutHeader>
        <CardLayoutBody>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-5 mb-7">
            {addressFields.map(({ label, field, type, edit }, index) => (
              <div key={index}>
                {renderEditableField(label, field, type, edit)}
              </div>
            ))}
          </div>
          <Button
            text="Save Changes"
            onClick={handleSave}
            loading={isUpdatingAccount}
            disabled={isUpdatingAccount}
          />
        </CardLayoutBody>
      </CardLayoutContainer>
    </div>
  );
};

export default Settings;
