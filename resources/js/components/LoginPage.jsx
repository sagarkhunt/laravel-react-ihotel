import { useDispatch } from 'react-redux';
import actions from '../redux/Authenticate/actions';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Row, Col, Layout } from 'antd';

import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isAuthenticated,loader } = useSelector((state) => state.authenticateReducer);
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);
    const onFinish = (values) => {
        console.log("🚀 ~ onFinish ~ values:", values)
        dispatch({
            type: actions.LOGIN,
            payload: {
                user_name: values.user_name,
                password: values.password,
                remember: values.remember,
            },
        });
        // navigate('/dashboard')
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
                    <h6 className="headline-h4m mt-4">Login</h6>
                    <p className="subtitle-2m">Signin to Continue</p>
                    <Form name="normal_login" onFinish={onFinish}>
                        <div className="form-group">
                            <label htmlFor="user_name" className="custom-label">
                                User name
                            </label>
                            <Form.Item
                                name="user_name"
                                validateTrigger="onSubmit"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your user name!',
                                    },
                                ]}
                            >
                                <Input
                                    className="form-control custom-input"
                                    type="text"
                                    placeholder="User name"
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
                        </div>
                        <div className="d-flex justify-content-end pt-2 ">
                            <NavLink
                                to="/forgot-pass"
                                className="a-btn-link text-decoration-none"
                            >
                                Forgot Password?
                            </NavLink>
                        </div>
                        <button className="btn btn-primary my-4 w-100">
                            Login
                        </button>
                    </Form>
                    <p className="body-2 py-2 text-center">
                        Don't have an account?
                        <NavLink to="/register">Register!</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
