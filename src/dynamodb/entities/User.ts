import { User } from "../../entity/User"
import { DynamoDBController } from "../dynamodb";

const db = DynamoDBController.getInstance();

export const saveUserOnDynamo = (user: User) => {
    const item = {
        pk: 'USER#' + user.username,
        sk: 'USER#' + user.username,
        id: user.id,
        username: user.username
    }

    return db.UserEntity.put(item)
}