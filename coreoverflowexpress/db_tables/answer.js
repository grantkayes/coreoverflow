var params = {
    TableName : "Answer",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH"},
],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "N" },
],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

module.exports = params;
