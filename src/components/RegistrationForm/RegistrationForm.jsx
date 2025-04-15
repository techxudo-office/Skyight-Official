import React from "react";
import {
  CardLayoutContainer,
  CardLayoutBody,
} from "../../components/CardLayout/CardLayout";
import { Input, Button, Spinner, Select } from "../../components/components";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../_core/features/authSlice";
import { registrationValidationSchema } from "../../schema/validationSchema";
import { Country, City } from "country-state-city";

const formFields = [
  {
    name: "company_name",
    label: "Company Name*",
    placeholder: "Skyight",
    type: "text",
  },
  {
    name: "first_name",
    label: "First Name*",
    placeholder: "John",
    type: "text",
  },
  {
    name: "last_name",
    label: "Last Name*",
    placeholder: "Albert",
    type: "text",
  },
  {
    name: "email",
    label: "Email Address*",
    placeholder: "abc.xcv@gmail.com",
    type: "email",
  },
  {
    name: "phone_number",
    label: "Phone Number*",
    placeholder: "+923312334567",
    type: "text",
  },
  {
    name: "mobile_number",
    label: "Mobile Number*",
    placeholder: "03312334567",
    type: "text",
  },
  {
    name: "password",
    label: "Set Password*",
    placeholder: "********",
    type: "password",
  },
  {
    name: "country",
    label: "Country*",
    placeholder: "Pakistan",
    type: "text",
  },
  { name: "city", label: "City*", placeholder: "Karachi", type: "text" },
  {
    name: "address",
    label: "Address*",
    placeholder: "House no. abc near xvc mart",
    type: "text",
  },
  {
    name: "website",
    label: "Website Url*",
    placeholder: "www.skyight.com",
    type: "text",
  },
];

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.isLoadingRegister);

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
    registrationValidationSchema,
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
        country: values.country.label,
        address: values.address,
        website: values.website,
      };
      registrationHandler(payload, resetForm);
    },
  });
  const countryOptions = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode,
  }));

  const cityOptions = formik.values.country.value
    ? City.getCitiesOfCountry(formik.values.country.value).map((city) => ({
        label: city.name,
        value: city.name,
      }))
    : [];

  console.log(cityOptions);

  return (
    <>
      <Toaster />
      <CardLayoutContainer className="hide-scrollbar max-w-[900px] h-[550px] m-auto p-0 shadow-3xl overflow-y-scroll">
        <CardLayoutBody removeBorder padding="p-0" className="flex">
          <div className="flex-1 p-16">
            <h3 className="mb-10 text-4xl font-extrabold text-center">
              Register Your Company
            </h3>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5"
            >
              {formFields.map(({ name, label, placeholder, type }) => {
                if (name === "country") {
                  return (
                    <div key={name} className="relative">
                      <Select
                        id={name}
                        label={label}
                        options={countryOptions}
                        value={formik.values.country.label}
                        onChange={(selectedOption) => {
                          formik.setFieldValue("country", selectedOption);
                          formik.setFieldValue("city", "");
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={placeholder}
                      />
                      {formik.touched.country && formik.errors.country && (
                        <div className="absolute left-0 mt-2 text-sm text-red-500">
                          {formik.errors.country}
                        </div>
                      )}
                    </div>
                  );
                }

                if (name === "city") {
                  return (
                    <div key={name} className="relative">
                      <Select
                        id={name}
                        label={label}
                        options={cityOptions}
                        value={formik.values.city}
                        onChange={(selectedOption) => {
                          formik.setFieldValue("city", selectedOption.value);
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.values.country
                            ? "Select your city"
                            : "Select country first"
                        }
                        disabled={!formik.values.country}
                      />
                      {formik.touched.city && formik.errors.city && (
                        <div className="absolute left-0 mt-2 text-sm text-red-500">
                          {formik.errors.city}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <div
                    key={name}
                    className={`relative ${
                      formik.touched[name] && formik.errors[name] ? "mb-5" : ""
                    }`}
                  >
                    <Input
                      id={name}
                      name={name}
                      label={label}
                      placeholder={placeholder}
                      type={type}
                      value={formik.values[name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched[name] && formik.errors[name] && (
                      <div className="absolute left-0 mt-2 text-sm text-red-500">
                        {formik.errors[name]}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                className="text-center transition-all hover:text-primary"
                to="/login"
              >
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
