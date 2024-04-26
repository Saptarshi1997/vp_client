import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Style';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            userName: "",
            email: "",
            password: "",
            avatar: "",
            coverImage: "",
            avatarURL: "",
            coverImageURL: "",
            // navigate: 
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
                let responseData = await axios.post('http://localhost:4000/api/v1/users/register', reqData);
                console.log("responseDatatat", JSON.stringify(responseData));

                if (responseData.data && responseData.data.statusCode == 200) {
                    toast.success(responseData.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // this.props.navigation.navigate("Login");
                    // const navigate = useNavigate();
                    // navigate('/login');
                } else {
                    toast.error(responseData.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } catch (error) {
                console.error("Error registering user:", error);
            }
        } else {
            console.log("Validation failed.");
        }
    }

    render() {
        return (
            <div className='bg-container' style={styles.bgContainer}>
                <ToastContainer />
                <div style={{ border: '1px solid', padding: '25px', borderRadius: '15px', width: "400px", backgroundColor: '#ffffff' }}>
                    <h1 className='heading' style={styles.heading}>Register Page</h1>
                    <form className='form-container'>
                        <div style={styles.inputContainer}>
                            <label style={styles.inputText} htmlFor="fullName">Full Name:</label>
                            <input type="text" id="fullName" name="fullName" value={this.state.fullName} onChange={(e) => this.onChangeFullName(e)} required />
                        </div>
                        <div style={styles.inputContainer}>
                            <label style={styles.inputText} htmlFor="email">User name:</label>
                            <input type="text" id="userName" name="userName" value={this.state.userName} onChange={(e) => this.onChangeUserName(e)} required />
                        </div>
                        <div style={styles.inputContainer}>
                            <label style={styles.inputText} htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={this.state.email} onChange={(e) => this.onChangeEmail(e)} required />
                        </div>
                        <div style={styles.inputContainer}>
                            <label style={styles.inputText} htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={this.state.password} onChange={(e) => this.onChangePassword(e)} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', flex: '40%' }}>
                                <div style={styles.inputContainer}>
                                    <label style={{ display: 'flex', flex: "30%", alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '20px', margin: '10px', backgroundColor: "#7A6A4F", padding: "2px", width: "80px", borderRadius: '7px' }} htmlFor="avatar">Avatar</label>
                                    <input type="file" id="avatar" name="avatar" accept="image/*" style={{ display: 'none' }} onChange={(e) => this.onChangeAvatar(e)} />
                                </div>
                                <div style={{ flex: '70%', alignItems: 'center', justifyContent: 'flex-start', display: 'flex' }}>
                                    {this.state.avatarURL && <img src={this.state.avatarURL} alt="Avatar" style={{ width: '60px', height: '60px', borderRadius: '40px' }} />}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', flex: '60%' }}>
                                <div style={styles.inputContainer}>
                                    <label style={{ display: 'flex', flex: "60%", alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '20px', margin: '10px', backgroundColor: "#7A6A4F", padding: "2px", width: "120px", borderRadius: '7px' }} htmlFor="coverImage">Cover Image</label>
                                    <input type="file" id="coverImage" name="coverImage" accept="image/*" style={{ display: 'none' }} onChange={(e) => this.onChangeCoverImage(e)} />
                                </div>
                                <div style={{ flex: '40%', alignItems: 'center', justifyContent: 'flex-start', display: 'flex' }}>
                                    {this.state.coverImageURL && <img src={this.state.coverImageURL} alt="Cover Image" style={{ width: '100px', height: '30px' }} />}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                            <button style={{ width: 100, height: 40, backgroundColor: '#D3212D', borderRadius: '10px' }} type="submit" onClick={(e) => this.onRegister(e)}>Register</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

export default Register;