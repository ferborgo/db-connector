import { AppDataSource } from "../data-source";
import { testGetTweet } from "./getTweet"
import { testGetUser } from "./getUser";
import { testListTweetsOfUser } from "./listTweetsOfUser";

const runAll = async () => {

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();

    await testGetTweet('Libbie_Runolfsson', '2HUzgQVhvYM3yQarCIAQJdGRGvi');
    await testGetUser('Andre32');
    await testListTweetsOfUser('Andre32', '2HUzgRsFAvLnXcGLSSWRDgGlzLr');
}

runAll();