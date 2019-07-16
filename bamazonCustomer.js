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
      //  console.log(Object.values(res));

    
        var choiceArray = [];
        for (var i = 0; i < res.length; i++) {
          choiceArray.push(res[i].item_id);
        }
      
      



  inquirer.prompt([
     {
      type: "rawlist",
       name: "id",
       message: "What product would you like to buy?",
       choices: ["1", "2", '3', '4', '5', '6', '7', '8', '9', '10']
     
      },
     {
      type: "input",
       name: "quantity",
       message: "How many units of this stock quantity would you like to buy?"
     }
     ])
   .then(function(answers){
     return purchaseOrder(answers.id, answers.quantity);
   }).then(function(result){
    
    updateOrder(result.id, result.updatedStock, result.price,result.productName, result.totalCost);
   })
   .catch(function(err){
     console.log(err);
   });
  });
}

  function purchaseOrder(ID, amtNeeded){
    return new Promise(function(resolve, reject){
      connection.query('Select * FROM products WHERE ?', {items_id: ID}, function(err,res){
        console.log(res);
        if(err) throw err;
        if(amtNeeded <= res[0].stock){
          resolve({
            id: ID,
            totalCost: res[0].price * amtNeeded,
            updatedStock: res[0].stock - amtNeeded,
            price: res[0].price,
            productName: res[0].departments_name
          });
        } else{
          console.log("Insufficient quantity, sorry we do not have enough " + res[0].products_name + " to complete your order.");
          reject({
            error: 'you goofed'
          });
        }
      })
    });
  }

  function updateOrder(ID, updatedStock, price, productName, totalCost) {
 
      connection.query("UPDATE products SET stock = ? WHERE items_id = ?", [updatedStock, ID], function(err, res){
        // if(err) throw err;
        console.log(res);
           console.log("Good news your order is in stock!");
        console.log("Your total cost for " + productName + " is " + totalCost + " Thank you!");
       
      });
 
  }

