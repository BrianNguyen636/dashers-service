// ----------------------------------------------
// retrieve necessary files (express and cors)
const express = require("express")
const cors = require("cors")
// retrieve the MySQL DB Configuration Module
const dbConnection = require("./config")
// use this library for parsing HTTP body requests
var bodyParser = require('body-parser');

var app = express(express.json); 

app.use(cors());
app.use(bodyParser.json());

// ----------------------------------------------
// Ref: https://expressjs.com/en/4x/api.html#app
// (C)  Create a server such that it binds and
//      listens on a specified host and port.
//      We will use default host and port 3000.
app.listen(3000, () => {
    console.log("Express server is running and listening");
}); 


// ----------------------------------------------
// insert a new record by Customers
// city URI: http://localhost:port/Customers
app.post('/Customers/', (request, response) => {
    const sqlQuery = 'INSERT INTO Customers VALUES (?);';
    const values = [request.body.CustomerID, request.body.name, request.body.PrimaryAddress, 
    request.body.PrimaryAddress, request.body.Email, request.body.Username, request.body.Password];
    dbConnection.query(sqlQuery, [values], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not added."});
        }
        return response.status(201).json({Success: "Successful: Record was added!."});
    });
});

//----------------------------------------------
// select from Customers using Username and Password
// login URI: http://localhost:port/Customers/login
app.post('/Customers/:login', (request, response) => {
    const { email, password } = request.body;
    const sqlQuery = "SELECT * FROM Customers WHERE Username = ? AND Password = ?";
    dbConnection.query(sqlQuery, [email, password], (err, result) => {
        if (err) {
            return response.status(500).json({ error: "Internal Server Error" });
        }
        if (result.length > 0) {
            return response.status(200).json({ success: "Login successful", user: result[0] });
        } else {
            return response.status(401).json({ error: "Invalid username or password" });
        }
    });
});