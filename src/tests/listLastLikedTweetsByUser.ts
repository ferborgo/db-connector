/**
 * Caso de uso: "Quiero ver los últimos tweets que un usuario le dió like"
 * Particularidades:
 *  - Cada tweet debe venir con la información completa del usuario que lo hizo.
 *  - Cada tweet debe venir con sus imágenes.
 */

import { AppDataSource } from "../data-source";
import { listLastLikedTweetsByUser } from "../dynamodb/entities/Like"

export const testListLastLikedTweetsByUser = async (username: string, userId: string) => {

    // Dynamo
    listLastLikedTweetsByUser(username);

    // MySQL
    const start = Date.now();
    await AppDataSource.query('SELECT * FROM likes l INNER JOIN tweets t ON (t.id = l.tweetId) INNER JOIN users u ON (u.id = t.userId) LEFT JOIN pictures p ON (p.tweetId = t.id) WHERE l.userId = ? ORDER BY l.created_at DESC', [userId]);
    const total = (Date.now() - start);

    console.log('MySQL - listLastLikedTweetsByUser ', total, ' ms');

}