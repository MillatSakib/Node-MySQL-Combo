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


//get all data from a database table
app.get("/studentData", (req, res) => {
    //we can also specify which column I want to add by replacing * bu the column names
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


//Get a student by its roll number
app.get("/getstudentbyid/:id", async (req, res) => {
    try {
        const studentID = req.params.id;
        if (!studentID) {
            return res.status(404).send({
                success: false,
                message: "Invalid Student ID."
            })
        }

        con.query(`SELECT * FROM vugijugi.students WHERE Roll=` + studentID, (err, data) => {
            if (err) {
                console.log(`SELECT * FROM vugijugi.students WHERE Roll =` + studentID);
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
                data: data
            });
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: "Error in Get student by id API",
            error: e.message
        })
    }
})


//port 
const port = process.env.PORT;


//listen
app.listen(port, () => {
    console.log(`Server is running ${port}. Test at http://localhost:${port}/test`);
})


