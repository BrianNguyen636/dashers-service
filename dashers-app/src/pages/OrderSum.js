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
        <div> 
            <div class = "navbar bg-dark">
                <h1 style={{color:"white", paddingLeft:"20px"}}> <button class = "btn btn-secondary">...</button>  Dashers</h1>
            </div>
            <br/><br/>
            <div class = "card" id = "orderSum">
                <br/>
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
                    <button class = "btn btn-primary">Edit Order</button>
                </div>
                <hr/>
                <h1>Order Details </h1>
                <hr/>
                <div id = "orderDetails">
                    <ul id = "detailList">
                        <li>Customer Name: {customer.name}</li>
                        <li>Delivery Address: {customer.address}</li>
                        <li>Payment: {}</li>
                        <li>Test:</li>
                    </ul>
                    <button class = "btn btn-primary">Edit Details</button>
                </div>
                <hr/>
            
                <button type = "button" class = "btn btn-primary"> Place Order </button>
                <br/>
            </div>
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