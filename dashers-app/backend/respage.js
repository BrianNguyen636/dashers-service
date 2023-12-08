// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

// Sample restaurant data
const restaurants = [
  { id: 1, name: 'Delicious Bites' },
  { id: 2, name: 'Spicy Noodles' },
];

app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurantId = parseInt(req.params.id);
  const restaurant = restaurants.find(r => r.id === restaurantId);

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
