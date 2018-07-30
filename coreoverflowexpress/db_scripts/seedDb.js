var AWS = require("aws-sdk");
var fs = require('fs');
var seedData = require('../seed_data');

AWS.config.update({
    region: "eu-west-2",
    endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();

// var cars = JSON.parse(fs.readFileSync('carData.json', 'utf8'));
seedData.forEach(function(table) {
  var data = table.data;

  data.forEach(function(dataPoint) {
    var params = {
      TableName: table.name,
      Item: dataPoint
    };
    console.log(params)
  docClient.put(params, function(err, data) {
         if (err) {
             console.error("Unable to add data to", table.name, "table. Error JSON:", JSON.stringify(err, null, 2));
         } else {
             console.log("PutItem succeeded:", dataPoint);
         }
      });
  })
});
