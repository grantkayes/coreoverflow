# Core Overflow

Stack Overflow-like question and answer application



## Setting and Starting DynamoDB (local)

To Start:

1. Download a zip folder of a local dynamodb
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html

2. Unzip the folder
3. cd into "dynamodb_local_latest" and run

`java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`

Note: Use the command above to start server

4. cd in the "coreoverflowexpress" folder

5. Run "yarn create-db"


## To start CoreOverflow

1. Run "yarn"

2. Run "yarn start"
