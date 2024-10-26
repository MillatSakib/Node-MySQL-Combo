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

app.get("/studentData", (req, res) => {
    con.query("SELECT * FROM vugijugi.students", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                success: false,
                message: "An error occurred while fetching data"
            });
        }

        if (data.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No records found"
            });
        }

        res.status(200).send({
            success: true,
            message: "All Students records",
            totalStudents: data.length,
            data: data
        });
    });
});


//port 
const port = process.env.PORT;


//listen
app.listen(port, () => {
    console.log(`Server is running ${port}. Test at http://localhost:${port}/test`);
})


