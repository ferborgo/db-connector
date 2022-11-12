import { BatchGetRequestMap, QueryInput } from "aws-sdk/clients/dynamodb";
import { Table } from "dynamodb-toolbox";
import { Response } from "../../entity/Response"
import { getClient } from "../client";
import { DynamoDBController } from "../dynamodb";
import { TableName } from "../set-up";

const db = DynamoDBController.getInstance();

export const saveResponseOnDynamo = (response: Response) => {
    const item = {
        pk: `RESPONSE#${response.tweet.id}`,
        sk: `ID#${response.id}`,
        content: response.content,
        username: response.user.username,
        tweetId: response.tweet.id
    }

    return db.ResponseEntity.put(item)
}


export const listResponsesFromTweet = async (tweetId: string): Promise<Response[]> => {
    const responses: Response[] = [];

    let total_ms = 0;
    let operation_time: number;
    let start: number;

    start = Date.now();
    const res = await db.ResponseEntity.query(`RESPONSE#${tweetId}`);
    operation_time = (Date.now() - start);
    total_ms = total_ms + operation_time;
    console.log('Query: ', operation_time);
    
    // Forma más casera
    // const res = await db.documentClient().query({
    //     TableName: TableName,
    //     KeyConditionExpression: "pk = :pk",
    //     ExpressionAttributeValues: {
    //         ":pk": `RESPONSE#${tweetId}`
    //     }
    // }).promise();

    // Otra forma más "casera" 48ms
    // const params: QueryInput = {
    //     TableName: TableName,
    //     KeyConditionExpression: "pk = :pk",
    //     ExpressionAttributeValues: {
    //         ":pk": { 'S': `RESPONSE#${tweetId}` }
    //     }
    // }
    // start = Date.now();
    // const res = await getClient().query(params).promise();
    // operation_time = (Date.now() - start);
    // total_ms = total_ms + operation_time;
    // console.log('Query: ', operation_time);

    const items = res.Items;

    const keys = items.map(item => {
        return {
            pk: `USER#${item.username}`,
            sk: `USER#${item.username}`
        }
    });

    start = Date.now();
    const res_batchGet = await db.documentClient().batchGet({
        RequestItems: {
            [TableName]: {
                Keys: keys
            }
        }
    }).promise();
    operation_time = (Date.now() - start)
    total_ms = total_ms + operation_time;
    console.log('BatchGetItem: ', operation_time);

    const users = res_batchGet.Responses[TableName];

    items.forEach(item => item.user = users.find(user => user.username == item.username));

    console.log('List reponses for tweet, total ms: ', total_ms);

    return items as Response[];
}