import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const Marker = ({ lat, lng }) => {
  const openDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(directionsUrl, '_blank');
  };
  return (
    <div onClick={openDirections} style={{ cursor: 'pointer', fontSize: '30px', color: 'red' }}>
      📍
    </div>
  );
};

const RestaurantCard = ({ name, rating, popularItem, onClick }) => (
  <Card style={{ width: '18rem', marginBottom: '15px' }} onClick={onClick}>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Rating: {rating}/10</Card.Subtitle>
      <Card.Text>Popular Item: {popularItem}</Card.Text>
    </Card.Body>
  </Card>
);

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 47.2454,
      lng: -122.4385
    },
    zoom: 11
  };
  const [mapCenter, setMapCenter] = useState(defaultProps.center);
  const [zoom, setZoom] = useState(defaultProps.zoom);
  // const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  // handle restaurant card click
  const handleRestaurantClick = (lat, lng) => {
    setMapCenter({ lat, lng });
    setZoom(15);
  };
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:4000/restaurant');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="navbar bg-dark">
        <Navbar.Brand href="/home">
          <Button variant="secondary" className="menu-btn">Dashers</Button>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/res">Restaurant</Nav.Link>
          <Nav.Link href="/map">Map</Nav.Link>
        </Nav>

        {/* shopping cart button */}
        <Link to="/order" className="ms-auto">
          <Button variant="primary">Shopping Cart</Button>
        </Link>
      </Navbar>

      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Map */}
        <div style={{ flex: 1 }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyA_Edk5yCxAejsK0Xl7AdoGFEa0kHu4Q9s" }}
            center={mapCenter}
            zoom={zoom}
          >
            <Marker lat={mapCenter.lat} lng={mapCenter.lng} />

          </GoogleMapReact>
        </div>

        {/* Sidebar with restaurant cards */}
        <div style={{ width: '300px', overflowY: 'auto', padding: '10px', backgroundColor: '#f8f9fa' }}>
          <h5>Restaurants</h5>
          {restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.RestaurantID}
              name={restaurant.Name}
              rating={restaurant.Rating}
              popularItem={restaurant.Popular_Item}
              onClick={() => handleRestaurantClick(restaurant.lat, restaurant.lng)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}