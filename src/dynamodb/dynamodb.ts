import { TableName } from "./set-up";
import { DynamoDB } from "aws-sdk";
import AWS = require("aws-sdk");
import { CreateTableInput } from "aws-sdk/clients/dynamodb";
import { Entity, Table } from "dynamodb-toolbox";
import { getClient } from "./client";

const DocumentClient = new DynamoDB.DocumentClient({
    endpoint: "http://localhost:8000",
    region: 'us-east-1'
});

export class DynamoDBController {

    private static instance: DynamoDBController;

    static table = new Table({
        name: TableName,
        partitionKey: 'pk',
        sortKey: 'sk',

        DocumentClient
    });

    UserEntity: Entity<any>;

    private constructor() {
        this.UserEntity = new Entity({
            name: 'User',
            attributes: {
                pk: { partitionKey: true },
                sk: { hidden: true, sortKey: true },
                username: { type: 'string' }
            },
            table: DynamoDBController.table as any
        } as const);
    }

    public static getInstance(): DynamoDBController {
        if (!DynamoDBController.instance) {
            DynamoDBController.instance = new DynamoDBController();
        }

        return DynamoDBController.instance;
    }
}