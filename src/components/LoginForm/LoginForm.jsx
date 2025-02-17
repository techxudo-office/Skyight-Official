import React, { useState, useContext } from "react";
import {
  CardLayoutContainer,
  CardLayoutBody,
} from "../../components/CardLayout/CardLayout";
import {
  Input,
  Button,
  Spinner,
  SecondaryButton,
} from "../../components/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../utils/api_handler";
import { FaCheck } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { updateAuthToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const loginHandler = async (payload, resetForm) => {
    setLoading(true);
    let response = await login(payload);
    if (response.status) {
      updateAuthToken(response.token);
      toast.success(response.message);
      resetForm();
      setLoading(false);
      setTimeout(() => {
        navigate("/dashboard");
        }, 3000);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        email: values.email,
        password: values.password,
      };
      loginHandler(payload, resetForm);
    },
  });

  return (
    <>
      <Toaster />
      <CardLayoutContainer className="max-w-[900px] m-auto p-0 shadow-3xl">
        <CardLayoutBody removeBorder padding="p-0" className="flex">
          {/* Login Form */}
          <div className="flex-1 p-16">
            <h3 className="mb-10 text-4xl font-extrabold text-center">Login</h3>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5"
            >
              <div
                className={`relative ${
                  formik.touched.email && formik.errors.email ? "mb-5" : ""
                }`}
              >
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
                  <div className="absolute left-0 mt-2 text-sm text-red-500">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div
                className={`relative ${
                  formik.touched.password && formik.errors.password
                    ? "mb-5"
                    : ""
                }`}
              >
                <Input
                  placeholder="********"
                  id="password"
                  name="password"
                  label="Password*"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="absolute left-0 mt-2 text-sm text-red-500">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <Link
                className="text-center transition-all hover:text-primary"
                to="/forget-password"
              >
                Forget your password?
              </Link>

              <Button
                text={loading ? <Spinner /> : "Login"}
                type="submit"
                disabled={loading}
              />
            </form>
          </div>

          {/* Register Section */}
          <div className="flex-1 p-16 register-component-bg rounded-r-3xl">
            <h3 className="mb-10 text-4xl font-extrabold text-center">
              Registration
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <h4 className="flex items-center gap-3 mb-6 text-lg">
                  <FaCheck className="p-1 text-2xl bg-blue-100 rounded-full text-primary" />
                  Save time when booking
                </h4>
                <h4 className="flex items-center gap-3 my-6 text-lg">
                  <FaCheck className="p-1 text-2xl bg-blue-100 rounded-full text-primary" />
                  Save your favourites easily
                </h4>
                <h4 className="flex items-center gap-3 my-6 text-lg">
                  <FaCheck className="p-1 text-2xl bg-blue-100 rounded-full text-primary" />
                  View your reservations and history
                </h4>
              </div>
              <SecondaryButton
                onClick={() => {
                  navigate("/registration");
                }}
                text="Register Now"
                className="mt-5"
              />
            </div>
          </div>
        </CardLayoutBody>
      </CardLayoutContainer>
    </>
  );
};

export default LoginForm;
