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
const Mailjet = require('node-mailjet');
const { default: axios } = require("axios");

const publicKey = '9ce5976ce1de51d807a1af1f1e8ca173'
const privateKey = '3d3a497a878a811d28dc64d299b608e6'
const mailjet = Mailjet.apiConnect(
    publicKey,
    privateKey
);


const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Dashers App Web API",
            description: "API Documents for Dashers App Web Service",
            servers: ["https://localhost:4000"]
        }
    },
    apis: ["restaurant.js"]
};

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

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//FUNCTION FOR GENERIC GETS USING ID
function getID(ID, sqlQuery, response) {
    dbConnection.query(sqlQuery, ID, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
}
//FUNCTION FOR GENERIC DELETES USING ID
function deleteID(ID, sqlQuery, response) {
    dbConnection.query(sqlQuery, ID, (err, result) => {
    if (err) {
        return response.status(400).json({ Error: "Failed: Record was not deleted" });
    }
        return response.status(200).json({ Success: "Succcessful: Record was deleted!" });
    });
}
/**
 * @swagger
 * /restaurant:
 *  get:
 *      tags:
 *          - Restaurants
 *      description: Returns list of supported restaurants
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
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
/**
 * @swagger
 * /restaurant/{ID}:
 *  get:
 *      tags:
 *          - Restaurants
 *      description: Returns a given Restaurant by ID.
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the restaurant to be searched.
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
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
/**
 * @swagger
 * /restaurant/{ID}/items:
 *  get:
 *      tags:
 *          - Restaurants
 *      description: Returns the items from a Restaurant by ID.
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the restaurant to be searched.
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
app.get('/restaurant/:ID/items', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM items WHERE RestaurantID = ? ;", response);
});
/**
 * @swagger
 * /restaurant/{ID}/items/vegetarian:
 *  get:
 *      tags:
 *          - Restaurants
 *      description: Returns the vegetarian items of a given restaurant by ID.
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the restaurant to be searched.
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
app.get('/restaurant/:ID/items/vegetarian', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM items WHERE RestaurantID = ? and vegetarian = 1 ;", response);
});
/**
 * @swagger
 * /restaurant/{ID}/{category}:
 *  get:
 *      tags:
 *          - Restaurants
 *      description: Returns a items in a given category from a RestaurantID.
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the restaurant to be searched.
 *          - in: path
 *            name: category
 *            required: true
 *            description: Category to be searched (Entree, Side, Drink, Dessert).
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
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
// ----------------------------------------
// ITEMS

/**
 * @swagger
 * /items/{ID}/:
 *  get:
 *      tags:
 *          - Items
 *      description: Returns the items of a given ID.
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the item to be searched.
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
app.get('/items/:ID', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM items WHERE ItemID = ? ;", response);
});
// ----------------------------------------------------------------
// CUSTOMERS
/**
 * @swagger
 * /customer/{ID}:
 *  get:
 *      tags:
 *          - Customers
 *      description: Returns the Customer of a given ID.
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the Customer.
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
app.get('/customer/:ID', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM customers WHERE CustomerID = ? ;", response);
});
/**
 * @swagger
 * /customer:
 *  post:
 *      description: Create a new Customer profile
 *      tags:
 *          - Customers
 *      parameters:
 *          - in: body
 *            name: options
 *            schema:
 *                  type: object
 *                  properties:
 *                      Name:
 *                          type: string
 *                      PrimaryAddress:
 *                          type: string
 *                      SecondaryAddress:
 *                          type: string
 *                      Email:
 *                          type: string
 *                      Username:
 *                          type: string
 *                      Password:
 *                          type: string
 *      responses:
 *          '200':
 *               description: Record successfully added. ID in headers.
 *               headers:
 *                  ID:
 *                      type: integer
 *                      description: The newly created user ID.
 *          '400':
 *               description: Failed to add record, possibly incorrect fields.
 * 
 */
app.post('/customer', (request, response) => {
    const sqlQuery = 'INSERT INTO customers VALUES (?) ;';
    const values = [request.body.CustomerID, request.body.Name, request.body.PrimaryAddress, 
        request.body.SecondaryAddress, request.body.Email, request.body.Username, request.body.Password];
    dbConnection.query(sqlQuery, [values], (err, result) => {
        if (err) {
            console.log(err);
            return response.status(400).json({Error: "Failed: Record was not added."})
        }
        
        response.setHeader("ID", result.insertId); // send a custom header attribute 
        return response.status(200).json({'Success':'Record was added!'});
    });
});
/**
 * @swagger
 * /customer/{ID}:
 *  put:
 *      description: Updates a Customer profile given the ID
 *      tags:
 *          - Customers
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the Customer.
 *          - in: body
 *            name: options
 *            schema:
 *                  type: object
 *                  properties:
 *                      Name:
 *                          type: string
 *                      PrimaryAddress:
 *                          type: string
 *                      SecondaryAddress:
 *                          type: string
 *                      Email:
 *                          type: string
 *                      Username:
 *                          type: string
 *                      Password:
 *                          type: string
 *      responses:
 *          '200':
 *               description: Success
 *          '400':
 *               description: Failed to update record, possibly incorrect fields.
 * 
 */
// PUT update Customer
app.put('/customer/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = 'UPDATE customers SET Name = ?, PrimaryAddress = ?, SecondaryAddress = ?, Email = ?, Username = ?, Password = ? WHERE CustomerID = ?; ';
    const values = [request.body.Name, request.body.PrimaryAddress, 
        request.body.SecondaryAddress, request.body.Email, request.body.Username, request.body.Password];
    dbConnection.query(sqlQuery, [...values, ID], (err, result) => {
        if (err) {
            console.log(err);
            return response.status(400).json({Error: "Failed: Record was not Updated."})
        }
        return response.status(200).json({'Success': 'Record was Updated!'});
    });
});
/**
 * @swagger
 * /customer/{ID}:
 *  delete:
 *      tags:
 *          - Customers
 *      description: Deletes the Customer of a given ID.
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the Customer.
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
app.delete('/customer/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = "DELETE FROM customers WHERE CustomerID = '" + ID + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not deleted" });
        }
            return response.status(200).json({ Success: "Succcessful: Record was deleted!" });
    });
});
// ----------------------------------------------------------------
// Orders

/**
 * @swagger
 * /orders:
 *  get:
 *      tags:
 *          - Orders
 *      description: Returns every order.
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
app.get('/orders', (request, response) => {
    const sqlQuery = "SELECT * FROM orders";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});
/**
 * @swagger
 * /orders/{ID}:
 *  get:
 *      tags:
 *          - Orders
 *      description: Returns the Order of a given ID.
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the Order to be searched.
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
app.get('/orders/:ID', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM orders WHERE OrderID = ? ;", response);
});
// Retrieve the ID result with result[0].OrderID
/**
 * @swagger
 * /customer/{ID}/orders:
 *  get:
 *      tags:
 *          - Customers
 *      description: Returns the orders made by a given Customer by ID
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the Customer.
 *          - in: query
 *            name: OrderStatus
 *            required: false
 *            description: Allows search of a specific order status.
 *      responses:
 *          '200':
 *               description: Success
 *               headers:
 *                  OrderID:
 *                      type: integer
 *                      description: The ID of the first order returned by the query
 * 
 */
app.get('/customer/:ID/orders', (request, response) => {
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

/**
 * @swagger
 * /customer/{ID}/orders:
 *  get:
 *      tags:
 *          - Customers
 *      description: Returns the orders made by a given Customer by ID
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the Customer.
 *          - in: query
 *            name: OrderStatus
 *            required: false
 *            description: Allows search of a specific order status.
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
app.get('/orders/:ID', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM orders WHERE OrderID = ? ;", response);
});
/**
 * @swagger
 * /orders:
 *  post:
 *      description: Create a new Order
 *      tags:
 *          - Orders
 *      parameters:
 *          - in: body
 *            name: options
 *            schema:
 *                  type: object
 *                  properties:
 *                      CustomerID:
 *                          type: integer
 *                      DeliveryAddress:
 *                          type: string
 *                      PaymentStatus:
 *                          type: string
 *                      OrderStatus:
 *                          type: string
 *      responses:
 *          '200':
 *               description: Successfully added new Order record. ID in header.
 *               headers:
 *                  ID:
 *                      type: integer
 *                      description: The newly created Order ID.
 *          '400':
 *               description: Failed to add record, possibly incorrect fields or missing CustomerID.
 * 
 */
app.post('/orders', (request, response) => {
    const sqlQuery = 'INSERT INTO Orders VALUES (?);';
    const values = [request.body.OrderID, request.body.CustomerID, request.body.DeliveryAddress, 
        request.body.PaymentStatus, request.body.OrderStatus];
    dbConnection.query(sqlQuery, [values], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not added."})
        }
        response.setHeader("ID", result.insertId); // send a custom header attribute 
        return response.status(200).json({'Success':'Record was added!'});
    });
});
/**
 * @swagger
 * /orders/{ID}:
 *  put:
 *      description: Updates an existing Order by ID
 *      tags:
 *          - Orders
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the Order.
 *          - in: body
 *            name: options
 *            schema:
 *                  type: object
 *                  properties:
 *                      DeliveryAddress:
 *                          type: string
 *                      PaymentStatus:
 *                          type: string
 *                      OrderStatus:
 *                          type: string
 *      responses:
 *          '200':
 *               description: Success
 *          '400':
 *               description: Failed to add record, possibly incorrect fields.
 * 
 */
app.put('/orders/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = 'UPDATE Orders SET DeliveryAddress = ?, PaymentStatus = ?, OrderStatus = ? WHERE OrderID = ? ;';
    const values = [request.body.DeliveryAddress, 
        request.body.PaymentStatus, request.body.OrderStatus];

    dbConnection.query(sqlQuery, [...values, ID], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not updated."})
        }
        return response.status(200).json({Success: "Successful: Record was updated!"});
    });
});
/**
 * @swagger
 * /orders/{ID}:
 *  delete:
 *      tags:
 *          - Orders
 *      description: Deletes the Order of a given ID.
 *      parameters:
 *          - in: path
 *            name: ID
 *            required: true
 *            description: The ID of the Order.
 *      responses:
 *          '200':
 *               description: Success
 * 
 */
app.delete('/orders/:ID', (request, response) => {
    return deleteID(request.params.ID, "DELETE FROM orders WHERE OrderID = ? ; ", response);
});

// ----------------------------------------------------------------
// OrderItems
// GET OrderItems from ID
app.get('/orders/:ID/items', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM orderitems where OrderID = ?", response);
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
    return deleteID([request.params.ID, request.params.ItemID], "DELETE FROM orderitems WHERE OrderID = ? AND ItemID = ? ; ", response);
});
// ------------------------------------------------------------------
// FAVORITED ORDERS

// GET all Favorited Orders given CustomerID
app.get('/customer/:ID/orders/favorites', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM favorders WHERE CustomerID = ?; ", response);
});
//INSERT FavOrder by CustomerID and OrderID
app.post('/customer/:ID/orders/favorites/:OrderID', (request, response) => {
    const values = [request.params.ID,request.params.OrderID]
    const sqlQuery = 'INSERT INTO favorders VALUES (?);';
    dbConnection.query(sqlQuery,[values], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not added."})
        }
        return response.status(200).json({Success:"Record was added!"});
    });
});
//DELETE RECORD BY CustomerID and OrderID
app.delete('/customer/:ID/orders/favorites/:OrderID', (request, response) => {
    return deleteID([request.params.ID,request.params.OrderID], "DELETE FROM favorders WHERE CustomerID = ? AND OrderID = ? ; ", response);
});
// -----------------------------------------------------
// PaymentInfo

// GET all payment given a customer ID.
app.get('/customer/:ID/payment', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM paymentinfo WHERE CustomerID = ? ; ", response);
});
// GET a payment given a paymentID.
app.get('/payment/:ID', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM paymentinfo WHERE PaymentID = ? ; ", response);
});
//INSERT Payment
app.post('/payment', (request, response) => {
    const values = [request.body.PaymentID, request.body.CustomerID, request.body.PaymentType, request.body.CardNumber,
        request.body.CardExpiration, request.body.CardSecurity];
    const sqlQuery = 'INSERT INTO PaymentInfo VALUES (?);';
    dbConnection.query(sqlQuery,[values], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not added."})
        }
        response.setHeader("ID", result.insertId)
        return response.status(200).json({Success:"Record was added!"});
    });
});
//UPDATE RECORD BY PaymentID
app.put('/payment/:ID', (request, response) => {
    const ID = request.params.ID;
    const sqlQuery = 'UPDATE PaymentInfo SET PaymentType = ?, CardNumber = ?, CardExpiration = ?, CardSecurity = ? WHERE PaymentID = ? ;';
    const values = [request.body.PaymentType, request.body.CardNumber, request.body.CardExpiration, 
        request.body.CardSecurity];
    dbConnection.query(sqlQuery, [...values, ID], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not updated."})
        }
        return response.status(200).json({Success: "Successful: Record was updated!"});
    });
});
//DELETE RECORD BY paymentID
app.delete('/payment/:ID', (request, response) => {
    return deleteID(request.params.ID, "DELETE FROM paymentinfo WHERE PaymentID = ? ; ", response);
});
// ----------------------------------------------------------------
// COUPONS

// GET all available coupons
// Query for certain coupon given code.
app.get('/coupons', (request, response) => {
    const code = request.query.code;
    sqlQuery = "SELECT * FROM coupons ";
    if (code != null) {
        sqlQuery += "WHERE Code = " + code
    }
    dbConnection.query(sqlQuery+";", (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});

// GET coupons from a given restaurant
app.get('/coupons/restaurant/:ID', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM coupons WHERE RestaurantID = ? ;", response);
});
// GET count of coupons
app.get('/coupons/count', (request, response) => {
    const sqlQuery = "SELECT count(couponID) as Count FROM coupons;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});
// GET random coupon
app.get('/coupons/random', async (request, response) => {
    const count = await axios.get(`http://localhost:4000/coupons/count`);
    const ID = Math.floor(Math.random() * count.data[0].Count );
    const sqlQuery = "SELECT * FROM coupons where CouponID = " + ID + ";";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: err });
        }
        return response.status(200).json(result);
    });
});
//GET random coupon code using the Mailjet service to the given Email and Name in the json body.
app.get('/coupons/mail', async (request, response) => {
    const name = request.body.Name;
    const email = request.body.Email;
    if (name == null || email == null) {
        return response.status(400).json({Error:"Please provide Name and Email fields in body"});
    }
    const random = await axios.get(`http://localhost:4000/coupons/random`);
    const code = random.data[0].Code;
    const restaurantID = random.data[0].RestaurantID;
    const restaurant = await axios.get(`http://localhost:4000/restaurant/` + restaurantID);
    const restaurantName = restaurant.data[0].Name
    const itemID = random.data[0].ItemID;
    const item = await axios.get(`http://localhost:4000/items/` + itemID);
    const itemName = item.data[0].Name
    const discount = random.data[0].Discount;
    const req = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: "bnguye1@uw.edu",
                Name: "Dashers-Service"
              },
              To: [
                {
                  Email: email,
                  Name: name
                }
              ],
              Subject: "Coupon Code from the Dashers app!",
              TextPart: "Get " + discount + "% off " + itemName + " from " + restaurantName + "!\n\nCoupon Code: " + code + "\nHappy Dashing!"
            }
          ]
        })

    req.catch((err) => {
            console.log(err.statusCode)
            return response.status(400).json({Error: err});
        })
    return response.status(200).json({Success: "Check your email!"});
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
    return getID(request.params.ID, "SELECT * FROM reviews WHERE ReviewID = ? ;", response);
});
// GET Reviews from a given restaurant
app.get('/review/restaurant/:ID', (request, response) => {
    return getID(request.params.ID, "SELECT * FROM reviews WHERE RestaurantID = ? ;", response);
});

// POST Review
app.post('/review/restaurant/', (request, response) => {
    const sqlQuery = 'INSERT INTO reviews VALUES (?);';
    const values = [request.body.ReviewID, request.body.RestaurantID, request.body.Name, 
        request.body.Rating, request.body.Body];
    dbConnection.query(sqlQuery, [values], (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not added."})
        }
        response.setHeader('Success', 'Record was added!'); // send a custom header attribute 
        return response.status(200).json({"ID":result.insertId});
    });
});
// DELETE Review by ID
app.delete('/review/:ID', (request, response) => {
    return deleteID(request.params.ID, "DELETE FROM reviews WHERE ReviewID = ? ;", response);
});



// ----------------------------------------------
// Ref: https://expressjs.com/en/4x/api.html#app
// (C)  Create a server such that it binds and
//      listens on a specified host and port.
//      We will use default host and port 4000.
app.listen(4000, () => {
    console.log("Express server is running and listening");
});


