import { ObjectLiteral, Repository } from "typeorm";
import { User } from "../entity/User";
var faker = require('faker');

export class UserSeed {
    
    private repository: Repository<ObjectLiteral>;

    constructor(repository: Repository<ObjectLiteral>) {
        this.repository = repository;
    }

    createUsers(cant = 10): User[] {

        const users: User[] = [];
        for (let index = 1; index <= cant; index++) {
            const username = faker.internet.userName();
            const user: User = {
                username,
                biography: 'Software developer at Tecnom',
                screen_name: username
            }
            this.saveMySQL(user);

            users.push(user);
        }

        return users;
    }

    private saveMySQL(user: User) {
        this.repository.save(user)
    }

    private saveDynamo(user: User) {
        // TO-DO
    }


}