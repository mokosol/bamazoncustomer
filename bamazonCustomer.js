var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
 host: "localhost",

 // Your port; if not 3306
 port: 3306,

 // Your username
 user: "root",

 // Your password
 password: "Qoslaye23",
 // Database
 database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
 if (err) throw err;
 // run the start function after the connection is made to prompt the user
 start();
});

// function which prompts the user for what action they should take
function start() {
   connection.query("SELECT * FROM products", function(err, res) {
       if (err) throw err;
       console.table(res);
   })
   // function purchasePrompt(){
  inquirer.prompt([
     {
       name: "items_id",
       type: "input",
       message: "What product would you like to buy?"

     },
     {
       name: "quantity",
       type: "input",
       message: "How many units of this stock quantity would you like to buy?"
     }
     ])
   .then(function(answers){
       var quantityNeeded = answers.Quantity;
       var IDrequested = answers.ID;
       purchaseOrder(IDrequested, quantityNeeded);
   });
  };

  function purchaseOrder(ID, amtNeeded){
      connection.query('Select * FROM products WHERE items_id = ' + ID, function(err,res){
          if(err){console.log(err)};
          if(amtNeeded <= res[i].stock_quantity){
             // var totalCost = res[0].price * amtNeeded;
              console.log("Good news your order is in stock!");
              console.log("Your total cost for " + amtNeeded + " " +res[i].product_name + " is " + totalCost + " Thank you!");

              connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
          } else{
              console.log("Insufficient quantity, sorry we do not have enough " + res[i].product_name + "to complete your order.");
          };
       //    displayProducts();
      });
  };

