var AWS = require("aws-sdk");
var tables = require("../db_tables");

AWS.config.update({
  region: "eu-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: 'myfakeaccessid',
  secretAccessKey: 'secret'
});

var dynamodb = new AWS.DynamoDB();

for (var key in tables) {
  var params = {
    TableName: tables[key].TableName
  }

  dynamodb.deleteTable(params, function(err, data) {
      if (err) {
          console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
      }
  });
}
