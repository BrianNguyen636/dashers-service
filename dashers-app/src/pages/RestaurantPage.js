import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './restaurantPage.css';
import { Navbar, Nav, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:4000/restaurant'); // Assuming your server endpoint is '/restaurants'
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    getRestaurants();
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
        <h1 className="text-center mb-4">Explore Restaurants</h1>
        <div className="row">
          {restaurants.map((restaurant) => (
            <div key={restaurant.ID} className="col-md-4 mb-4">
              <Link to={`/restaurant/detail/${restaurant.ID}` } style={{ textDecoration: 'none' }}>
              <Card className="custom-card">
                <Card.Img variant="top" src={restaurant.Image} className="card-image"/>
                <Card.Body>
                  <Card.Title>{restaurant.Name}</Card.Title>
                  <Card.Text>Review: {restaurant.Rating}/10</Card.Text>
                  <Card.Text>Popular items: {restaurant.Popular_Item}</Card.Text>
                </Card.Body>
              </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;