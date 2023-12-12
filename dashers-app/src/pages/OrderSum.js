import { useState, React, useEffect } from "react";
import { Navbar, Nav, Card, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './OrderSum.css';

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
                    console.log(orderID);
                    console.log(OrderID);
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
            console.log(orderID);
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
    //
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
                                >
                                    Delete
                                </Button></li>
                                <br></br></>
                        ))}

                    </ul>
                    <p>Order Total: ${orderTotal.toFixed(2)}</p>
                    <Link to="/res">
                        <button className="btn btn-primary">Edit Order</button>
                    </Link>
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