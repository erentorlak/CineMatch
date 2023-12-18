import "./ProgramNavbar.css"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthContext } from "../../auth/AuthContext";
import  { useContext } from 'react';
import { useEffect } from "react";
import { UserContext } from "../UserContext";


export default function ProgramNavbar() {
  const user = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if(sidebarOpen) document.getElementById('sidebar').style.visibility = 'visible';
    else document.getElementById('sidebar').style.visibility = 'hidden';
  };

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
      logout();
  };



  return (
    <div>
      <Navbar expand="lg" sticky="top" className="main-navbar flex-nowrap">
        <Navbar.Brand className= "mx-3 navbar-logo" style={{ color: '#CECECE' }}>
          <Link to="/mainpage" className="mx-3 navbar-logo" style={{ color: '#CECECE' }}>
            Logo
          </Link>
        </Navbar.Brand>
        <Form className="d-flex flex-grow-1 mx-4" inline>
          <FormControl
            type="text"
            placeholder="Search for movie..."
            className="mr-sm-2 flex-grow-1 navbar-search-bar"
          />
          <Button variant="outline-info" className="navbar-button">Search</Button>
        </Form>
        <Nav.Link as={Link} to="/myprofile">
          <Image 
          className="mx-3 profile-photo"
          src={user.profilePictureUrl}
          />
        </Nav.Link>
        <Nav.Link as={Link} to="/myprofile" className="mx-1 navbar-username">
          <div style={{ color: '#CECECE' }}>{user.username}</div>
        </Nav.Link>
        <button  className="side-menu-button mx-3" type= "button" aria-label="Toogle Navigation"
        onClick={() => toggleSidebar()}> 
          <span className="navbar-toggler-icon"></span>
        </button>
      </Navbar>

      <div className="side-bar" id="sidebar" >
        <Container className="sidebar-content">
          <Link to = "/myprofile"><Row className= "link-on-sidebar">
            PROFILE
          </Row>
          </Link>
          <Link to = "/mylists"><Row className= "link-on-sidebar">
            MY LISTS
          </Row>
          </Link>
          <Link to = "/mainpage"><Row className= "link-on-sidebar">
            STATS
          </Row>
          </Link>
          <Link to = "/mainpage"><Row className= "link-on-sidebar">
            LIGHT MODE
          </Row>
          </Link>
          <Link to = "/mainpage"><Row className= "link-on-sidebar" onClick={handleLogout} >
            LOG OUT
          </Row>
          </Link>
        </Container>
      </div>
    </div>
  );
}
