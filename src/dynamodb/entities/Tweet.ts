import { Tweet } from "../../entity/Tweet"
import { DynamoDBController } from "../dynamodb";

const db = DynamoDBController.getInstance();

export const saveTweetOnDynamo = (tweet: Tweet) => {
    const item = {
        pk: 'TWEET#' + tweet.user.username,
        sk: 'ID#' + tweet.id,
        userId: tweet.user.id,
        content: tweet.content
    }

    return db.TweetEntity.put(item)
}