import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './restaurantPage.css';
import { Navbar, Nav, Card, Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:4000/restaurant');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    getRestaurants();
  }, []);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
const filteredRestaurants = restaurants.filter((restaurant) =>
restaurant && restaurant.Name && restaurant.Name.toLowerCase().includes(searchTerm.toLowerCase())
);
const handleCardHover = (index) => {
  setHoveredCard(index);
};

const handleCardLeave = () => {
  setHoveredCard(null);
};

  // Navbar state
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="navbar bg-dark">
                <Navbar.Brand href="/home">
                    <Button variant="secondary" className="menu-btn">Dashers</Button> 
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/order">Order</Nav.Link>
                    <Nav.Link href="/res">Restaurant</Nav.Link>
                </Nav>
            </Navbar>

      <div className="container mt-5">
        <h1 className="text-center mb-4">Explore Restaurants</h1>
        <div>
          {/* search bar */}
        <Form className="mb-3">
          <FormControl
            type="text"
            placeholder="Search for a restaurant..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form>
        </div>
        <div className="row">
          {filteredRestaurants.map((restaurant, index) => (
            <div key={restaurant.RestaurantID} className="col-md-4 mb-4" onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}>
              <Link to={`/restaurant/detail/${restaurant.RestaurantID}` } style={{ textDecoration: 'none' }}>
              <Card className="custom-card">
                <Card.Img variant="top" src={restaurant.Image} className="card-image"/>
                <Card.Body>
                  <Card.Title>{restaurant.Name}</Card.Title>
                  {hoveredCard === index && (
                    <div className="blur-overlay">
                      <p className="view-menu-text">View Full Menu</p>
                    </div>
                  )}
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