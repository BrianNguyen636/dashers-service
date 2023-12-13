import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HeaderBar({ CustomerID }) {
    return (
        <div>
            <Navbar bg="dark" variant="dark" className="navbar bg-dark">
                <Navbar.Brand href={`/home/${CustomerID}`}>
                    <Button variant="secondary" className="menu-btn">Dashers</Button>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href={`/res/${CustomerID}`}>Restaurant</Nav.Link>
                    <Nav.Link href={`/map/${CustomerID}`}>Map</Nav.Link>
                    <Nav.Link href={`/history/${CustomerID}`}>Order History</Nav.Link>
                </Nav>
                <Link to={`/order/${CustomerID}`} className="ms-auto">
                    <Button variant="primary">Shopping Cart</Button>
                </Link>
            </Navbar>
        </div>
    );
}
