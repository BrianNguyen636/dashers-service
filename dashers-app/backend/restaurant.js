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
    console.log(ID);
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
    const sqlQuery = "SELECT Name FROM ITEMS WHERE RestaurantID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('ID', ID); // send a custom header attribute 
        return response.status(200).json(result);
    });
});
// ----------------------------------------
// Retrieve items from restaurant
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

// ----------------------------------------------
// Ref: https://expressjs.com/en/4x/api.html#app
// (C)  Create a server such that it binds and
//      listens on a specified host and port.
//      We will use default host and port 4000.
app.listen(4000, () => {
    console.log("Express server is running and listening");
});


