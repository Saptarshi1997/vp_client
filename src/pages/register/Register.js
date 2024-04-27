import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from '../../components';
import { validateRegisterData } from './Function';
import styles from './Style';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            userName: "",
            email: "",
            password: "",
            confPassword: "",
            avatar: "",
            coverImage: "",
            avatarURL: "",
            coverImageURL: "",
            pageLoader: false,
            isPassOpen: false,
            isConfPassOpen: false
        }
    }

    componentDidMount = () => {
        this._load();
    }

    _load = () => {
    }

    onChangeFullName = (e) => {
        this.setState({ fullName: e.target.value });
    }

    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onChangeConfPassword = (e) => {
        this.setState({ confPassword: e.target.value });
    }

    onChangeAvatar = (e) => {
        const file = e.target.files[0];
        this.setState({ avatar: file });

        const reader = new FileReader();
        reader.onload = () => {
            this.setState({ avatarURL: reader.result });
        };
        reader.readAsDataURL(file);
    }

    onChangeCoverImage = (e) => {
        const file = e.target.files[0];
        this.setState({ coverImage: file });

        const reader = new FileReader();
        reader.onload = () => {
            this.setState({ coverImageURL: reader.result });
        };
        reader.readAsDataURL(file);
    }

    onCheckEyeOpen = (type) => {
        if (type === "password") {
            this.setState({ isPassOpen: !this.state.isPassOpen });
        } else {
            this.setState({ isConfPassOpen: !this.state.isConfPassOpen });
        }
    }

    onRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        let validateData = validateRegisterData(this.state);

        if (validateData) {
            let reqData = {
                fullName: this.state.fullName,
                email: this.state.email,
                userName: this.state.userName,
                password: this.state.password,
                avatar: this.state.avatar,
                coverImage: this.state.coverImage
            };

            try {
                this.setState({ pageLoader: true });
                let responseData = await axios.post('http://localhost:4000/api/v1/users/register', reqData);
                console.log("responseDatatat", JSON.stringify(responseData));

                if (responseData.data && responseData.data.statusCode == 200) {
                    this.props.navigate('/login');
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
            } catch (error) {
                console.error("Error registering user:", error);
            }
        } else {
            console.log("Validation failed.");
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
                        <NavBar name="User Registration" />
                        <div className='container mt-5'>
                            <div className='page-title text-center'>
                                <h1>Welcome to Vista Play</h1>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <h6 style={{ display: 'flex', backgroundColor: "rgb(67, 185, 150)", width: '320px', padding: '5px', justifyContent: 'center', borderRadius: '5px', marginTop: '5px' }}>A complete solution for entertainment</h6>
                                </div>
                            </div>
                            <section className='d-flex justify-content-between align-items-center'>
                                <div className='left-data p-3' style={{ width: '100%' }}>
                                    <h3 className='page-heading mt-3 mb-5 text-center col-lg-8' style={{ fontSize: '38px' }}>Register with us</h3>
                                    <Form>
                                        <Form.Group className="mb-3 col-lg-8" controlId="fullName">
                                            <Form.Control type="text" value={this.state.fullName} onChange={(e) => this.onChangeFullName(e)} placeholder="Enter your name" style={styles.inputBox} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 col-lg-8" controlId="userName">
                                            <Form.Control type="text" value={this.state.userName} onChange={(e) => this.onChangeUserName(e)} placeholder="Enter your User name" style={styles.inputBox} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 col-lg-8" controlId="email">
                                            <Form.Control type="email" value={this.state.email} onChange={(e) => this.onChangeEmail(e)} placeholder="Enter your email" style={styles.inputBox} />
                                        </Form.Group>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <div className="mb-3 col-lg-7">
                                                <Form.Group controlId="password">
                                                    <Form.Control type={this.state.isPassOpen ? "text" : "password"} value={this.state.password} onChange={(e) => this.onChangePassword(e)} placeholder="Enter your Password" style={styles.inputBox} />
                                                </Form.Group>
                                            </div>
                                            <Button className="mb-3 col-lg-1" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff', border: '0px' }} onClick={() => this.onCheckEyeOpen("password")}>
                                                <img src={this.state.isPassOpen ? '/eye-open.png' : '/eye-close.png'} alt="eye-show" style={{ width: '25px', height: '25px', backgroundColor: '#ffffff' }} />
                                            </Button>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <div className="mb-3 col-lg-7">
                                                <Form.Group controlId="confPassword">
                                                    <Form.Control type={this.state.isConfPassOpen ? "text" : "password"} value={this.state.confPassword} onChange={(e) => this.onChangeConfPassword(e)} placeholder="Confirm your Password" style={styles.inputBox} />
                                                </Form.Group>
                                            </div>
                                            <Button className="mb-3 col-lg-1" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff', border: '0px' }} onClick={() => this.onCheckEyeOpen("confirmPassword")}>
                                                <img src={this.state.isConfPassOpen ? '/eye-open.png' : '/eye-close.png'} alt="eye-show" style={{ width: '25px', height: '25px', backgroundColor: '#ffffff' }} />
                                            </Button>
                                        </div>
                                        <div className='col-lg-8 mt-4 mb-3' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                                            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginBottom: '10px' }}>
                                                {this.state.avatarURL && this.state.avatarURL.length > 0 ?
                                                    <img src={this.state.avatarURL} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50px' }} />
                                                    :
                                                    <img src='/user.png' alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50px' }} />
                                                }
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Form.Group >
                                                    <Form.Label htmlFor="avatar" style={{ textAlign: 'center', color: '#ffffff', fontSize: '18px', backgroundColor: "#CB4335", borderRadius: '7px', width: '150px', height: '30px' }} >Upload Avatar</Form.Label>
                                                    <Form.Control id="avatar" type="file" onChange={(e) => this.onChangeAvatar(e)} accept='images/*' style={{ display: 'none', alignSelf: 'center' }} />
                                                </Form.Group>

                                            </div>
                                        </div>
                                        {/* <Form.Group className="mb-3" controlId="rememberMe">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group> */}
                                        <Button variant="primary" type="submit" onClick={(e) => this.onRegister(e)} className='col-lg-8' style={{ backgroundColor: "rgb(67, 185, 150)", color: "#212121" }}>
                                            Sign up
                                        </Button>
                                    </Form>
                                    <p className='mt-3 d-flex justify-content-center col-lg-8'>Already Have an Account<span style={{ marginLeft: '10px' }}><NavLink to="/login">Sign in</NavLink></span></p>
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

export default Register;