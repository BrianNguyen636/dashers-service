import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import './index.css'; // Import a CSS file for custom styles

const RestaurantPage = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sample list of restaurants
  const restaurants = [
    {
      id: 1,
      name: 'Delicious Bites',
      cuisine: 'Italian',
      imageUrl: 'https://example.com/delicious-bites.jpg',
    },
    {
      id: 2,
      name: 'Spicy Noodles',
      cuisine: 'Chinese',
      imageUrl: 'https://example.com/spicy-noodles.jpg',
    },
    // Add more restaurants as needed
  ];

  return (
    <div className={`d-flex ${navbarOpen ? 'toggled' : ''}`}>
      {/* Sidebar */}
      <Navbar
        bg="light"
        expand="lg"
        variant="light"
        className={`flex-column sidebar ${navbarOpen ? 'open' : ''}`}
      >
        <Navbar.Brand href="/">DoorDash</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleNavbarToggle} />
        <Navbar.Collapse id="basic-navbar-nav" className={navbarOpen ? 'show' : ''}>
          <Nav className="flex-column">
            {/* Add navigation links */}
            <Nav.Link href="https://www.google.com" target="_blank">Google</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content */}
      <div className="container-fluid mt-5 ml-5">
        <h1 className="text-center mb-4">Explore Restaurants</h1>
        <div className="row">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">Cuisine: {restaurant.cuisine}</p>
                  {/* You can add more information about the restaurant */}
                  {/* like ratings, delivery time, etc. */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
