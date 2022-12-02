import { Like } from "../../entity/Like";
import { DynamoDBController } from "../dynamodb";
import { TableName } from "../set-up";

/**
 * {
  "pk": "LIKE#2HUzgOeZ0pkPosUURSXlowqEM8Q",
  "sk": "USER#ferborgo",
  "created_at": "1669688403",
  "tweetId": "2HUzgOeZ0pkPosUURSXlowqEM8Q",
  "like_username": "ferborgo",
  "GSI1_PK": "LIKE#ferborgo",
  "GSI1_SK": "CREATED_AT#1669688403"
    }
 */

// Los likes a un tweet (potencialmente cientos de miles) se guardan aparte, en su propia clave primaria (pk + sk).
// Tenemos info de qué usuario le dio like y en qué momento.
// Podemos saber si un usuario le dio like haciend PK = LIKE#tweetId and SK = USER#username, si existe la tupla le dio like
// Podemos encontrar los ultimos tweetsId (solamente) que un usuario le dio like, queriando la GSI1 asi:
// GSI1_PK = LIKE#username, ordenando por GSI1_SK DESC. Despues tenemos que hacer 2 batchGetItem, para obtener toda la info de esos tweets,
// y toda la info de sus usuarios creadores.

const db = DynamoDBController.getInstance();

export const saveLikeOnDynamo = (like: Like) => {
    const item = {
        pk: `LIKE#${like.tweet.id}`,
        sk: `USER#${like.user.username}`,
        created_at: like.created_at,
        tweetId: like.tweet.id,
        tweet_username: like.tweet.user.username,
        like_username: like.user.username,
        gsi1_pk: `LIKE#${like.user.username}`,
        gsi1_sk: `CREATED_AT#${like.created_at}`
    }

    return db.LikeEntity.put(item);
}

export const userLikedTweet = async (username: string, tweetId: string): Promise<boolean> => {
    const data = await db.LikeEntity.get({pk: `LIKE#${tweetId}`, sk: `USER#${username}`});
    
    return data.Item != null;
}

export const listLastLikedTweetsByUser = async (username: string) => {

    const data = await db.documentClient().query({
            TableName: TableName,
            IndexName: 'GSI1',
            KeyConditionExpression: "gsi1_pk = :gsi1_pk",
            ExpressionAttributeValues: {
                ":gsi1_pk": `LIKE#${username}`
            },
            ScanIndexForward: false
        }).promise();

    let keys = data.Items.map(item => {
        return {
            pk: `TWEET#${item.tweet_username}`,
            sk: `ID#${item.tweetId}`
        }
    });

    const tweets_res = await db.documentClient().batchGet({
        RequestItems: {
            [TableName]: {
                Keys: keys
            }
        }
    }).promise();

    const tweets = tweets_res.Responses[TableName];

    keys = tweets.map(item => {
        return {
            pk: `USER#${item.username}`,
            sk: `USER#${item.username}`
        }
    });

    const users_batch = await db.documentClient().batchGet({
        RequestItems: {
            [TableName]: {
                Keys: keys
            }
        }
    }).promise();

    const users = users_batch.Responses[TableName];

    tweets.forEach(tweet => tweet.user = users.find((user => user.username == tweet.username)));

    console.log(tweets.map(tweet => tweet.sk.split('#')[1]));
    
}