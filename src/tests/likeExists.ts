/**
 * Caso de uso: "Quiero saber si un usuario le dió like a un tweet"
 */

import { AppDataSource } from "../data-source";
import { userLikedTweet } from "../dynamodb/entities/Like"
import { TestInfo } from "./run";

export const testLikeExists = async (userId: string, username: string, tweet_id: string): Promise<TestInfo> => {

    // DynamoDB
    const dynamo_time = await userLikedTweet(username, tweet_id)

    // MySQL
    const start = Date.now();
    await AppDataSource.query('SELECT * FROM likes where userId = ? and tweetId = ?', [userId, tweet_id]);
    const total = (Date.now() - start);

    return {
        dynamo_time,
        mysql_time: total
    }
    
}