var inquirer = require("inquirer");
var mysql = require("mysql");
require('dotenv').config();
var myPassword = process.env.PASSWORD;

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: myPassword,
    database: "bamazondb"
});

function productDisplay() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        console.log("This is Bamazon!");
        console.log("----------------");
        console.log("Here is what we have to offer...");
        console.log("--------------------------------");
        for (var i = 0; i < response.length; i++) {
            console.log("ID#: " + response[i].item_id + " || " + "Product: " + response[i].product_name + " || " + "Department: " + response[i].department_name + " || " + "Price: " + response[i].price + " || " + "Quantity: " + response[i].stock_quantity);
            console.log("--------------------------------------------------------------------------------------------");
        }
        startPrompt();
    });
};

productDisplay();

function startPrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Would You Like To Buy Something?",
        default: true
    }]).then(function (user) {
        if (user.confirm === true) {
            pickID();
        } else {
            console.log("If you change your mind, you know where to find us, ;)");
        }
    });
}

function pickID() {
    inquirer.prompt([{
        type: "input",
        name: "item_id",
        message: "Please enter the item ID number you would like to purchase...",
        validate: function (value) {
            if (isNaN(value) == false && parseInt(value) <= response.length && parseInt(value) > 0) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        type: "input",
        name: "stock_quantity",
        message: "How many would you like to purchase?",
        validate: function (value) {
            if (isNaN(value)) {
                return false;
            } else {
                return true;
            }
        }
    }
    ]).then(function(ans))
}



// node bamazonCustomer.js