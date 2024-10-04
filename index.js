const express = require('express');

//rest object 
const app = express();

//middlewares

//routes
app.get("/test", (req, res) => {
    res.status(200).send("<h1>Nodejs Mysql server is running.</h1>")
})

//port 
const port = 8080


//listen
app.listen(port, () => {
    console.log(`Server is running " + port + ". Test at http://localhost:${port}/test`);
})