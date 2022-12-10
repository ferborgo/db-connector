import { DynamoDB } from "aws-sdk";
import AWS = require("aws-sdk");
import { CreateTableInput } from "aws-sdk/clients/dynamodb";
import { Entity, Table } from "dynamodb-toolbox";
import { getClient } from "./client";
import { DynamoDBController } from "./dynamodb";

export const TableName = 'SimpleTwitterLocal';

export const setUpDynamoDB = async () => {

    AWS.config.update({
        region: 'us-east-1',
        accessKeyId: 'FAKE-ACCES-KEY'
    });

    console.log('Creating DynamoDB Table: ' + TableName)

    const client = getClient();

    client.createTable(tableConfig(), (err, data) => {
        // ResourceInUseException es porque ya exista la tabla
        if (err && err.code != 'ResourceInUseException') console.log('There has been an error: ', err);
        else console.log(data || 'Table already exists')
    });
}


function tableConfig(): CreateTableInput {
    const table: CreateTableInput = {
        TableName: TableName,
        AttributeDefinitions: [
            { AttributeName: 'pk', AttributeType: 'S' },
            { AttributeName: 'sk', AttributeType: 'S' }
        ],
        KeySchema: [
            { AttributeName: "pk", KeyType: "HASH" },
            { AttributeName: "sk", KeyType: "RANGE" }
        ],
        BillingMode: 'PAY_PER_REQUEST',
        GlobalSecondaryIndexes: [
            {
                IndexName: 'GSI1',
                KeySchema: [
                    { AttributeName: 'gsi1_pk', KeyType: 'S' },
                    { AttributeName: 'gsi1_sk', KeyType: 'S' }
                ],
                Projection: {
                    ProjectionType: 'ALL'
                }
            }
        ]
    }

    return table;
}