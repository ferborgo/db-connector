import { AppDataSource } from "../data-source";
import { testGetTweet } from "./getTweet"
import { testGetUser } from "./getUser";
import { testLikeExists } from "./likeExists";
import { testListLastLikedTweetsByUser } from "./listLastLikedTweetsByUser";
import { testListResponsesOfTweet } from "./listResponsesOfTweet";
import { testListTweetsOfUser } from "./listTweetsOfUser";

const runAll = async () => {

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();

    await testGetTweet('Zackary_Shields', '2IL7PUkkTGjDjw43P7CeWJOt7R7');
    await testGetUser('Zackary_Shields');
    await testListTweetsOfUser('Zackary_Shields', '2IL7PYgo27ksoq50DW7OgtulaMY');
    await testLikeExists('2IL7PXSZnX0H4RSWTn56wMqPHvo', 'Marilie.Gerhold8', '2IL7PSmKncFa2agwx0ndwZAiuXh');
    await testListResponsesOfTweet('Marilie.Gerhold8', '2IL7PZ4MfuyDJICkZN0skKUBSJ4');
    await testListLastLikedTweetsByUser('Marilie.Gerhold8', '2IL7PXSZnX0H4RSWTn56wMqPHvo')
}

runAll();