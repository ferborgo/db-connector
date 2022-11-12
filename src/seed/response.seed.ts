import { ObjectLiteral, Repository } from "typeorm";
import { saveResponseOnDynamo } from "../dynamodb/entities/Response";
import { Response } from "../entity/Response";
import { Tweet } from "../entity/Tweet";
import { User } from "../entity/User";
import { getRandomInt, getRandomItem } from "../utils/random";
var faker = require('faker');
const KSUID = require('ksuid');

export class ResponseSeed {

    private repository: Repository<ObjectLiteral>;

    constructor(repository: Repository<ObjectLiteral>) {
        this.repository = repository;
    }

    createResponses(cant = 10, tweets: Tweet[], users: User[]) {

        for (let index = 1; index <= cant; index++) {

            const randomTuit = getRandomItem(tweets);
            const randomUser = getRandomItem(users);

            const response: Response = {
                id: KSUID.randomSync().string,
                content: faker.lorem.sentence(),
                tweet: randomTuit,
                tweetId: randomTuit.id,
                user: randomUser,
                userId: randomUser.id
            }

            this.saveMySQL(response, index);
            this.saveDynamo(response, index);
        }

    }

    private saveMySQL(response: Response, index: number) {
        this.repository.save(response)
            .then(res => console.log(`Response number ${index} saved on MySQL`))
            .catch(error => console.log('There has been an error saving response on MySQL: ', error))
    }

    private saveDynamo(response: Response, index: number) {
        saveResponseOnDynamo(response)
            .then(res => console.log(`Response number ${index} saved on DynamoDB`))
            .catch(error => console.log('There has been an error saving response on DynamoDB: ', error))
    }


}