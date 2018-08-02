var AWS = require('aws-sdk');
var fs = require('fs');
var seedData = require('../seed_data');

require('dotenv').config();

AWS.config.update({
  region: process.env.DYNAMO_REGION,
  endpoint: process.env.DYNAMO_ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
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
    docClient.put(params, function(err, data) {
      if (err) {
        console.error(
          'Unable to add data to',
          table.name,
          'table. Error JSON:',
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log('PutItem succeeded:', dataPoint);
      }
    });
  });
});
