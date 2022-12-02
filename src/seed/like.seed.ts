import { Repository, ObjectLiteral } from "typeorm";
import { saveLikeOnDynamo } from "../dynamodb/entities/Like";
import { Like } from "../entity/Like";
import { Tweet } from "../entity/Tweet";
import { User } from "../entity/User";
import { getRandomInt } from "../utils/random";
var faker = require('faker');

export class LikeSeed {

    private repository: Repository<ObjectLiteral>;

    constructor(repository: Repository<ObjectLiteral>) {
        this.repository = repository;
    }

    async createLikes(cant = 10, users: User[], tweets: Tweet[]) {

        for (let index = 1; index <= cant; index++) {
            const random_user_pos = getRandomInt(0, (users.length - 1));
            const random_tweet_pos = getRandomInt(0, (tweets.length - 1));

            const user = users[random_user_pos];
            const tweet = tweets[random_tweet_pos];

            // TO-DO: asi como esta un user puede likear muchas veces un tuit
            const like: Like = {
                user,
                tweet,
                userId: user.id || '1',
                tweetId: tweet.id || '1'
            }

            this.saveMySQL(like, index);
            this.saveDynamo(like, index);
        }
    }

    private saveMySQL(like: Like, index: number) {
        this.repository.save(like)
            .then(res => console.log(`Like number ${index} saved on MySQL`))
            .catch(error => console.log('There has been an error saving Like on MySQL: ', error))
    }

    private saveDynamo(like: Like, index: number) {
        saveLikeOnDynamo(like)
            .then(res => console.log(`Like number ${index} saved on DynamoDB`))
            .catch(error => console.log('There has been an error saving Like on DynamoDB: ', error))
    }

}