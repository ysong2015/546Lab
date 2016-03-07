// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var myData = require('./data.js');

// This package exports the function to create an express instance:
var app = express();

// Here we change our view engine from Jade (default) to EJS
app.set('view engine', 'ejs');

// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// This middleware will activate for every request we make to 
// any path starting with /assets;
// it will check the 'static' folder for matching files 
app.use('/assets', express.static('static'));

// check for hidden input with the tag _method
// browser sometimes cannot submit a PUT or DELETE request,
// so we can use middleware to change it before it hits our routes!
// I have programatically injected some code that will add a hidden input called _method
app.use(function (req, res, next) {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
});

// Setup your routes here!
app.post("/results/perMonthRetirementSavings", function (request, response) {
    try {
        var years = request.body.years;
        var perMonth = request.body.perMonth;
        var interestRate = request.body.interestRate;
        // var query = require('url').parse(request.url, true).query;
        // var years = query.years;
        // var perMonth = query.perMonth;
        // var interestRate = query.interestRate;

        var result = myData.retirementAmountIfSavingPerMonth(years, perMonth, interestRate);
        // if (!years || !perMonth || !interestRate || years < 0 || perMonth < 0 || interestRate < 0) {
        //     response.status(500).render('pages/error', { errorType: "Invaild parameter(s)", errorMessage: 'Please check your input.' });
        // }
        response.render('pages/results', { operationTitle: 'perMonthRetirementSavings', result: result });
    } catch (message) {
        response.status(500).render('pages/error', { errorType: "Issue loading question!", errorMessage: "message" });
    }
});

app.post("/results/investedAmount", function (request, response) {
    try {
        var years = request.body.years;
        var initial = request.body.initial;
        var interestRate = request.body.interestRate;
        var result = myData.investesAmountAfterSomeYears(years, initial, interestRate);
        
        response.render('pages/results', { operationTitle: 'investedAmount', result: result });
    } catch (message) {
        response.status(500).render('pages/error', { errorType: "Issue loading question!", errorMessage: message });
    }
});

app.post("/results/loanPayoff", function (request, response) {
    try {
        var monthlyAmount = request.body.monthlyAmount;
        var loanAmount = request.body.loanAmount;
        var interestRate = request.body.interestRate;
        var result = myData.monthsToPayOffLoan(monthlyAmount, loanAmount, interestRate);
        
        response.render('pages/results', { operationTitle: 'loanPayoff', result: result });
    } catch (message) {
        response.status(500).render('pages/error', { errorType: "Issue loading question!", errorMessage: message });
    }
});

app.get("/api/perMonthRetirementSavings", function (request, response) {

    var query = require('url').parse(request.url, true).query;
    var years = query.years;
    var perMonth = query.perMonth;
    var interestRate = query.interestRate;

    if (!years || !perMonth || !interestRate || years < 0 || perMonth < 0 || interestRate < 0) {
        throw "Invaild parameter(s). Please check your input.";
    }
    try {
        var result = myData.retirementAmountIfSavingPerMonth(years, perMonth, interestRate);
        response.json({ status: "success", message: result });
    } catch (e) {
        response.status(500).json({ status: "error", message: e });
    }
});

app.get("/api/investedAmount", function (request, response) {

    var query = require('url').parse(request.url, true).query;
    var years = query.years;
    var initial = query.initial;
    var interestRate = query.interestRate;

    if (!years || !initial || !interestRate || years < 0 || initial < 0 || interestRate < 0) {
        throw "Invaild parameter(s). Please check your input.";
    }
    try {
        var result = myData.investesAmountAfterSomeYears(years, initial, interestRate);
        response.json({ status: "success", message: result });
    } catch (e) {
        response.status(500).json({ status: "error", message: e });
    }
});

app.get("/api/loanPayoff", function (request, response) {

    var query = require('url').parse(request.url, true).query;
    var monthlyAmount = query.monthlyAmount;
    var loanAmount = query.loanAmount;
    var interestRate = query.interestRate;

    if (!monthlyAmount || !loanAmount || !interestRate || monthlyAmount < 0 || loanAmount < 0 || interestRate < 0) {
        throw "Invaild parameter(s). Please check your input.";
    }
    try {
        var result = myData.monthsToPayOffLoan(monthlyAmount, loanAmount, interestRate);
        response.json({ status: "success", message: result });
    } catch (e) {
        response.status(500).json({ status: "error", message: e });
    }
});

// app.get('*', function (request, response) {
//     response.send('URI Format: '
//     +'<br/>http://localhost:3000/api/perMonthRetirementSavings?years=NUMBER&perMonth=NUMBER&interestRate=NUMBER'
//     +'<br/>http://localhost:3000/api/investedAmount?years=NUMBER&initial=NUMBER&interestRate=NUMBER'
//     +'<br/>http://localhost:3000/api/loanPayoff?monthlyAmount=NUMBER&loanAmount=NUMBER&interestRate=NUMBER');
// });

app.get("/", function (request, response) { 
    // We have to pass a second parameter to specify the root directory
    // __dirname is a global variable representing the file directory you are currently in
    response.sendFile("./pages/index.html", { root: __dirname });
});


// We can now navigate to localhost:3000
app.listen(3000, function () {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
