var AWS = require('aws-sdk');
var tables = require('../db_tables');

require('dotenv').config();

AWS.config.update({
  region: process.env.DYNAMO_REGION,

  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

var dynamodb = new AWS.DynamoDB();

for (var key in tables) {
  var params = {
    TableName: tables[key].TableName
  };

  dynamodb.deleteTable(params, function(err, data) {
    if (err) {
      console.error(
        'Unable to delete table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        'Deleted table. Table description JSON:',
        JSON.stringify(data, null, 2)
      );
    }
  });
}
