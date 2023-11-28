import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Card, Button } from 'react-bootstrap';
import './restaurantPage.css'; // Import a CSS file for custom styles

const RestaurantPage = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  // Sample list of restaurants
  const restaurants = [
    {
      id: 1,
      name: 'Delicious Bites',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 2,
      name: 'Spicy Noodles',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 3,
      name: 'Tasty Pizza',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 4,
      name: 'Sushi Express',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 5,
      name: 'Burger Haven',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 6,
      name: 'Veggie Delight',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 7,
      name: 'Mediterranean Flavors',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 8,
      name: 'Sweet Treats',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 9,
      name: 'Coffee House',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
  ];

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
            <div key={restaurant.id} className="col-md-4 mb-4">
              <Card>
                <Card.Img variant="top" src={restaurant.imageUrl} />
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
