/**
 * Caso de uso: "Quiero saber si un usuario le dió like a un tweet"
 */

import { AppDataSource } from "../data-source";
import { userLikedTweet } from "../dynamodb/entities/Like"

export const testLikeExists = async (userId: string, username: string, tweet_id: string) => {

    // DynamoDB
    userLikedTweet(username, tweet_id)

    // MySQL
    const start = Date.now();
    await AppDataSource.query('SELECT * FROM likes where userId = ? and tweetId = ?', [userId, tweet_id]);
    const total = (Date.now() - start);

    console.log('MySQL - User liked tweet ', total, ' ms');
    
}