import React from "react";
import {
  CardLayoutContainer,
  CardLayoutBody,
} from "../../components/CardLayout/CardLayout";
import { Input, Button, Spinner } from "../../components/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../_core/features/authSlice";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.isLoadingRegister);

  const validationSchema = Yup.object({
    company_name: Yup.string().required("Please enter your company name"),
    first_name: Yup.string().required("Please enter your first name"),
    last_name: Yup.string().required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email"),
    phone_number: Yup.string().required("Please enter your phone number"),
    mobile_number: Yup.string().required("Please enter your mobile number"),
    password: Yup.string().required("Please enter your password"),
    city: Yup.string().required("Please enter your city"),
    country: Yup.string().required("Please enter your country"),
    address: Yup.string().required("Please enter your address"),
    website: Yup.string().required("Please enter your website"),
  });

  const registrationHandler = (payload, resetForm) => {
    dispatch(register(payload)).then((action) => {
      if (register.fulfilled.match(action)) {
        resetForm();
        navigate("/verification", { state: payload.email });
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      company_name: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      mobile_number: "",
      password: "",
      city: "",
      country: "",
      address: "",
      website: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        company_name: values.company_name,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number,
        mobile_number: values.mobile_number,
        password: values.password,
        city: values.city,
        country: values.country,
        address: values.address,
        website: values.website,
      };
      registrationHandler(payload, resetForm);
    },
  });

  return (
    <>
      <Toaster />
      <CardLayoutContainer className="hide-scrollbar max-w-[900px] h-[550px] m-auto p-0 shadow-3xl overflow-y-scroll">
        <CardLayoutBody removeBorder padding="p-0" className="flex">
          <div className="flex-1 p-16">
            <h3 className="text-4xl font-extrabold text-center mb-10">
              Register Your Company
            </h3>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5">
              <div
                className={`relative ${formik.touched.company_name && formik.errors.company_name
                  ? "mb-5"
                  : ""
                  }`}>
                <Input
                  placeholder="Skyight"
                  id="company_name"
                  name="company_name"
                  label="Company Name*"
                  type="text"
                  value={formik.values.company_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.company_name && formik.errors.company_name && (
                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                    {formik.errors.company_name}
                  </div>
                )}
              </div>
              <div
                className={`relative ${formik.touched.first_name && formik.errors.first_name
                  ? "mb-5"
                  : ""
                  }`}>
                <Input
                  placeholder="John"
                  id="first_name"
                  name="first_name"
                  label="First Name*"
                  type="text"
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
                  }`}>
                <Input
                  placeholder="Albert"
                  id="last_name"
                  name="last_name"
                  label="Last Name*"
                  type="text"
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
                  }`}>
                <Input
                  placeholder="abc.xcv@gmail.com"
                  id="email"
                  name="email"
                  label="Email Address*"
                  type="email"
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
                className={`relative ${formik.touched.phone_number && formik.errors.phone_number
                  ? "mb-5"
                  : ""
                  }`}>
                <Input
                  placeholder="+923312334567"
                  id="phone_number"
                  name="phone_number"
                  label="Phone Number*"
                  type="text"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone_number && formik.errors.phone_number && (
                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                    {formik.errors.phone_number}
                  </div>
                )}
              </div>
              <div
                className={`relative ${formik.touched.mobile_number && formik.errors.mobile_number
                  ? "mb-5"
                  : ""
                  }`}>
                <Input
                  placeholder="03312334567"
                  id="mobile_number"
                  name="mobile_number"
                  label="Mobile Number*"
                  type="text"
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
                  }`}>
                <Input
                  placeholder="********"
                  id="password"
                  name="password"
                  label="Set Password*"
                  type="password"
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
                className={`relative ${formik.touched.city && formik.errors.city ? "mb-5" : ""
                  }`}>
                <Input
                  placeholder="Karachi"
                  id="city"
                  name="city"
                  label="City*"
                  type="text"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                    {formik.errors.city}
                  </div>
                )}
              </div>
              <div
                className={`relative ${formik.touched.country && formik.errors.country ? "mb-5" : ""
                  }`}>
                <Input
                  placeholder="Pakistan"
                  id="country"
                  name="country"
                  label="Country*"
                  type="text"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                    {formik.errors.country}
                  </div>
                )}
              </div>
              <div
                className={`relative ${formik.touched.address && formik.errors.add ? "mb-5" : ""
                  }`}>
                <Input
                  placeholder="House no. abc near xvc mart"
                  id="address"
                  name="address"
                  label="Address*"
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                    {formik.errors.address}
                  </div>
                )}
              </div>
              <div
                className={`mt-5 relative ${formik.touched.website && formik.errors.website ? "mb-5" : ""
                  }`}>
                <Input
                  placeholder="www.skyight.com"
                  id="website"
                  name="website"
                  label="Website Url*"
                  type="text"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.website && formik.errors.website && (
                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                    {formik.errors.website}
                  </div>
                )}
              </div>

              <Link
                className="text-center hover:text-primary transition-all"
                to="/login">
                Already have an account ?
              </Link>

              <Button
                text={loading ? <Spinner /> : "Register"}
                type="submit"
                disabled={loading}
              />
            </form>
          </div>
        </CardLayoutBody>
      </CardLayoutContainer>
    </>
  );
};

export default RegistrationForm;
