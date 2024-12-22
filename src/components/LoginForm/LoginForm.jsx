import React, { useState } from "react";
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

import { FaCheck } from "react-icons/fa6";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        question: values.question,
        options: [
          values.optionOne,
          values.optionTwo,
          values.optionThree,
          values.optionFour,
          values.optionFive,
          values.optionSix,
        ],
        // image: selectedImage,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6cedo1mkf6zjpkJ8oZ_GAUW4m-7wtVr_QjA&s",
        status: isActive ? "active" : "inactive",
      };
      // createPollHandler(payload);
    },
  });

  return (
    <>
      <CardLayoutContainer className={"w-[70%] m-auto p-0 shadow-3xl"}>
        <CardLayoutBody removeBorder={true} padding={"p-0"} className={"flex"}>
          <div className="flex-1 p-16 ">
            <h3 className="text-4xl font-semibold text-center mb-10">Login</h3>

            <div className="flex flex-col gap-5">
              <div
                className={`relative${
                  formik.touched.email && formik.errors.email ? "mb-5" : ""
                }`}
              >
                <Input
                  placeholder={"abc.xcv@gmail.com"}
                  id={"email"}
                  name={"email"}
                  label={"Email Address*"}
                  type={"email"}
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
                className={`relative${
                  formik.touched.password && formik.errors.password
                    ? "mb-5"
                    : ""
                }`}
              >
                <Input
                  placeholder={"********"}
                  id={"password"}
                  name={"password"}
                  label={"Password*"}
                  type={"password"}
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

              <Link
                className="text-center hover:text-primary transition-all"
                to={"/forgot-password"}
              >
                Forgot your password?
              </Link>

              <Button text={"Login"} type="submit" />
            </div>
          </div>
          <div className="flex-1 p-16 register-component-bg rounded-r-3xl">
            <h3 className="text-4xl font-semibold text-center mb-10">
              Register Company
            </h3>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <h4 className="flex items-center gap-3 mb-6 text-lg">
                  <FaCheck className="bg-blue-100 text-primary p-1 rounded-full text-2xl" />{" "}
                  Save time when booking
                </h4>
                <h4 className="flex items-center gap-3 my-6 text-lg">
                  <FaCheck className="bg-blue-100 text-primary p-1 rounded-full text-2xl" />{" "}
                  Save your favourites easily
                </h4>
                <h4 className="flex items-center gap-3 my-6 text-lg">
                  <FaCheck className="bg-blue-100 text-primary p-1 rounded-full text-2xl" />{" "}
                  View your reservations and history
                </h4>
              </div>

              <SecondaryButton text={"Register Now"} className="mt-5" />
            </div>
          </div>
        </CardLayoutBody>
      </CardLayoutContainer>
    </>
  );
};

export default LoginForm;
