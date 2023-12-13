import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import axios from 'axios';
import HeaderBar from '../components/HeaderBar'

const RestaurantCard = ({ name, rating, popularItem, onClick }) => (
  <Card style={{ width: '18rem', marginBottom: '15px' }} onClick={onClick}>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Rating: {rating}/10</Card.Subtitle>
      <Card.Text>Popular Item: {popularItem}</Card.Text>
    </Card.Body>
  </Card>
);

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

export default function SimpleMap() {
  const { CustomerID } = useParams();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA_Edk5yCxAejsK0Xl7AdoGFEa0kHu4Q9s',
  });

  const defaultProps = {
    center: {
      lat: 47.2454,
      lng: -122.4385,
    },
    zoom: 11,
  };

  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultProps.center);
  const [zoom, setZoom] = useState(defaultProps.zoom);
  const [restaurants, setRestaurants] = useState([]);
  const [markers, setMarkers] = useState([]);

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
    const newMarkers = restaurants.map((restaurant) => ({
      id: restaurant.RestaurantID,
      lat: restaurant.lat,
      lng: restaurant.lng,
    }));
    setMarkers(newMarkers);
  }, []);
  const onMapLoad = (map) => {
    setMap(map);
  };

  const handleRestaurantClick = (lat, lng) => {
    setMapCenter({ lat, lng });
    setZoom(19);
  };

  return (
    <div>
      <HeaderBar CustomerID={CustomerID} />
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: 1 }}>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={zoom}
              onLoad={onMapLoad}
            >
              {markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  onClick={() => handleRestaurantClick(marker.lat, marker.lng)}
                />
              ))}
            </GoogleMap>
          )}

        </div>

        <div style={{ width: '300px', overflowY: 'auto', padding: '10px', backgroundColor: '#f8f9fa' }}>
          <h5>Restaurants</h5>
          {restaurants.map((restaurant) => (
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
