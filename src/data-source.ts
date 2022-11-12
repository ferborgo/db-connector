import "reflect-metadata"
import { DataSource } from "typeorm"
import { Like } from "./entity/Like"
import { Picture } from "./entity/Picture"
import { Response } from "./entity/Response"
import { Tweet } from "./entity/Tweet"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "grandescosas",
    database: "simple_twitter",
    synchronize: true,
    logging: false,
    entities: [Tweet, User, Like, Picture, Response],
    migrations: [],
    subscribers: [],
    dropSchema: true
})
