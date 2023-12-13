import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './restaurantPage.css';
import { Navbar, Nav, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar'




const RestaurantDetail = () => {
    const { RestaurantID } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [menu, setMenu] = useState({});
    const [reviews, setReviews] = useState([]);
    const [filter, setFilter] = useState("All");
    const [customer, setCustomer] = useState([]);
    const [paymentInfo, setPayment] = useState([]);

    useEffect(() => {
        const getRestaurant = async () => {
            try {
                const restaurantResponse = await axios.get(`http://localhost:4000/restaurant/${RestaurantID}`);
                setRestaurant(restaurantResponse.data);
                const menuResponse = await axios.get(`http://localhost:4000/restaurant/${RestaurantID}/items`);
                setMenu(menuResponse.data);
                const reviewsResponse = await axios.get(`http://localhost:4000/review/restaurant/${RestaurantID}`);
                setReviews(reviewsResponse.data);
                const customerResponse = await axios.get(`http://localhost:4000/customer/0`);
                setCustomer(customerResponse.data[0]);
                const paymentResponse = await axios.get(`http://localhost:4000/customer/${customerResponse.data[0].CustomerID}/payment`);
                setPayment(paymentResponse.data[0]);
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
            const orderExists = await axios.get(`http://localhost:4000/customer/${customer.CustomerID}/orders?OrderStatus="${status}"`, {
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
                    CustomerID: customer.CustomerID,
                    DeliveryAddress: customer.PrimaryAddress,
                    PaymentStatus: paymentInfo.PaymentType,
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
    const handleFilter = async (filter) => {
        setFilter(filter)
        if (filter == "All") {
            const menuResponse = await axios.get(`http://localhost:4000/restaurant/${RestaurantID}/items`);
            setMenu(menuResponse.data);
        } else if (filter == "Vegetarian") {
            const menuResponse = await axios.get(`http://localhost:4000/restaurant/${RestaurantID}/items/vegetarian`);
            setMenu(menuResponse.data);
        } else {
            const menuResponse = await axios.get(`http://localhost:4000/restaurant/${RestaurantID}/${filter}`);
            setMenu(menuResponse.data);
        }
    }
    const [newReview, setNewReview] = useState({
        RestaurantID: RestaurantID,
        Name: '',
        Rating: '',
        Body: '',
    });

    const addReview = (event) => {
        const { name, value } = event.target;
        setNewReview({
            ...newReview,
            [name]: value,
        });
    };
    const submitReview = async (event) => {
        event.preventDefault();
        try {
            console.log(newReview);
            const response = await axios.post(`http://localhost:4000/review`, newReview);
            if (response.status === 200) {
                alert('Review submitted successfully!');
                setNewReview({
                    restaurantid: RestaurantID,
                    name: '',
                    rating: '',
                    body: '',
                });
                window.location.reload();
            } else {
                alert('Failed to submit the review. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting the review:', error);
            alert('An error occurred while submitting the review. Please try again later.');
        }
    };
    return (
        <div>
            <HeaderBar />
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
                        <hr />
                        <div className="btn-group">
                            <button className={filter === "All" ? ('btn btn-primary') : ('btn btn-secondary')}
                                onClick={() => handleFilter("All")}>
                                All
                            </button>
                            <button className={filter === "Entree" ? ('btn btn-primary') : ('btn btn-secondary')}
                                onClick={() => handleFilter("Entree")}>
                                Entree
                            </button>
                            <button className={filter === "Side" ? ('btn btn-primary') : ('btn btn-secondary')}
                                onClick={() => handleFilter("Side")}>
                                Sides
                            </button>
                            <button className={filter === "Drink" ? ('btn btn-primary') : ('btn btn-secondary')}
                                onClick={() => handleFilter("Drink")}>
                                Drink
                            </button>
                            <button className={filter === "Dessert" ? ('btn btn-primary') : ('btn btn-secondary')}
                                onClick={() => handleFilter("Dessert")}>
                                Dessert
                            </button>
                            <button className={filter === "Vegetarian" ? ('btn btn-primary') : ('btn btn-secondary')}
                                onClick={() => handleFilter("Vegetarian")}>
                                Vegetarian
                            </button>
                        </div>
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
                <div className="review-form mt-4">
                    <h2>Leave a Review</h2>
                    <form onSubmit={submitReview}>
                        <div className="mb-3">
                            <label htmlFor="reviewName" className="form-label">Name</label>
                            <input
                                type="text" className="form-control" id="reviewName" name="Name"
                                value={newReview.Name} onChange={addReview} required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reviewRating" className="form-label">Rating</label>
                            <input
                                type="number" className="form-control" id="reviewRating" name="Rating" value={newReview.Rating}
                                onChange={addReview} min="1" max="5" required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reviewBody" className="form-label">Review</label>
                            <textarea
                                className="form-control" id="reviewBody" name="Body" value={newReview.Body}
                                onChange={addReview} rows="4" required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail;