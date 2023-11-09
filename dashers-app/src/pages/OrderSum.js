import {useState, React} from "react";
import './OrderSum.css';

function OrderSum() {

    let orderTotal
    let item = "test item"
    let detail = "detail"
    // const [item, setItem] = useState([
    //     ...item,
    //     {
    //         name: "TestItem",
    //         price: 100.00
    //     }
    // ]);


    return (
        <div id = "orderSum"> 
            <h1>Order Summary</h1>
            <hr/>
            <div id = "orderBody">
                <ul id = "itemsOrdered">
                    <li>{item}</li>
                    <ul>
                        <li>{detail}</li>
                    </ul>
                </ul>
                <p>Order Total: {orderTotal}</p>
            </div>
            <hr/>
            <h1>Order Details</h1>
            <hr/>
            <div id = "orderDetails">
                <ul id = "detailList">
                    <li>Customer Name: {item}</li>
                    <li>Delivery Address: {item}</li>
                    <li>Payment: {item}</li>
                    <li>Test:</li>
                </ul>
            </div>
            <button type = "button"> Place Order </button>
        </div>
    );
};

export default OrderSum;