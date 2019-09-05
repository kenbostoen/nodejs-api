var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const employees = [];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req, res) => {
    res.status(200).json(
        employees
    )
});

app.get('/:id', (req, res) => {
    res.status(200).json(
        employees.find(x => x.id === req.params.id)
    )
});

app.post('/', (req, res) => {
    employees.push(req.body);
    res.status(200).json({
        message: 'ok'
    })
});

app.put('/:id', (req, res) => {
    employees[employees.indexOf(employees.find(x => x.id === req.params.id))] = req.body
    res.status(200).json({
        message: 'ok'
    })
});

app.delete('/:id', (req, res) => {
    employees = employees.splice(employees.indexOf(employees.find(x => x.id === req.params.id)), 1);
    res.status(200).json({
        message: 'ok'
    })
});
module.exports = app;
