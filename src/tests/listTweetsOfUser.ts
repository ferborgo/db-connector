import { listTweetsFromUser } from '../dynamodb/entities/Tweet';
import { AppDataSource } from "../data-source";
import { TestInfo } from './run';

/**
 * Caso de uso: "Quiero ver los últimos tweets de un usuario en particular"
 * Particularidades: 
 * - Los tuits deben venir con sus imágenes
 */

export const testListTweetsOfUser = async (username: string, userId: string): Promise<TestInfo> => {

    // Dynamo
    const dynamo_time = await listTweetsFromUser(username);

    // MySQL
    const start = Date.now();
    const mysql_res = await AppDataSource.query('SELECT * FROM tweets t LEFT JOIN pictures p ON (p.tweetId = t.id) WHERE t.userId = ? ORDER BY t.created_at DESC', [userId]);
    const elapsed_time = (Date.now() - start);

    return {
        dynamo_time,
        mysql_time: elapsed_time 
    }
}