import React, { useEffect, useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutBody,
} from "../../components/CardLayout/CardLayout";
import {
  Input,
  Button,
  Spinner,
  SecondaryButton,
  RegistrationForm,
} from "../../components/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { login } from "../../_core/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerModal, setRegisterModal] = useState(false)
  const { userData, isLoading, loginError } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  useEffect(() => {
    if (userData) {
      navigate("/dashboard");
    }
  }, [userData, navigate]);

  const loginHandler = (payload, resetForm) => {
    dispatch({ type: "user/login" })
    dispatch(login(payload)).then((response) => {
      if (loginError == null) {
        resetForm();
      }
    });
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

      {!registerModal && <CardLayoutContainer className="max-w-[900px]  mx-auto mt-20  overflow-y-scroll">
        <CardLayoutBody removeBorder padding="p-0" className="flex bg-white">
          <div className="flex-1 p-16">
            <h3 className="mb-10 text-4xl font-extrabold text-center">Login</h3>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5">
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
                  <div className="absolute left-0 mt-2 text-sm text-red-500">
                    {formik.errors.email}
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
                to="/forget-password">
                Forget your password?
              </Link>

              <Button
                text={isLoading ? <Spinner /> : "Login"}
                type="submit"
                disabled={isLoading}
              />
            </form>
          </div>
          <div className="flex-1 p-16 register-component-bg rounded-r-lg">
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
                onClick={() => setRegisterModal(true)}
                text="Register Now"
                className="mt-5"
              />
            </div>
          </div>
        </CardLayoutBody>

      </CardLayoutContainer>}
      {registerModal &&
        <CardLayoutContainer className="max-w-[900px] mt-[1000px]  bg-white  mx-auto my-auto  pb-20 ">

          <div onClick={() => setRegisterModal(false)} className="w-full cursor-pointer flex items-center justify-start pt-8 pl-8 text-2xl text-text">
            <MdArrowBack /></div>
          <RegistrationForm />


        </CardLayoutContainer>}
    </>
  );
};

export default LoginForm;
