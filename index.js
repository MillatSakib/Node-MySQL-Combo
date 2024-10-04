const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
})

con.connect((err) => {
    if (err) {
        throw err;

    } else {
        console.log("Database Connected");
    }
})

//configure dotenv
dotenv.config();

//rest object 
const app = express();

//middleware
app.use(express.json());

//routes
app.get("/test", (req, res) => {
    con.query("CREATE DATABASE vugijugi", (err, result) => {
        if (err) console.log(err);
        res.status(200).send("<h1>Nodejs Mysql server is running.Also Created a database</h1>");
    })

})

//port 
const port = process.env.PORT;


//listen
app.listen(port, () => {
    console.log(`Server is running ${port}. Test at http://localhost:${port}/test`);
})


