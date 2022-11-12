import { Like } from "../../entity/Like";
import { DynamoDBController } from "../dynamodb";

const db = DynamoDBController.getInstance();

export const saveLikeOnDynamo = (like: Like) => {
    const item = {
    }

}