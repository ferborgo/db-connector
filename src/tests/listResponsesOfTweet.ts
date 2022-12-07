/**
 * Caso de uso: "Quiero ver las respuestas a un tweet ordenadas por más recientes"
 * Particularidades:
 *  - Cada respuesta debe venir con la información completa del usuario que la realizó. 
 * 
 */

import { AppDataSource } from "../data-source";
import { listResponsesFromTweet } from "../dynamodb/entities/Response"
import { TestInfo } from "./run";

export const testListResponsesOfTweet = async (user_id: string, tweet_id: string): Promise<TestInfo> => {

    // DynamoDB
    const dynamo_time = await listResponsesFromTweet(tweet_id);

    // MySQL

    const start = Date.now();
    const mysql_res = await AppDataSource.query('SELECT * FROM responses r INNER JOIN users u ON (u.id = r.userId) WHERE tweetId = ? ORDER BY r.created_at DESC;', [tweet_id]);
    const elapsed_time = (Date.now() - start);

    return {
        dynamo_time,
        mysql_time: elapsed_time
    }
}