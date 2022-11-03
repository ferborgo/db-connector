import { Repository, ObjectLiteral } from "typeorm";
import { Tweet } from "../entity/Tweet";
import { User } from "../entity/User";
import { getRandomInt } from "../utils/random";
var faker = require('faker');

export class TweetSeed {

    private repository;

    constructor(repository: Repository<ObjectLiteral>) {
        this.repository = repository;
    }

    createTweets(cant = 10, users: User[]): Tweet[] {

        const tuits: Tweet[] = [];
        for (let index = 1; index <= cant; index++) {
            const random = getRandomInt(0, (users.length - 1))
            const tuit: Tweet = {
                content: faker.lorem.sentence(),
                user: users[random]
            }
            
            this.repository.save(tuit);
            tuits.push(tuit)
        }

        console.log('Seeded ' + cant + ' tuits');
        return tuits;
    }
    
}