import { AppDataSource } from "../data-source";
import { getUser } from "../dynamodb/entities/User";

/**
 * Caso de uso: "Quiero ver la información en detalle de un usuario"
 */

export const testGetUser = async (username: string) => {
    
    // Dynamo
    await getUser(username);


    // MySQL

    let total_ms = 0;
    let operation_time: number;
    let start: number;

    start = Date.now();
    await AppDataSource.query('SELECT * FROM users WHERE username = ?', [username]);
    operation_time = (Date.now() - start);
    total_ms = total_ms + operation_time;

    console.log('MySQL - Get User by username: ', operation_time, ' ms');
}