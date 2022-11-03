import { Repository, ObjectLiteral } from "typeorm";
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
            // try {
            //     const row = await this.repository.findOneBy({ userId: user.id, tweetId: tweet.id })
            //     if (!row) this.repository.save(like);
            // } catch (error) { console.log('error like seed: ', error) }

            this.repository.save(like);
        }

        console.log('Seeded ' + cant + ' likes');
    }

}