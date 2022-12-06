import { AppDataSource } from "../data-source";
import { getUser } from "../dynamodb/entities/User";
import { TestInfo } from "./run";

/**
 * Caso de uso: "Quiero ver la información en detalle de un usuario"
 */

export const testGetUser = async (username: string): Promise<TestInfo> => {
    
    // Dynamo
    const dynamo_time = await getUser(username);


    // MySQL
    const start = Date.now();
    await AppDataSource.query('SELECT * FROM users WHERE username = ?', [username]);
    const elapsed_time = (Date.now() - start);

    return {
        dynamo_time,
        mysql_time: elapsed_time
    }
}