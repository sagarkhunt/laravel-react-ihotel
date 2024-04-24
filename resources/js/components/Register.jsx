import { Button, Col, Form, Input, Layout, Row } from 'antd';
import { NavLink } from 'react-router-dom';
import actions from '../redux/Authenticate/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function RegistrationForm() {
    const { registerLoader } = useSelector(
        (state) => state.authenticateReducer,
    );
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        dispatch({
            type: actions.REGISTER,
            payload: values,
        });
    };
    return (
        <div className="login-container">
            <div className="row m-0">
                <div className="col-6 left-login">
                    <img
                        src="/assets/v1/images/login_image.png"
                        alt=""
                        className="login-image"
                    />
                    <img
                        src="/assets/v1/images/I-hotel-logo-dark.png"
                        alt=""
                        className="login-logo mt-4"
                    />
                    <p className="body-2 mb-0 font-white mt-2">
                        Lorem ipsum dolor sit amet consectetur. Mattis mollis
                        vel dolor vel tristique ante magna lorem. At libero ac
                        ullamcorper convallis.
                    </p>
                </div>
                <div className="col-6 right-login">
                    <h6 className="headline-h4m ">Register</h6>
                    <p className="subtitle-2m">
                        Fill Below Details For Registration
                    </p>
                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        layout="vertical"
                        size="large"
                        className="register-form"
                    >
                        <label htmlFor="user_name" className="custom-label">
                            Hotel Name
                        </label>
                        <Form.Item
                            name="hotel_name"
                            validateTrigger="onSubmit"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your hotel name!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                className="form-control custom-input "
                                placeholder="Hotel name"
                            />
                        </Form.Item>
                        <label htmlFor="user_name" className="custom-label">
                            Contact Person Name
                        </label>
                        <Form.Item
                            name="name"
                            validateTrigger="onSubmit"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your Contact Person Names!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                className="form-control custom-input "
                                placeholder="Contact Person Name"
                            />
                        </Form.Item>
                        <label htmlFor="user_name" className="custom-label">
                            Mobile No
                        </label>
                        <Form.Item
                            name="mobile_no"
                            validateTrigger="onSubmit"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your Contact Mobile No!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                className="form-control custom-input "
                                placeholder="Mobile No"
                            />
                        </Form.Item>
                        <label htmlFor="user_name" className="custom-label">
                            User Name
                        </label>
                        <Form.Item
                            name="user_name"
                            validateTrigger="onSubmit"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your user name!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                className="form-control custom-input "
                                placeholder="User Name"
                            />
                        </Form.Item>
                        <label htmlFor="user_name" className="custom-label">
                            Email
                        </label>
                        <Form.Item
                            name="email"
                            validateTrigger="onSubmit"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                className="form-control custom-input "
                                placeholder="Email"
                            />
                        </Form.Item>
                        <label htmlFor="passwords" className="custom-label">
                            Password
                        </label>
                        <Form.Item
                            name="password"
                            validateTrigger="onSubmit"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                className="form-control custom-input"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <label htmlFor="user_name" className="custom-label">
                            City
                        </label>
                        <Form.Item
                            name="city"
                            validateTrigger="onSubmit"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your City!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                className="form-control custom-input "
                                placeholder="City"
                            />
                        </Form.Item>
                        <button
                            type="submit"
                            className="btn btn-primary my-4 w-100"
                        >
                            Register
                        </button>
                    </Form>
                    <p className="body-2 py-2 text-center">
                        Already have a account?
                        <NavLink
                            className="a-btn-link text-decoration-none"
                            to="/login"
                        >
                            Login
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}
