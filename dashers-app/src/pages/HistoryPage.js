import { useState, React, useEffect } from "react";
import { Navbar, Nav, Card, Button, Form, FormControl } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './HistoryPage.css';
import HeaderBar from '../components/HeaderBar'

function OrderSum() {
    const { CustomerID } = useParams();
    const [orders, setOrders] = useState([]);
    const [OrderID, setOrderID] = useState(null);
    const [items, setItems] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    useEffect(() => {
        const getOrders = async () => {
            try {
                // first get customerID
                // get orderid in progress associated with customerID, replace 0 with customerID
                const customerExists = await axios.get(`http://localhost:4000/customer/${CustomerID}/orders`, {});
                if (customerExists.data && customerExists.data.length > 0) {
                    const exists = customerExists.data;
                    setOrders(exists);
                    let orderID = exists[0].OrderID;
                    setOrderID(exists[0].OrderID);
                    // pick one eventually
                    // console.log(orderID);
                    // console.log(OrderID);

                    // // get item description for each item
                    // let itemDescriptions = [];
                    // for (const item of itemResponse.data) {
                    //     const itemDesc = await axios.get(`http://localhost:4000/items/${item.ItemID}`);
                    //     itemDescriptions.push(itemDesc.data);
                    // }
                    // let total = 0;
                    // itemDescriptions.forEach((itemDesc, index) => {
                    //     total += itemDesc[0].Price;
                    // });
                    // setItemDesc(itemDescriptions);
                    // setOrderTotal(total);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        getOrders();
    }, []);
    // const getItems = async(orderID) => {
    //     try {
    //         // get order items from orderid
    //         const itemResponse = await axios.get(`http://localhost:4000/orders/${orderID}/items`);
    //         setItems(itemResponse.data);
    //         console.log(items)
    //     } catch (error) {
    //         console.error('Error fetching items:', error);
    //     }
    // }

    return (
        <div>
            <HeaderBar CustomerID={CustomerID} />
            <br /><br />
            {/* Checkout screen */}
            <div className="card" id="orderSum">
                <br />
                <h1>Order History</h1>
                <hr />
                <div id="orderBody">

                    {orders.map((details) => (
                        <div key={details.OrderID}>

                            <b>Order Status:</b> {details.OrderStatus}
                            <br />
                            <b>Delivery Address:</b> {details.DeliveryAddress}
                            <br />
                            <b>Payment Status:</b> {details.PaymentStatus}

                            <Button
                                variant="danger"
                            //GO TO ORDER
                            // onClick={() => }
                            >See Order</Button>
                            <Button
                            //GO TO ORDER
                            // onClick={() => }
                            >Favorite</Button>
                            <br></br>
                            <hr></hr>
                        </div>
                    ))}

                    <Link to={`/res/${CustomerID}`}>
                        <button className="btn btn-primary">Return</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSum;