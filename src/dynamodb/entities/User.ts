import { User } from "../../entity/User"
import { DynamoDBController } from "../dynamodb";

const db = DynamoDBController.getInstance();

export const saveUserOnDynamo = (user: User) => {
    const item = {
        pk: 'USER#' + user.username,
        sk: 'USER#' + user.username,
        id: user.id,
        username: user.username,
        screen_name: user.screen_name,
        biography: user.biography
    }

    return db.UserEntity.put(item)
}

export const getUser = async (username: string): Promise<number> => {
    

    const start = Date.now();
    await db.UserEntity.get({pk: `USER#${username}`, sk: `USER#${username}`});
    const elapsed_time = (Date.now() - start);

    return elapsed_time;
}