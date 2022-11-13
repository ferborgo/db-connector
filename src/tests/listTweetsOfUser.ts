import { listTweetsFromUser } from '../dynamodb/entities/Tweet';
import { AppDataSource } from "../data-source";

/**
 * Caso de uso: "Quiero ver los últimos tweets de un usuario en particular"
 * Particularidades: 
 * - Los tuits deben venir con sus imágenes
 */

export const testListTweetsOfUser = async (username: string, userId: string) => {

    // Dynamo
    await listTweetsFromUser(username);

    // MySQL

    let total_ms = 0;
    let operation_time: number;
    let start: number;

    start = Date.now();
    const mysql_res = await AppDataSource.query('SELECT * FROM tweets t LEFT JOIN pictures p ON (p.tweetId = t.id) WHERE t.userId = ? ORDER BY t.created_at DESC', [userId]);
    operation_time = (Date.now() - start);
    total_ms = total_ms + operation_time;

    console.log('MySQL - List tweets of user with pictures: ', operation_time, ' ms');
}