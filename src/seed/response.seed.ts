import { ObjectLiteral, Repository } from "typeorm";
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

            this.saveMySQL(response);
        }

    }

    private saveMySQL(response: Response) {
        this.repository.save(response)
    }

    private saveDynamo(response: Response) {
        // TO-DO
    }


}