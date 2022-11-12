import { Repository, ObjectLiteral } from "typeorm";
import { saveTweetOnDynamo } from "../dynamodb/entities/Tweet";
import { Tweet } from "../entity/Tweet";
import { User } from "../entity/User";
import { getRandomInt } from "../utils/random";
var faker = require('faker');
import KSUID = require("ksuid");
import { Picture } from "../entity/Picture";

export class TweetSeed {

    private repository: Repository<ObjectLiteral>;

    constructor(repository: Repository<ObjectLiteral>) {
        this.repository = repository;
    }

    createTweets(cant = 10, users: User[]): Tweet[] {

        const tuits: Tweet[] = [];
        for (let index = 1; index <= cant; index++) {
            const random = getRandomInt(0, (users.length - 1))
            const tuit: Tweet = {
                id: KSUID.randomSync().string,
                content: faker.lorem.sentence(),
                user: users[random]
            }

            tuit.pictures = this.createPictures(getRandomInt(0, 4), tuit);

            this.saveOnMySQL(tuit, index);
            this.saveOnDynamo(tuit, index)

            tuits.push(tuit)
        }

        return tuits;
    }

    private saveOnMySQL(tweet: Tweet, index: number) {
        this.repository.save(tweet)
            .then(res => console.log(`Tweet number ${index} saved on MySQL`))
            .catch(error => console.log('There has been an error saving tweet on Mysql: ', error))
    }

    private saveOnDynamo(tweet: Tweet, index: number) {
        saveTweetOnDynamo(tweet)
            .then(res => console.log(`Tweet number ${index} saved on DynamoDB`))
            .catch(error => console.log('There has been an error saving tweet on Mysql: ', error))
    }

    private createPictures(cant = 4, tweet: Tweet): Picture[] {

        const pictures: Picture[] = [];
        for (let index = 1; index <= cant; index++) {
            const Picture: Picture = {
                id: KSUID.randomSync().string,
                alt: faker.lorem.sentence(),
                tweet,
                url: faker.image.imageUrl()
            }

            pictures.push(Picture);
        }

        return pictures;
    }

}