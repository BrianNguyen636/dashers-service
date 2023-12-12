import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './restaurantPage.css';
import { Navbar, Nav, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RestaurantDetail = () => {
    const { RestaurantID } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [menu, setMenu] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getRestaurant = async () => {
            try {
                const restaurantResponse = await axios.get(`http://localhost:4000/restaurant/${RestaurantID}`);
                setRestaurant(restaurantResponse.data);
                const menuResponse = await axios.get(`http://localhost:4000/restaurant/${RestaurantID}/items`);
                setMenu(menuResponse.data);
                const reviewsResponse = await axios.get(`http://localhost:4000/review/restaurant/${RestaurantID}`);
                setReviews(reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        };

        getRestaurant();
    }, []);

    // Function to handle adding an item to the cart
    const AddToCart = async (menuItem) => {
        try {
            // check if order exists
            // replace 0 with customerID
            // const param = {
            //     OrderStatus: 'In-Progress',
            // };
            const status = "In-Progress";
            const orderExists = await axios.get(`http://localhost:4000/customer/0/orders?OrderStatus="${status}"`, {
                // params: param,
            });
            let orderID;
            let orderItems;
            if (orderExists.data && orderExists.data.length > 0) {
                const exists = orderExists.data;
                orderID = exists[0].OrderID;
                console.log(orderID);
            } else {
                // no orders found
                console.log("No orders found");
                // creates new order
                const body = {
                    CustomerID: 0,
                    DeliveryAddress: "saddsa",
                    PaymentStatus: "sida",
                    OrderStatus: "In-Progress",
                };
                const orderResponse = await axios.post(`http://localhost:4000/orders`, body);
                const order = orderResponse.data;
                orderID = order.ID;
            }
            orderItems = {
                OrderID: orderID,
                ItemID: menuItem.ItemID,
                Quantity: 1,
            };
            // add order items to order
            const itemResponse = await axios.post(`http://localhost:4000/orders/${orderID}/items`, orderItems)
            console.log(`Added ${menuItem.Name} to the cart`);
        } catch (error) {
            console.error('Error adding to cart', error);
        }

    };

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

            <div className="container mt-5">
                <h1 className="text-center mb-4">{restaurant.Name} Menu</h1>
                {Object.keys(restaurant).length > 0 ? (
                    <div>
                        <div className="image-container">
                            <img src={restaurant[0].Image} alt={restaurant[0].Name} className="image" />
                        </div>
                        <h1 id="Title" className="text-left mt-3">{restaurant[0].Name}</h1>
                        <h4>
                            <p>Rating: {restaurant[0].Rating}</p>
                            <p>Popular Item: {restaurant[0].Popular_Item}</p>
                        </h4>
                        <div className="menu-items mt-4">
                            {menu && menu.length > 0 ? (
                                <Row xs={1} md={3} className="g-4">
                                    {menu.map((menuItem, index) => (
                                        <Col key={index}>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title>{menuItem.Name}</Card.Title>
                                                    <div>
                                                        <p>{menuItem.Category}</p>
                                                        <p>Price: ${menuItem.Price}</p>
                                                        <p>Calories: {menuItem.Calories}</p>
                                                    </div>
                                                    <Button variant="primary" onClick={() => AddToCart(menuItem)}>
                                                        Add to Cart
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <p>No menu items available.</p>
                            )}
                        </div>

                        <div className="customer-reviews mt-4">
                            <h2>Customer Reviews</h2>
                            {reviews.length > 0 ? (
                                <Row xs={1} md={3} className="g-4">
                                    {reviews.map((review, index) => (
                                        <Col key={index}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>{review.Name}:</Card.Title>
                                                    <div>{review.Rating}/5</div>
                                                    <br></br>
                                                    <div><p id="reviewText">Customer states:</p> {review.Body}</div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantDetail;