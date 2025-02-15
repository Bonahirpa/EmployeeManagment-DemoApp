// Import the express module
const express = require("express");
// Import the mysql module
const mysql = require("mysql2");
// Create the express app
const app = express();
// Define the connection parameters for the database
const dbConfig = {
  connectionLimit: 10,
  password: "demoapp",
  user: "demoapp",
  host: "127.0.0.1",
  database: "demoapp",
};
// Create the connection to the database
const connection = mysql.createConnection(dbConfig);
// Connect to the database
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
// Use the express.json() middleware to parse the request body
app.use(express.json());
// Create a simple get request handler to send a response back
app.get("/", (req, res) => {
  res.send("Testing!");
});
// Allow CORS to all
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// Post request handler to add a new employee to the database
app.post("/add-employee", (req, res) => {
  // console.log(req.body);
  // Write the sql query to add to the database table named demoapp
  const sql = `INSERT INTO demoapp (first_name, last_name, email, password) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`;
  // Execute the query
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  // Send a response back to the client
  const response = {
    status: "success",
    message: "Employee added succesfully",
  };
  res.status(200).json(response);
});

// Post request handler for login with path /login
app.post("/login", (req, res) => {
  // Write the sql query to get the employee from the database table named demoapp
  const sql = `SELECT * FROM demoapp WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
  // Execute the query
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      const response = {
        status: "success",
        message: "Login successful",
      };
      res.status(200).json(response);
    } else {
      const response = {
        status: "error",
        message: "Invalid email or password",
      };
      res.status(200).json(response);
    }
  });
});     
// Set up the port to listen to 
const port = 5500;
// Set up the listener 
app.listen(port, () => console.log(`Listening on port ${port}`));

