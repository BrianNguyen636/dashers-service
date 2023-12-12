import { useState, React, useEffect } from "react";
import { Navbar, Nav, Card, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './OrderSum.css';
import HeaderBar from '../components/HeaderBar'

function OrderSum() {
    const [customer, setCustomer] = useState(
        {
            name: "John Doe",
            address: "Grove Street"
        }
    );
    const [items, setItems] = useState([]);
    const [item, setItemDesc] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const [OrderID, setOrderID] = useState(null);
    const [appliedCoupon, setAppliedCoupon] = useState("");
    let orderID;

    useEffect(() => {
        const getItems = async () => {
            try {
                // first get customerID
                // get orderid in progress associated with customerID, replace 0 with customerID
                const status = "In-Progress";
                const orderExists = await axios.get(`http://localhost:4000/customer/0/orders?OrderStatus="${status}"`, {});
                if (orderExists.data && orderExists.data.length > 0) {
                    const exists = orderExists.data;
                    orderID = exists[0].OrderID;
                    setOrderID(exists[0].OrderID);
                    // pick one eventually
                    // console.log(orderID);
                    // console.log(OrderID);
                    // get order items from orderid
                    const itemResponse = await axios.get(`http://localhost:4000/orders/${orderID}/items`);
                    setItems(itemResponse.data);
                    // get item description for each item
                    let itemDescriptions = [];
                    for (const item of itemResponse.data) {
                        const itemDesc = await axios.get(`http://localhost:4000/items/${item.ItemID}`);
                        itemDescriptions.push(itemDesc.data);
                    }
                    let total = 0;
                    itemDescriptions.forEach((itemDesc, index) => {
                        total += itemDesc[0].Price;
                    });
                    setItemDesc(itemDescriptions);
                    setOrderTotal(total);
                }
            } catch (error) {
                console.error('Error fetching order items:', error);
            }
        };
        getItems();
    }, []);

    const placeOrder = async () => {
        try {
            const orderData = {
                'OrderID': OrderID,
                "CustomerID": 0,
                "DeliveryAddress": "3345",
                "PaymentStatus": "Credit-Card",
                "OrderStatus": "Completed",
            };
            const response = await axios.put(`http://localhost:4000/orders/${OrderID}`, orderData);

            if (response.status === 200) {
                alert('Order placed successfully!');
                window.location.reload();
            } else {
                alert('Failed to place the order. Please try again later.');
            }
        } catch (error) {
            console.error('Error placing the order:', error);
            alert('An error occurred while placing the order. Please try again later.');
        }
    };
    const makeOrderFavorite = async () => {
        try {
            const favoriteData = {
                'ID': 0, //replace with actual customerID
                'OrderID': OrderID,
            };
            // replace 1 with actual customerID
            const response = await axios.post(`http://localhost:4000/customer/1/orders/favorites/${OrderID}`, favoriteData);

            if (response.status === 200) {
                alert('Order marked as favorite successfully!');
            } else {
                alert('Failed to mark the order as a favorite. Please try again later.');
            }
        } catch (error) {
            console.error('Error marking the order as a favorite:', error);
            alert('An error occurred while marking the order as a favorite. Please try again later.');
        }
    };
    const handleCouponCodeChange = (event) => {
        setAppliedCoupon(event.target.value);
    };
    const applyCoupon = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/coupons?code="${appliedCoupon}"`);
            const discount = response.data[0].Discount;
            const id = response.data[0].ItemID;
            let isCoupon = false;
            for (let i = 0; i < items.length; i++) {
                if (items[i].ItemID == id) {
                    isCoupon = true;
                }
            }
            if (isCoupon) {
                if (orderTotal - discount <= 0) {
                    setOrderTotal(0);
                } else {
                    setOrderTotal(orderTotal - discount);
                }
            } else {
                alert('Coupon cannot be applied to this order');
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
            alert('An error occurred while applying coupon. Please try again later.');
        }
    };
    const handleDeleteItem = async (itemId) => {
        try {
            console.log(OrderID);
            const response = await axios.delete(`http://localhost:4000/orders/${OrderID}/items/${itemId}`)
            window.location.reload();
        }
        catch (error) {
            console.error('Error deleting order item, try again', error);
            alert('Error deleting item from order');
        }
        console.log("item deleted");
    };
    return (
        <div>
            <HeaderBar/>
            <br /><br />
            {/* Checkout screen */}
            <div className="card" id="orderSum">
                <br />
                <h1>Order Summary</h1>
                <hr />
                <div id="orderBody">
                    <ul id="itemsOrdered">
                        {item.map((itemDetails) => (
                            <><li key={itemDetails[0].ItemID}>{itemDetails[0].Name} <br></br>
                                <span style={{ marginRight: '50px' }}>${itemDetails[0].Price}</span>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteItem(itemDetails[0].ItemID)}
                                >Delete</Button></li>
                                <br></br></>
                        ))}

                    </ul>
                    <div><p id="total">Order Total: ${orderTotal.toFixed(2)}</p>
                    <Link to="/res">
                            <button type="button" className="btn btn-primary" id="edit">Edit Order</button>
                        </Link></div>
                    <br></br>
                    <div id="button-container">
                        <Form.Group controlId="couponCode">
                            <Form.Label>Coupon Code</Form.Label>
                            <FormControl
                                type="text"
                                placeholder="Enter coupon code"
                                value={appliedCoupon}
                                onChange={handleCouponCodeChange}
                            />
                        </Form.Group>
                        <button type="button" className="btn btn-primary" onClick={applyCoupon}>
                            Apply Coupon
                        </button>
                        <button type="button" className="btn btn-primary" onClick={makeOrderFavorite}>
                            Make Favorite
                        </button>                        
                    </div>

                </div>
                <hr />
                <h1>Order Details </h1>
                <hr />
                <div id="orderDetails">
                    <ul id="detailList">
                        <li>Customer Name: {customer.name}</li>
                        <li>Delivery Address: {customer.address}</li>
                        <li>Payment: { }</li>
                        <li>Test:</li>
                    </ul>
                    <button className="btn btn-primary">Edit Details</button>
                </div>
                <hr />

                <button type="button" className="btn btn-primary" onClick={placeOrder}>
                    Place Order
                </button><br />
            </div>
        </div>
    );
};

export default OrderSum;