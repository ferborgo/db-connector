import { DynamoDB } from "aws-sdk";
import AWS = require("aws-sdk");
import { CreateTableInput } from "aws-sdk/clients/dynamodb";
import { Entity, Table } from "dynamodb-toolbox";
import { getClient } from "./client";

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
    })

    const DocumentClient = new DynamoDB.DocumentClient({
        endpoint: "http://localhost:8000",
        region: 'us-east-1'
    });

    const table = new Table({
        name: TableName,
        partitionKey: 'pk',
        sortKey: 'sk',

        DocumentClient
    });

    const UserEntity = new Entity({
        name: 'User',
        attributes: {
            pk: { partitionKey: true },
            sk: { hidden: true, sortKey: true },
            username: { type: 'string' }
        },
        table
    } as const);

    const user = {
        pk: 'USER#ferborgo',
        sk: 'USER#ferborgo',
        username: 'ferborgo'
    }

    try {
        console.log('Saving user with username ' + user.username)
        await UserEntity.put(user)
    } catch (error) {
        console.log('Error dynamo: ', error)
    }
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
        BillingMode: 'PAY_PER_REQUEST'
    }

    return table;
}