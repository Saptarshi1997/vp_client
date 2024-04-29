import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { ToastContainer } from 'react-toastify';

class HomeFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 16
        }
    }

    componentDidMount = () => {
        this._load();
    }

    _load = () => {
        // const data = localStorage.getItem('userInfo');
        // console.log("datatatat loaclstorage----", JSON.stringify(data));
        // if (data) {
        //     this.props.navigate('/');
        // } else {
        //     this.props.navigate('/login');
        //     toast.warn("You have to login to access this page!", {
        //         position: "top-center",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // }
    }

    render() {
        return (
            <div>
                <ToastContainer />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', flexDirection: 'row' }}>
                    <Form.Group className="mb-3 col-lg-6" controlId="search">
                        <Form.Control type="text" placeholder="Search anything" style={{ borderRadius: 20, border: '1px solid #212121' }} />
                    </Form.Group>
                    <Button className="mb-3 col-lg-1" variant="primary" type="submit" style={{ backgroundColor: '#ffffff', border: '0px', display: 'flex', alignItems: 'center' }}>
                        <img src='/search.png' alt="search-icon" style={{ width: '35px', height: '35px' }} />
                    </Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', margin: '15px' }}>
                    <div style={{ display: 'flex', flex: '10%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <Navbar expand="lg" className="flex-column">
                            <Navbar.Toggle aria-controls="sidebar-nav" />
                            <Navbar.Collapse id="sidebar-nav">
                                <Nav className="flex-column">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="#videos">My Account</Nav.Link>
                                    <Nav.Link href="#subscriptions">Subscriptions</Nav.Link>
                                    <Nav.Link href="#settings">Settings</Nav.Link>
                                    <Nav.Link href="/login">Logout</Nav.Link>
                                    <hr />
                                    <Nav.Link href="/">Your Channel</Nav.Link>
                                    <Nav.Link href="#videos">Watch History</Nav.Link>
                                    <Nav.Link href="#subscriptions">Your Playlist</Nav.Link>
                                    <Nav.Link href="#settings">Your videos</Nav.Link>
                                    <Nav.Link href="/login">Watch hour</Nav.Link>
                                    <Nav.Link href="/login">Liked Videos</Nav.Link>
                                    <hr />
                                    <Nav.Link href="/">Duration</Nav.Link>
                                    <Nav.Link href="#videos">Sort by</Nav.Link>
                                    <Nav.Link href="#subscriptions">Upload Date</Nav.Link>
                                    <hr />
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div style={{ display: 'flex', flex: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {Array.from({ length: this.state.length }).map((_, key) => (
                            <Card style={{ width: '18rem', marginRight: '20px', marginBottom: '20px' }} key={key}>
                                <Card.Img variant="top" src="/register.png" />
                                <Card.Body>
                                    <Card.Title>Introduction to Python for beginer</Card.Title>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeFeed
