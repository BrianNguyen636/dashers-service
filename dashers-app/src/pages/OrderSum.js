import { useState, React, useEffect } from "react";
import { Navbar, Nav, Card, Button, Form, FormControl } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './OrderSum.css';
import HeaderBar from '../components/HeaderBar'

function OrderSum() {
    const { CustomerID } = useParams();
    const [customer, setCustomer] = useState([]);
    const [items, setItems] = useState([]);
    const [item, setItemDesc] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const [OrderID, setOrderID] = useState(null);
    const [appliedCoupon, setAppliedCoupon] = useState("");
    const [paymentInfo, setPayment] = useState({
        PaymentType: 'Credit-Card',
        CardNumber: '12345678910',
        CardExpiration: '3/30',
        CardSecurity: '343',
    });
    let orderID;
    useEffect(() => {
        const getItems = async () => {
            try {
                // first get customerID
                const status = "In-Progress";
                const orderExists = await axios.get(`http://localhost:4000/customer/${CustomerID}/orders?OrderStatus="${status}"`, {});
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
                const customerResponse = await axios.get(`http://localhost:4000/customer/${CustomerID}`);
                setCustomer(customerResponse.data[0]);
                const paymentResponse = await axios.get(`http://localhost:4000/customer/${customer.CustomerID}/payment`);
                const paymentData = paymentResponse.data[0] || {};
                setPayment({
                    PaymentType: paymentData.PaymentType || 'Credit-Card',
                    CardNumber: paymentData.CardNumber || '12345678910',
                    CardExpiration: paymentData.CardExpiration || '3/30',
                    CardSecurity: paymentData.CardSecurity || '343',
                });
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
                "CustomerID": customer.CustomerID,
                "DeliveryAddress": customer.PrimaryAddress,
                "PaymentStatus": paymentInfo.PaymentType,
                "OrderStatus": "Completed",
            };
            const response = await axios.put(`http://localhost:4000/orders/${OrderID}`, orderData);
            const couponBody = {
                'Name': customer.Name,
                'Email': customer.Email, 
            };
            const coupon = axios.post(`http://localhost:4000/coupons/mail`, couponBody);
            if (response.status === 200) {
                alert('Order placed successfully! Check your email for a coupon!');
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
                'ID': customer.CustomerID, //replace with actual customerID
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
            const response = await axios.delete(`http://localhost:4000/orders/${OrderID}/items/${itemId}`)
            window.location.reload();
        }
        catch (error) {
            console.error('Error deleting order item, try again', error);
            alert('Error deleting item from order');
        }
    };
    const [newPaymentInfo, setNewPaymentInfo] = useState({
        PaymentType: '',
        CardNumber: '',
        CardExpiration: '',
        CardSecurity: '',
    });
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleInputChange = (e) => {
        setNewPaymentInfo({
            ...newPaymentInfo,
            [e.target.name]: e.target.value,
        });
    };

    const editPayment = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/payment/${paymentInfo.PaymentID}`, newPaymentInfo);
            console.log('Payment updated successfully', response);
            setIsFormVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error editing payment, try again', error);
            alert('Error editing payment information');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editPayment();
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };
    return (
        <div>
            <HeaderBar CustomerID={CustomerID} />
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
                        <Link to={`/res/${CustomerID}`}>
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
                        <li>Customer Name: {customer.Name}</li>
                        <li>Delivery Address: {customer.PrimaryAddress}</li>
                        <li>Payment: {paymentInfo.PaymentType} <br></br> Card Number: {paymentInfo.CardNumber}
                            <br></br>CVV: {paymentInfo.CardSecurity} <br></br>EXP: {paymentInfo.CardExpiration}</li>
                    </ul>
                    <div>
                        <button className="btn btn-primary" onClick={toggleFormVisibility}>
                            {isFormVisible ? 'Cancel Edit' : 'Edit Payment'}
                        </button>
                        {isFormVisible && (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Payment Type:</label>
                                    <input
                                        type="text"
                                        name="PaymentType"
                                        value={newPaymentInfo.PaymentType}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Card Number:</label>
                                    <input
                                        type="text"
                                        name="CardNumber"
                                        value={newPaymentInfo.CardNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Card Expiration:</label>
                                    <input
                                        type="text"
                                        name="CardExpiration"
                                        value={newPaymentInfo.CardExpiration}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Card Security Code:</label>
                                    <input
                                        type="text"
                                        name="CardSecurity"
                                        value={newPaymentInfo.CardSecurity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button class="btn btn-primary" type="submit">Update Payment</button>
                            </form>
                        )}
                    </div>
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