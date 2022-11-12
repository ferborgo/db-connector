import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { getUser } from "../dynamodb/entities/User";

export const testGetUser = async (username: string) => {
    
    // Dynamo
    await getUser(username);


    // MySQL

    let total_ms = 0;
    let operation_time: number;
    let start: number;

    start = Date.now();
    const mysql_res = await AppDataSource.query('SELECT * FROM users WHERE username = ?', [username]);
    operation_time = (Date.now() - start);
    total_ms = total_ms + operation_time;

    console.log(mysql_res)

    console.log('MySQL - Get User by username: ', operation_time, ' ms');
}