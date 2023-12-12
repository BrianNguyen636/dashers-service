import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Card, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HeaderBar() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" className="navbar bg-dark">
                <Navbar.Brand href="/home">
                    <Button variant="secondary" className="menu-btn">Dashers</Button>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/res">Restaurant</Nav.Link>
                    <Nav.Link href="/map">Map</Nav.Link>
                    <Nav.Link href="/history">Order History</Nav.Link>
                </Nav>

                {/* shopping cart button */}
                <Link to="/order" className="ms-auto">
                    <Button variant="primary">Shopping Cart</Button>
                </Link>
            </Navbar>
        </div>
    );
}
