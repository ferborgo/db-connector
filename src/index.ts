import { AppDataSource } from "./data-source"
import { setUpDynamoDB } from "./dynamodb/set-up";

AppDataSource.initialize().then(async () => {
    await AppDataSource.synchronize();

    await setUpDynamoDB()

}).catch(error => console.log(error))
