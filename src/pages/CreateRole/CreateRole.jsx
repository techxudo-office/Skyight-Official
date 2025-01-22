import React, { useState } from 'react';
import { CardLayoutContainer, CardLayoutHeader, CardLayoutBody, CardLayoutFooter } from '../../components/CardLayout/CardLayout';
import { Input, Button, Switch, Spinner } from '../../components/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CreateRole = () => {

    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        role: Yup.string().required('Please enter new role'),
    });

    const formik = useFormik({
        initialValues: {
            role: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const payload = {
                question: values.question,
                options: [values.optionOne, values.optionTwo, values.optionThree, values.optionFour, values.optionFive, values.optionSix],
                // image: selectedImage,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6cedo1mkf6zjpkJ8oZ_GAUW4m-7wtVr_QjA&s",
                status: isActive ? 'active' : 'inactive'
            };
            // createPollHandler(payload);
        }
    });

    return (
        <>
            <Toaster />
            <CardLayoutContainer>
                <CardLayoutHeader heading='Create Role' className={'flex items-center justify-between'}>
                    <span onClick={() => { setIsActive(!isActive) }}><Switch switchStatus={isActive} /></span>
                </CardLayoutHeader>
                <CardLayoutBody>
                    <div>
                        {/* <div className={`relative ${formik.touched.question && formik.errors.question ? 'mb-10' : 'mb-5'}`}>
                            <Input
                                placeholder={'Enter Role'}
                                id={'role'}
                                name={'role'}
                                label={'Role*'}
                                type={'text'}
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.question && formik.errors.question && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {formik.errors.question}
                                </div>
                            )}
                        </div> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
                            <div className={`relative ${formik.touched.optionOne && formik.errors.optionOne ? 'mb-5' : ''}`}>
                                <Input
                                    placeholder={'Enter Option One'}
                                    id={'optionOne'}
                                    name={'optionOne'}
                                    label={'Option One*'}
                                    type={'text'}
                                    value={formik.values.optionOne}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.optionOne && formik.errors.optionOne && (
                                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                                        {formik.errors.optionOne}
                                    </div>
                                )}
                            </div>

                            <div className={`relative ${formik.touched.optionTwo && formik.errors.optionTwo ? 'mb-5' : ''}`}>
                                <Input
                                    placeholder={'Enter Option Two'}
                                    id={'optionTwo'}
                                    name={'optionTwo'}
                                    label={'Option Two*'}
                                    type={'text'}
                                    value={formik.values.optionTwo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.optionTwo && formik.errors.optionTwo && (
                                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                                        {formik.errors.optionTwo}
                                    </div>
                                )}
                            </div>

                            <Input
                                placeholder={'Enter Option Three'}
                                id={'optionThree'}
                                name={'optionThree'}
                                label={'Option Three'}
                                type={'text'}
                                value={formik.values.optionThree}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <Input
                                placeholder={'Enter Option Four'}
                                id={'optionFour'}
                                name={'optionFour'}
                                label={'Option Four'}
                                type={'text'}
                                value={formik.values.optionFour}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <Input
                                placeholder={'Enter Option Five'}
                                id={'optionFive'}
                                name={'optionFive'}
                                label={'Option Five'}
                                type={'text'}
                                value={formik.values.optionFive}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <Input
                                placeholder={'Enter Option Six'}
                                id={'optionSix'}
                                name={'optionSix'}
                                label={'Option Six'}
                                type={'text'}
                                value={formik.values.optionSix}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                    </div>
                </CardLayoutBody>
                <CardLayoutFooter>
                    <div>
                        <Button text={loading ? <Spinner /> : 'Create Role'} disabled={loading} onClick={formik.handleSubmit} />
                    </div>
                </CardLayoutFooter>
            </CardLayoutContainer>
        </>
    );
};

export default CreateRole;
