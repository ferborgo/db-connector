import { AppDataSource } from "../data-source";
import { testGetTweet } from "./getTweet"
import { testGetUser } from "./getUser";
import { testLikeExists } from "./likeExists";
import { testListTweetsOfUser } from "./listTweetsOfUser";

const runAll = async () => {

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();

    // await testGetTweet('Libbie_Runolfsson', '2HUzgQVhvYM3yQarCIAQJdGRGvi');
    // await testGetUser('Andre32');
    // await testListTweetsOfUser('Andre32', '2HUzgRsFAvLnXcGLSSWRDgGlzLr');

    await testLikeExists('2IL7PXSZnX0H4RSWTn56wMqPHvo', 'Marilie.Gerhold8', '2IL7PSmKncFa2agwx0ndwZAiuXh');
}

runAll();