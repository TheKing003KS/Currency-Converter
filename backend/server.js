require('dotenv').config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const baseUrl = "http://data.fixer.io/api/";
const apiKey = process.env.API_KEY;
const rateUrl = baseUrl + "latest?access_key=" + apiKey;

app.get("/", function(req,res){

    http.get(baseUrl+"symbols?access_key="+apiKey, function(response){
        
        console.log("Status Code: ", response.statusCode);
        
        response.on("data", function(data){
            
            const obj = JSON.parse(data);
            const symbols = obj.symbols;

            var currencyArray = [];
            for(var currency in symbols){
                currencyArray.push(currency + " - " + symbols[currency]);
            }
            res.json(currencyArray);
        });

    }).on("error", err => console.log(err));

    console.log("Responded to Get Request on /");
});

app.post("/", function(req,res){

    const baseCurrency = req.body.baseCurrency;
    const targetCurrency = req.body.targetCurrency;

    const finalUrl = rateUrl + "&base=" + baseCurrency + "&symbols=" + targetCurrency;

    http.get(finalUrl, function(response){

        console.log("Status Code: ", response.statusCode);

        response.on("data", function(data){

            var obj = JSON.parse(data);
            obj = obj.rates;

            var exchangeRate = 0.0;
            for(var rate in obj){
                exchangeRate = obj[rate];
            }

            res.json(exchangeRate);
        });

    }).on("error", err => console.log(err));

    console.log("Responded to Post Request on /");
});

app.listen(4000, function() {
    console.log("Node Server started on port 4000");
});