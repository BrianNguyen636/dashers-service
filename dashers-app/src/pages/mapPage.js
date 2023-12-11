import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const RestaurantCard = ({ name, rating, popularItem }) => (
  <Card style={{ width: '18rem', marginBottom: '15px' }}>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Rating: {rating}</Card.Subtitle>
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

  const restaurants = [
    { id: 1, name: 'Restaurant 1', rating: 4.5, popularItem: 'Pizza' },
    { id: 2, name: 'Restaurant 2', rating: 3.8, popularItem: 'Burger' },
  ];

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="navbar bg-dark">
        <Navbar.Brand href="/home">
          <Button variant="secondary" className="menu-btn">Dashers</Button>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/res">Restaurant</Nav.Link>
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
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>

        {/* Sidebar with restaurant cards */}
        <div style={{ width: '300px', overflowY: 'auto', padding: '10px', backgroundColor: '#f8f9fa' }}>
          <h5>Restaurants</h5>
          {restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              name={restaurant.name}
              rating={restaurant.rating}
              popularItem={restaurant.popularItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}