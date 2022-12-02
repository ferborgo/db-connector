/**
 * Caso de uso: "Quiero ver las respuestas a un tweet ordenadas por más recientes"
 * Particularidades:
 *  - Cada respuesta debe venir con la información completa del usuario que la realizó. 
 * 
 */

import { AppDataSource } from "../data-source";
import { listResponsesFromTweet } from "../dynamodb/entities/Response"

export const listResponsesOfTweet = async (user_id: string, tweet_id: string) => {

    // DynamoDB
    await listResponsesFromTweet(tweet_id);

    // MySQL

    let total_ms = 0;
    let operation_time: number;
    let start: number;

    start = Date.now();
    const mysql_res = await AppDataSource.query('SELECT * FROM responses r INNER JOIN users u ON (u.id = r.userId) WHERE tweetId = ? ORDER BY r.created_at DESC;', [tweet_id]);
    operation_time = (Date.now() - start);
    total_ms = total_ms + operation_time;

    console.log('MySQL - List tweets of user with pictures: ', operation_time, ' ms');
}