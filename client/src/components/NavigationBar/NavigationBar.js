import React from 'react';

import {Navbar, Nav} from 'react-bootstrap';

import {NavLink} from 'react-router-dom';

import './NavigationBar.css';

export default function NavigationBar() {
    return (
        <div>
            <Navbar expand="lg">
                <Navbar.Brand><span><NavLink to="/">React Blog</NavLink></span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </Nav.Link>
                        {/* <Nav.Link>
                            <NavLink to="/publish">
                                Publish
                            </NavLink>
                        </Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
