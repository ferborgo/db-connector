import { Picture } from "../../entity/Picture";
import { Tweet } from "../../entity/Tweet"
import { User } from "../../entity/User";
import { DynamoDBController } from "../dynamodb";

const db = DynamoDBController.getInstance();

export const saveTweetOnDynamo = (tweet: Tweet) => {
    const item = {
        pk: 'TWEET#' + tweet.user.username,
        sk: 'ID#' + tweet.id,
        userId: tweet.user.id,
        content: tweet.content,
        username: tweet.user.username,
        pictures: convertToObject(tweet.pictures)
    }

    return db.TweetEntity.put(item)
}

function convertToObject(pictures: Picture[]): Object {
    var result = {};
    for (var i = 0; i < pictures.length; i++) {
        const actual: Picture = pictures[i];
        result[actual.id] = {
            alt: actual.alt,
            url: actual.url
        };
    }
    return result;
}


export const listTweetsFromUser = async (username: string): Promise<number> => {

    const start = Date.now();
    const res = await db.TweetEntity.query(`TWEET#${username}`, {
        reverse: true
    });
    const elapsed_time = (Date.now() - start);

    return elapsed_time;
}

export const getTweet = async (username: string, tweet_id: string): Promise<number> => {

    const start = Date.now();
    const res = await db.TweetEntity.get({pk: `TWEET#${username}`, sk: `ID#${tweet_id}`});
    const elapsed_time = Date.now() - start

    return elapsed_time;
}