import axios from 'axios';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { DotLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import { modVideoDetails } from './Function';

class HomeFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 16,
            allVideosArr: [],
            pageLoader: true
        }
    }

    componentDidMount = () => {
        this._load();
    }

    _load = async () => {
        let responseData = await axios.post('http://localhost:4000/api/v1/videos/getAllVideos', {}, { withCredentials: true });
        console.log("responseDatatat", JSON.stringify(responseData.data.response.docs));
        if (responseData.data && responseData.data.statusCode == 200) {
            let modVideoData = modVideoDetails(responseData.data.response.docs);
            this.setState({ allVideosArr: modVideoData });
            toast.success(responseData.message, {
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

    render() {
        return (
            <div>
                <ToastContainer />
                {this.state.pageLoader ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        <DotLoader color="#212121" loading={this.state.pageLoader} size={60} />
                    </div>
                    :
                    <div>
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
                                {this.state.allVideosArr.map((item, key) => (
                                    <Card style={{ width: '20rem', height: '18rem', marginRight: '20px', marginBottom: '20px' }} key={key}>
                                        {console.log("this.state.allVideosArr", JSON.stringify(item))}
                                        <Card.Img variant="top" src={item.thumbnail} style={{ width: '100%', height: '65%', objectFit: 'cover' }} />
                                        <Card.Body>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <img src={item.owner.avatar ? item.owner.avatar : ""} style={{ height: '30px', width: '30px', borderRadius: '20px', marginRight: '10px' }} />
                                                <Card.Title style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '20px', color: "#212121" }}>{item.title}</Card.Title>
                                            </div>
                                            <div>
                                                <Card.Title style={{ fontSize: '15px', color: "#212121" }}>{item.owner.fullName}</Card.Title>
                                            </div>
                                            <div>
                                                <Card.Title style={{ fontSize: '12px', color: "#212121" }}>{item.views} Views</Card.Title>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default HomeFeed
