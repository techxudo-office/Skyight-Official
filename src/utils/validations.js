export const updateAccountValidation = (form, setErrors) => {
  const newErrors = {};

  // First Name
  if (!form.first_name?.trim()) {
    newErrors.first_name = "First name is required";
  }

  // Last Name
  if (!form.last_name?.trim()) {
    newErrors.last_name = "Last name is required";
  }

  // Mobile Number
  if (!form.mobile_number?.trim()) {
    newErrors.mobile_number = "Mobile number is required";
  }

  // Role ID
  if (!form.role_id || isNaN(form.role_id)) {
    newErrors.role_id = "Role is required";
  }

  // Password
  if (!form.password?.trim()) {
    newErrors.password = "Password is required";
  } else if (form.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(form.password)) {
    newErrors.password = "Must include at least one uppercase letter";
  } else if (!/[a-z]/.test(form.password)) {
    newErrors.password = "Must include at least one lowercase letter";
  } else if (!/\d/.test(form.password)) {
    newErrors.password = "Must include at least one number";
  } else if (!/[!@#$%^&*]/.test(form.password)) {
    newErrors.password =
      "Must include at least one special character (!@#$%^&*)";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
export const updateUserValidation = (form, setErrors) => {
  const newErrors = {};

  if (!form.first_name.trim()) newErrors.first_name = "First name is required";

  if (!form.last_name.trim()) newErrors.last_name = "Last name is required";

  if (!form.mobile_number.trim()) {
    newErrors.mobile_number = "Mobile number is required";
  } else if (!/^\d{10}$/.test(form.mobile_number)) {
    newErrors.mobile_number = "Mobile number must be 10 digits";
  }

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!form?.password?.trim()) {
    newErrors.password = "Password is required";
  } else if (form?.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(form?.password)) {
    newErrors.password = "Password must contain at least one uppercase letter";
  } else if (!/[a-z]/.test(form?.password)) {
    newErrors.password = "Password must contain at least one lowercase letter";
  } else if (!/\d/.test(form?.password)) {
    newErrors.password = "Password must contain at least one number";
  } else if (!/[!@#$%^&*]/.test(form?.password)) {
    newErrors.password =
      "Password must contain at least one special character (!@#$%^&*)";
  }

  // if (!form?.role_id?.trim()) newErrors.role_id = "Role is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
