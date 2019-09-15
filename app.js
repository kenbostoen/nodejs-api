var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var employees = [];
var idcounter = 1;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


app.get('/', (req, res) => {
    console.log('GET: get all employees');

    res.status(200).json(
        employees
    )
});

app.get('/:id', (req, res) => {
    console.log('GET: get employee with id ' + req.params.id);

    res.status(200).json(
        employees.find(x => x.id + '' === req.params.id + '')
    )
});

app.post('/', (req, res) => {
    console.log('POST: adding employee');

    employees.push({ id: idcounter, ...req.body });
    idcounter++;
    res.status(200).json({
        message: 'ok'
    })
});

app.put('/:id', (req, res) => {
    console.log('PUT: editing employee');

    employees[employees.indexOf(employees.find(x => x.id === req.params.id))] = req.body
    res.status(200).json({
        message: 'ok'
    })
});

app.delete('/:id', (req, res) => {
    console.log('DELETE: deleting employee with id: ' + req.params.id)
    if (employees.length === 1) {
        employees = [];
    } else {
        employees.splice(
            employees.indexOf(employees.find(x => x.id + '' === req.params.id + '')),
            1);
    }

    res.status(200).json({
        message: 'ok'
    })
});

module.exports = app;
