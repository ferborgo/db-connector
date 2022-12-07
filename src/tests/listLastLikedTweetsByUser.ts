/**
 * Caso de uso: "Quiero ver los últimos tweets que un usuario le dió like"
 * Particularidades:
 *  - Cada tweet debe venir con la información completa del usuario que lo hizo.
 *  - Cada tweet debe venir con sus imágenes.
 */

import { AppDataSource } from "../data-source";
import { listLastLikedTweetsByUser } from "../dynamodb/entities/Like"
import { TestInfo } from "./run";

export const testListLastLikedTweetsByUser = async (username: string, userId: string): Promise<TestInfo> => {

    // Dynamo
    const dynamo_time = await listLastLikedTweetsByUser(username);

    // MySQL
    const start = Date.now();
    await AppDataSource.query('SELECT * FROM likes l INNER JOIN tweets t ON (t.id = l.tweetId) INNER JOIN users u ON (u.id = t.userId) LEFT JOIN pictures p ON (p.tweetId = t.id) WHERE l.userId = ? ORDER BY l.created_at DESC', [userId]);
    const elapsed_time = (Date.now() - start);

    return {
        dynamo_time,
        mysql_time: elapsed_time
    }

}