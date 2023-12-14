RUNNING THE PROJECT:

Before running, one must install the neccessary react dependencies to the /dashers-app directory.

cd dashers-app
npm install --save react react-dom react-router-dom react-scripts react-bootstrap axios google-map-react react-google-maps/api

The dependencies for the backend are already included in the backend folder inside /dashers-app

Import dashers.sql to a local database server, and change the credentials in /dashers-app/backend/config.js to match your user.

While in the backend directory, run:

npm start

Swagger documentation can be found at localhost:4000/docs
Open another terminal to the /dashers-app directory and run:

npm start

You can login to the service without registering by using the test account:
username: testuser
password: testpassword