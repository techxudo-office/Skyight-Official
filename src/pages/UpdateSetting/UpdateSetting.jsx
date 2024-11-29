import React, { useEffect, useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Input, Button, Switch, Spinner } from "../../components/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { updateSetting } from "../../utils/api_handler";

const UpdateSetting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [updateId, setUpdateId] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const updateSettingHandler = async (payload) => {
    setLoading(true);

    const response = await updateSetting(payload);
    if (response) {
      setLoading(false);
      if (response.status) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/dashboard/setting");
        }, 1000);
      } else {
        toast.error(response.message);
      }
    }
  };

  const validationSchema = Yup.object({
    rate: Yup.string().required("Please update rate"),
    commission: Yup.string().required("Please update commission"),
  });

  const formik = useFormik({
    initialValues: {
      rate: "",
      commission: "",
      status: isActive ? "active" : "inactive",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        rate: values.rate,
        commission: values.commission,
        // status: values.status,
      };
      updateSettingHandler(payload);
    },
  });

  useEffect(() => {
    const preData = location.state;

    if (preData) {
      setUpdateId(preData.id);
      formik.values.rate = preData.rate;
      formik.values.commission = preData.commission;
    }
  }, [location]);

  return (
    <>
      <Toaster />
      <CardLayoutContainer>
        <CardLayoutHeader
          heading="Update Setting"
          className={"flex items-center justify-between"}
        >
          <span
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <Switch switchStatus={isActive} />
          </span>
        </CardLayoutHeader>
        <CardLayoutBody>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
              <div
                className={`relative ${
                  formik.touched.optionOne && formik.errors.optionOne
                    ? "mb-5"
                    : ""
                }`}
              >
                <Input
                  placeholder={"Enter Rate"}
                  id={"rate"}
                  name={"rate"}
                  label={"Rate*"}
                  type={"number"}
                  value={formik.values.rate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.rate && formik.errors.rate && (
                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                    {formik.errors.rate}
                  </div>
                )}
              </div>

              <div
                className={`relative ${
                  formik.touched.commission && formik.errors.commission
                    ? "mb-5"
                    : ""
                }`}
              >
                <Input
                  placeholder={"Enter Commission"}
                  id={"commission"}
                  name={"commission"}
                  label={"Commission*"}
                  type={"number"}
                  value={formik.values.commission}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.commission && formik.errors.commission && (
                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                    {formik.errors.commission}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardLayoutBody>
        <CardLayoutFooter>
          <div>
            <Button
              text={loading ? <Spinner /> : "Update Setting"}
              disabled={loading}
              onClick={formik.handleSubmit}
            />
          </div>
        </CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default UpdateSetting;
