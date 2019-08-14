var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bmazon"
  });

  connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        //ids, names, and prices of products for sale
        console.log("id / product name / price");
        console.log("--------------------------");
        for(var i = 0; i < res.length; i++){
            console.log(res[i].item_id + " / " 
                        + res[i].product_name + " / "
                        + res[i].price);
        }
        console.log("--------------------------");
        console.log("-------------Purchase Menu--------------");
        inquirer.prompt([
            {
                name: "Id",
                message: "Item id? "
            },
            {
                name: "Qty",
                message: "How many?"
            }
        ]).then(function(response){
            console.log("----------------------------------------");
            for(var i = 0; i < res.length; i++){
                if (response.Id == res[i].item_id){
                    if (response.Qty > res[i].stock_quantity){
                        console.log("Insufficient Quantity! Try ordering less amount.");
                        connection.end();
                        return ;
                    }
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                    [res[i].stock_quantity - response.Qty, res[i].item_id], function(err){
                        if (err) throw err;
                        connection.end();
                    });
                    var totalPrice = res[i].price * response.Qty;
                    console.log("Order submitted. Your total is $" + totalPrice.toFixed(2) +". Thank you!");
                    return ;
                }
            }
            console.log("Item id not found");
            connection.end();
            return ;
        });
    });
  });