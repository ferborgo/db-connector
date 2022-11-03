import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    await AppDataSource.synchronize();
}).catch(error => console.log(error))
