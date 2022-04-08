const { handleRequest } = require("./handleRequest");
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const dynamoDBClient = new DynamoDBClient();

function parseEvent(event) {
    return { 
        'cookies': event?.cookies?.join(';')
    };
}

exports.handler = async (event, context) => {
    try {
        const params = parseEvent(event);
        return await handleRequest(params.cookies, dynamoDBClient);
    } catch (err) {
        console.debug(err);
        response = {
            'statusCode': 500
        }
        return response;
    }
};