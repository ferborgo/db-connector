import KSUID = require("ksuid");
import { ObjectLiteral, Repository } from "typeorm";
import { DynamoDBController } from "../dynamodb/dynamodb";
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
                id: KSUID.randomSync().string,
                username,
                biography: 'Software developer at Tecnom',
                screen_name: username
            }

            this.saveMySQL(user, index);
            this.saveDynamo(user, index);

            users.push(user);
        }

        return users;
    }

    private saveMySQL(user: User, index: number) {
        this.repository.save(user)
            .then(res => console.log(`User number ${index} saved on MySQL`))
            .catch(error => console.log('Error saving user on mysql: ' + error))
    }

    private saveDynamo(user: User, index: number) {
        const db = DynamoDBController.getInstance();

        const item = {
            pk: 'USER#' + user.username,
            sk: 'USER#' + user.username,
            username: user.username
        }

        db.UserEntity.put(item)
            .then(res => console.log(`User number ${index} saved on DynamoDB`))
            .catch(error => console.log('Error saving user on dynamodb: ' + error))
        
    }
}