// ----------------------------------------------
// TCSS 460: Autumn 2023
// Backend REST Service Module
// ----------------------------------------------
// Express is a Node.js web application framework
// that provides a wide range of APIs and methods
// Express API Reference:
// https://expressjs.com/en/resources/middleware/cors.html

// ----------------------------------------------
// retrieve necessary files (express and cors)
const express = require("express")
const cors = require("cors")
// retrieve the MySQL DB Configuration Module
const dbConnection = require("./config")
// use this library for parsing HTTP body requests
var bodyParser = require('body-parser');


// ----------------------------------------------
// (A)  Create an express application instance
//      and parses incoming requests with JSON
//      payloads
// ----------------------------------------------
var app = express(express.json);

// ----------------------------------------------
// (B)  Use the epxress cors middleware
//      Cross-origin resource sharing (CORS)
//      is a technique that restricts specified
//      resources within web page to be accessed
//      from other domains on which the origin
//      resource was initiated the HTTP request
//      Also use the bodyParser to parse in 
//      format the body of HTTP Requests
// ----------------------------------------------
app.use(cors());
app.use(bodyParser.json());
// ---------------------------------------------- 
// (1) Retrieve all records in population table 
// root URI: http://localhost:3001/ 
app.get('/restaurant', (request, response) => {
    const sqlQuery = "SELECT * FROM Restaurant;"
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
app.get('/restaurant/:RestaurantID', (request, response) => {
    const ID = request.params.RestaurantID;
    const sqlQuery = "SELECT Name, Rating, Popular_Item, Image FROM Restaurant WHERE RestaurantID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('RestaurantID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
app.get('/restaurant/Menu/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT Category, Name, Price, Calories FROM Items WHERE RestaurantID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
// ----------------------------------------
// ITEMS

// GET Item by ID
app.get('/items/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT * FROM items WHERE ItemID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
// GET all items from restaurantid
app.get('/restaurant/:ID/items', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT * FROM items WHERE RestaurantID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});

// GET all vegetarian items from restaurantid
app.get('/restaurant/:ID/items/vegetarian', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT * FROM items WHERE RestaurantID = '" + ID + "' and vegetarian = 1 ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
// GET all items from a certain category from restaurantid
app.get('/restaurant/:ID/:category', (request, response) => {
    const ID = request.params.ID;
    const category = request.params.category;
    const sqlQuery = "SELECT * FROM items WHERE RestaurantID = '" + ID + "' and category = '" + category + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
// ----------------------------------------------------------------
// CUSTOMERS

// GET information from customerID
app.get('/customer/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT * FROM customers WHERE CustomerID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
// ----------------------------------------------------------------
// COUPONS

// GET all available coupons
app.get('/coupons', (request, response) => {
    const sqlQuery = "SELECT * FROM coupons ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});
// GET coupon from it's ID
app.get('/coupons/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT * FROM coupons WHERE CouponID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
// GET coupons from a given restaurant
app.get('/coupons/restaurant/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT * FROM coupons WHERE RestaurantID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
// ----------------------------------------------------------------
// REVIEWS

// GET Reviews 
app.get('/review', (request, response) => {
    const sqlQuery = "SELECT * FROM reviews;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});
// GET Review by ID
app.get('/review/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT * FROM reviews WHERE ReviewID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
// GET Reviews from a given restaurant
app.get('/review/restaurant/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT * FROM reviews WHERE RestaurantID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});

// ----------------------------------------------------------------
// Orders

// GET Orders
app.get('/orders', (request, response) => {
    const sqlQuery = "SELECT * FROM orders";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});
// GET all Orders given CustomerID
// Retrieve the ID result with result[0].OrderID
app.get('/customer/orders/:ID', (request, response) => {
    const ID = request.params.ID;
    const query = request.query.OrderStatus;
    sqlQuery = "SELECT * FROM orders WHERE CustomerID = '" + ID + "' ";
    if (query != null) {
        sqlQuery += " AND OrderStatus = " + query
    }
    dbConnection.query(sqlQuery+";", (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        if (result.length > 0) response.setHeader('OrderID', result[0].OrderID);
        return response.status(200).json(result);
    });
});

// GET Order given ID
app.get('/orders/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT * FROM orders WHERE OrderID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});
//INSERT Order by CustomerID
app.post('/orders', (request, response) => {
    const sqlQuery = 'INSERT INTO Orders VALUES (?);';
    const values = [request.body.OrderID, request.body.CustomerID, request.body.DeliveryAddress, 
        request.body.PaymentStatus, request.body.OrderStatus];
    dbConnection.query(sqlQuery, [values], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not added."})
        }
        response.setHeader('Success', 'Record was added!'); // send a custom header attribute 
        return response.status(200).json({"ID":result.insertId});
    });
});
//UPDATE RECORD BY CustomerID
app.put('/orders/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = 'UPDATE Orders SET OrderID = ?, CustomerID = ?, DeliveryAddress = ?, PaymentStatus = ?, OrderStatus = ? WHERE OrderID = ? ;';
    const values = [request.body.OrderID, request.body.CustomerID, request.body.DeliveryAddress, 
        request.body.PaymentStatus, request.body.OrderStatus];

    dbConnection.query(sqlQuery, [...values, ID], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not updated."})
        }
        return response.status(200).json({Success: "Successful: Record was updated!"});
    });
});
//DELETE RECORD BY OrderID
app.delete('/orders/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "DELETE FROM orders WHERE OrderID = ? ; ";
    dbConnection.query(sqlQuery, ID, (err, result) => {
    if (err) {
        return response.status(400).json({ Error: "Failed: Record was not deleted" });
    }
        return response.status(200).json({ Success: "Succcessful: Record was deleted!" });
    });
});

// ----------------------------------------------------------------
// OrderItems
// GET OrderItems from ID
app.get('/orders/:ID/items', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "SELECT * FROM orderitems where OrderID = ?";
    dbConnection.query(sqlQuery, ID, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});
// POST Item into Order 
app.post('/orders/:ID/items', (request, response) => {
    const sqlQuery = 'INSERT INTO orderitems VALUES (?);';
    const values = [request.body.OrderID, request.body.ItemID, request.body.Quantity];
    dbConnection.query(sqlQuery, [values], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not added."})
        }
        return response.status(200).json({Success: "Successful: Record was added!"});
    });
});
// PUT Update Item in Order 
app.put('/orders/:ID/items/:ItemID', (request, response) => {
    const ID = request.params.ID;
    const ItemID = request.params.ItemID;
    const sqlQuery = 'UPDATE orderitems SET OrderID = ?, ItemID = ?, Quantity = ? WHERE OrderID = ? AND ItemID = ?;';

    const values = [request.body.OrderID, request.body.ItemID, request.body.Quantity];
    dbConnection.query(sqlQuery, [...values, ID, ItemID], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not updated."})
        }
        return response.status(200).json({Success: "Successful: Record was updated!"});
    });
});
//DELETE RECORD BY OrderID and ItemID
app.delete('/orders/:ID/items/:ItemID', (request, response) => {
    const ID = request.params.ID;
    const ItemID = request.params.ItemID;
    const sqlQuery = "DELETE FROM orderitems WHERE OrderID = ? AND ItemID = ? ; ";
    dbConnection.query(sqlQuery, [ID, ItemID], (err, result) => {
    if (err) {
        return response.status(400).json({ Error: "Failed: Record was not deleted" });
    }
        return response.status(200).json({ Success: "Succcessful: Record was deleted!" });
    });
});
// ----------------------------------------------
// Ref: https://expressjs.com/en/4x/api.html#app
// (C)  Create a server such that it binds and
//      listens on a specified host and port.
//      We will use default host and port 4000.
app.listen(4000, () => {
    console.log("Express server is running and listening");
});


