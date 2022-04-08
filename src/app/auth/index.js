const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { handleRequest } = require("./handleRequest");

const dynamoDBClient = new DynamoDBClient();

function parseEvent(event) {
    return { 
        'cookies': event?.cookies?.join(';'),
        'code': event?.queryStringParameters?.code
    };
}

exports.handler = async (event, context) => {
    try {
        console.debug(JSON.stringify(event));
        const params = parseEvent(event);
        return await handleRequest(params.cookies, params.code, dynamoDBClient);
    } catch (err) {
        console.debug(err);
        response = {
            'statusCode': 500
        }
        return response;
    }
};