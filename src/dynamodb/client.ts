import { DynamoDB } from 'aws-sdk';
import AWS = require('aws-sdk');

let client = null;

export const getClient = (): DynamoDB => {
    if (client) return client
    client = new DynamoDB({
        endpoint: new AWS.Endpoint("http://localhost:8000")
    })

    return client
}