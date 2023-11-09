import {useState, React} from "react";
import './OrderSum.css';

function OrderSum() {
    let orderTotal
    const [items, setItem] = useState([]);
    items.push({
        name: "Test Item",
        price: 100
    });
    const [customer, setCustomer] = useState(
        {
            name: "John Doe",
            address: "Grove Street"
        }
    );

    return (
        <div id = "orderSum"> 
            <h1>Order Summary</h1>
            <hr/>
            <div id = "orderBody">
                <ul id = "itemsOrdered">
                    <li>{items[0].name}</li>
                    <ul>
                        <li>{items[0].price}</li>
                    </ul>
                </ul>
                <p>Order Total: {orderTotal}</p>
            </div>
            <hr/>
            <h1>Order Details</h1>
            <hr/>
            <div id = "orderDetails">
                <ul id = "detailList">
                    <li>Customer Name: {customer.name}</li>
                    <li>Delivery Address: {customer.address}</li>
                    <li>Payment: {}</li>
                    <li>Test:</li>
                </ul>
            </div>
            <button type = "button"> Place Order </button>
        </div>
    );
};

export default OrderSum;

//EXAMPLE
//setArtists( // Replace the state
//  [ // with a new array
//    ...artists, // that contains all the old items
//    { id: nextId++, name: name } // and one new item at the end
//  ]
//);