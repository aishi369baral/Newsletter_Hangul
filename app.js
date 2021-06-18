const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const { json } = require("body-parser");
require("dotenv").config();



const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const fname = req.body.num1;
    const lname = req.body.num2;
    const email = req.body.num3;
    const data = {
        members: [{
            status: "subscribed",

            email_address: email,

            merge_fields: {
                FNAME: fname,
                LNAME: lname,
            }


        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/c03045658d";
    const options = {
        method: "POST",
        auth: "aishi369baral@gmail.com:"+process.env.API_KEY
    };

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        }
        else {
            res.sendFile(__dirname+"/failure.html");
        }



        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function () {
    console.log("The Server Has Started on Port 3000.");
});




//list id: c03045658d