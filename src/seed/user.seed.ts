import { ObjectLiteral, Repository } from "typeorm";
import { User } from "../entity/User";
var faker = require('faker');

export class UserSeed {
    
    private repository;

    constructor(repository: Repository<ObjectLiteral>) {
        this.repository = repository;
    }

    createUsers(cant = 10): User[] {

        const users: User[] = [];
        for (let index = 1; index <= cant; index++) {
            const user: User = {
                username: faker.internet.userName(),
                biography: 'Software developer at Tecnom',
                screen_name: 'Fernando'
            }
            this.repository.save(user);
            users.push(user);
        }

        console.log('Seeded ' + cant + ' users');

        return users;
    }


}