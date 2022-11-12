import { ObjectLiteral, Repository } from "typeorm";
import { Picture } from "../entity/Picture";
import { Tweet } from "../entity/Tweet";
import { getRandomInt, getRandomItem } from "../utils/random";
var faker = require('faker');
const KSUID = require('ksuid');

export class PictureSeed {
    
    private repository: Repository<ObjectLiteral>;

    constructor(repository: Repository<ObjectLiteral>) {
        this.repository = repository;
    }

    createPictures(cant = 10, tweets: Tweet[]): Picture[] {

        const pictures: Picture[] = [];
        for (let index = 1; index <= cant; index++) {
            const Picture: Picture = {
                id: KSUID.randomSync().string,
                alt: faker.lorem.sentence(),
                tweet: getRandomItem(tweets),
                url: faker.image.imageUrl()
            }

            this.saveMySQL(Picture);

            pictures.push(Picture);
        }

        return pictures;
    }

    private saveMySQL(picture: Picture) {
        this.repository.save(picture)
    }

    private saveDynamo(picture: Picture) {
        // Se guardan en tweet.seed.ts
    }


}