/**
 * Caso de uso: "Quiero la información de un tweet en particular"
 * Particularidades:
 * - El tweet debe venir con sus imágenes
 * - Es necesario saber el usuario que hizo el tuit (Twitter mismo lo maneja así)
 */

import { AppDataSource } from "../data-source";
import { getTweet } from "../dynamodb/entities/Tweet"
import { TestInfo } from "./run";

export const testGetTweet = async (username: string, tweet_id: string): Promise<TestInfo> => {

    // DynamoDB
    const dynamo_time = await getTweet(username, tweet_id);

    // MySQL
    const start = Date.now();
    const mysql_response = await AppDataSource.query('SELECT * FROM tweets t LEFT JOIN pictures p ON (t.id = p.tweetId) WHERE t.id = ?', [tweet_id]);
    const elapsed_time = (Date.now() - start);

    return {
        dynamo_time,
        mysql_time: elapsed_time
    }

}