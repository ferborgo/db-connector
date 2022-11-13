/**
 * Caso de uso: "Quiero la información de un tweet en particular"
 * Particularidades:
 * - El tweet debe venir con sus imágenes
 * - Es necesario saber el usuario que hizo el tuit (Twitter mismo lo maneja así)
 */

import { AppDataSource } from "../data-source";
import { getTweet } from "../dynamodb/entities/Tweet"

export const testGetTweet = async (username: string, tweet_id: string) => {

    await getTweet(username, tweet_id);

    // MySQL

    let total_ms = 0;
    let operation_time: number;
    let start: number;

    start = Date.now();
    await AppDataSource.query('SELECT * FROM tweets t LEFT JOIN pictures p ON (t.id = p.tweetId) WHERE t.id = ?', [tweet_id]);
    operation_time = (Date.now() - start);
    total_ms = total_ms + operation_time;

    console.log('MySQL - Get tweet: ', operation_time, ' ms');

}