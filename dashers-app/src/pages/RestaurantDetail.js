import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './restaurantPage.css';
import { Navbar, Nav, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const RestaurantDetail = () => {
    const {ID} = useParams();
    const [restaurant, setRestaurant] = useState({});
    useEffect(() => {
        const getRestaurant = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/restaurant/${ID}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        };

        getRestaurant();
    }, []);
    // Navbar state
    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
        <div>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/order">
                    <Button variant="secondary" className="menu-btn">...</Button> Dashers
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/order">Order</Nav.Link>
                    <Nav.Link href="/res">Restaurant</Nav.Link>
                </Nav>
            </Navbar>
            {/* Main Content */}
            <div className="container mt-5">
                <h1 className="text-center mb-4">{restaurant.Name} Details</h1>
                {Object.keys(restaurant).length > 0 ? (
                    <div>
                        <div className="image-container">
                        <img src = {restaurant[0].Image} className="image"></img>
                        </div>
                        <h1 id="Title" className="text-left mt-3">{restaurant[0].Name}</h1>
                        <h4><p>Rating: {restaurant[0].Rating}</p>
                        <p>Popular Item: {restaurant[0].Popular_Item}</p></h4>
                        
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantDetail;