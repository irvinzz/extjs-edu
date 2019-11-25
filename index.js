const express = require("express");
const request = require("request-then");
var bodyParser = require('body-parser')

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.post("/calculate-total", async (req, res) => {
    const items = req.body;
    let rates = {};
    try {
        rates = (await request({
            uri: "https://www.cbr-xml-daily.ru/daily_json.js",
            json: true
        })).body;
    } catch (e) {
        return res.status(500).json({
            msg: "Can't fetch rates"
        });
    };
    rates.Valute.RUB = {
        Value: 1,
    };
    const totalInRubles = items.map(item => rates.Valute[item.currency].Value * item.price * item.quantity).reduce((total, current) => total + current, 0);

    return res.json({
        RUB: totalInRubles,
        EUR: totalInRubles / rates.Valute.EUR.Value,
        USD: totalInRubles / rates.Valute.USD.Value,
    });

});

app.listen(3000);
