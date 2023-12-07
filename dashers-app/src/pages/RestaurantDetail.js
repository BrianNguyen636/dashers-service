import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './restaurantPage.css';
import { Navbar, Nav, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RestaurantDetail = () => {
    const { RestaurantID } = useParams();
    const [restaurant, setRestaurant] = useState({});
    useEffect(() => {
        const getRestaurant = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/restaurant/Menu/${RestaurantID}`);
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
            <Navbar bg="dark" variant="dark" class="navbar bg-dark">
                <Navbar.Brand href="/order">
                    <Button variant="secondary" className="menu-btn">...</Button> Dashers
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/order">Order</Nav.Link>
                    <Nav.Link href="/res">Restaurant</Nav.Link>
                </Nav>
            </Navbar>
            <div className="container mt-5">
                <h1 className="text-center mb-4">{restaurant.Name} Menu</h1>
                {Object.keys(restaurant).length > 0 ? (
                    <div>
                        <div className="image-container">
                            <p>rest</p>
                            <img src={restaurant[0].Image} alt={restaurant[0].Name} className="image" />
                        </div>
                        <h1 id="Title" className="text-left mt-3">{restaurant[0].Name}</h1>
                        <h4>
                            <p>Rating: {restaurant[0].Rating}</p>
                            <p>Popular Item: {restaurant[0].Popular_Item}</p>
                        </h4>
                        {// NEEDS TO BE DONE
                        }
                        {/* <div className="menu-items mt-4">
                            {restaurant.Menu && restaurant.Menu.length > 0 ? (
                                <div>
                                    {restaurant.Menu.map((menuItem, index) => (
                                        <Card key={index} className="mb-3">
                                            <Card.Body>
                                                <Card.Title>{menuItem.Name}</Card.Title>
                                                <Card.Text>
                                                    <p>{menuItem.Description}</p>
                                                    <p>Price: ${menuItem.Price}</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p>No menu items available.</p>
                            )}
                        </div> */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantDetail;