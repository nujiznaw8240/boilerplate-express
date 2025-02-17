require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let app = express();
console.log("Hello World");

app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));

app.get("/json", (req, res) => {
    console.log(process.env.MESSAGE_STYLE);
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({
            "message": "HELLO JSON"
        });
    } else {
        res.json({
            "message": "Hello json"
        });
    }
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({time: req.time});
});

app.get("/:word/echo", function(req, res) {
    var word = req.params.word;
    console.log(word);
    res.json({echo: word});
});

app.route("/name").get(function(req, res) {
    var firstname = req.query.first;
    var lastname = req.query.last;
    res.json({name: firstname + ' ' + lastname});
}).post(function(req, res) {
    var firstname = req.body.first;
    var lastname = req.body.last;
    res.json({name: firstname + ' ' + lastname});
});







 module.exports = app;
