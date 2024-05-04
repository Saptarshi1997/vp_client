import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from '../../components';
import { validateLoginData } from './Function';
import styles from './Style';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: false,
            email: "",
            password: "",
            isPassOpen: false
        }
    }

    componentDidMount = () => {
        this._load();
    }

    _load = () => {

    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onCheckEyeOpen = () => {
        this.setState({ isPassOpen: !this.state.isPassOpen });
    }

    onLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        let validateData = validateLoginData(this.state);

        if (validateData) {
            let reqData = {
                email: this.state.email,
                password: this.state.password,
            };

            this.setState({ pageLoader: true });
            let responseData = await axios.post('http://localhost:4000/api/v1/users/login', reqData);
            console.log("responseDatatat", JSON.stringify(responseData));

            if (responseData.data && responseData.data.statusCode == 200) {
                localStorage.setItem('userInfo', responseData.data.response);
                document.cookie = `accessToken=${responseData.data.response.accessToken}; path=/`;
                axios.defaults.headers.common['Authorization'] = `Bearer ${responseData.data.response.accessToken}`;
                this.props.navigate('/');
                toast.success(responseData.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(responseData.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            this.setState({ pageLoader: false });
        }
    }

    render() {
        return (
            < >
                <ToastContainer />
                {this.state.pageLoader ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        <DotLoader color="#212121" loading={this.state.pageLoader} size={60} />
                    </div>
                    :
                    <>
                        <NavBar name="User Login" />
                        <div className='container mt-5'>
                            <div className='page-title text-center'>
                                <h1>Welcome to Vista Play</h1>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <h6 style={{ display: 'flex', backgroundColor: "rgb(67, 185, 150)", width: '320px', padding: '5px', justifyContent: 'center', borderRadius: '5px', marginTop: '5px' }}>A complete solution for entertainment</h6>
                                </div>
                            </div>
                            <section className='d-flex justify-content-between align-items-center'>
                                <div className='left-data p-3' style={{ width: '100%' }}>
                                    <h3 className='page-heading mt-3 mb-5 text-center col-lg-8' style={{ fontSize: '38px' }}>Login to your Account</h3>
                                    <Form>
                                        <Form.Group className="mb-3 col-lg-8" controlId="email">
                                            <Form.Control type="email" value={this.state.email} onChange={(e) => this.onChangeEmail(e)} placeholder="Enter your email" style={styles.inputBox} />
                                        </Form.Group>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <div className="mb-3 col-lg-7">
                                                <Form.Group controlId="password">
                                                    <Form.Control type={this.state.isPassOpen ? "text" : "password"} value={this.state.password} onChange={(e) => this.onChangePassword(e)} placeholder="Enter your Password" style={styles.inputBox} />
                                                </Form.Group>
                                            </div>
                                            <Button className="mb-3 col-lg-1" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff', border: '0px' }} onClick={() => this.onCheckEyeOpen()}>
                                                <img src={this.state.isPassOpen ? '/eye-open.png' : '/eye-close.png'} alt="eye-show" style={{ width: '25px', height: '25px', backgroundColor: '#ffffff' }} />
                                            </Button>
                                        </div>
                                        <Button variant="primary" type="submit" onClick={(e) => this.onLogin(e)} className='col-lg-8' style={{ backgroundColor: "rgb(67, 185, 150)", color: "#212121" }}>
                                            Log in
                                        </Button>
                                    </Form>
                                    <p className='mt-3 d-flex justify-content-center col-lg-8'>Not registered yet?<span style={{ marginLeft: '10px' }}><NavLink to="/register">Sign up</NavLink></span></p>
                                </div>
                                <div className='right-data' style={{ width: "100%" }}>
                                    <div className="sign-img mt-5">
                                        <img src='/register.png' alt="register-img" style={{ maxWidth: 500 }} />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default Login
