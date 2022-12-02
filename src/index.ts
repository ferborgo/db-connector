import { AppDataSource as manager } from "./data-source"
import { listLastLikedTweetsByUser, userLikedTweet } from "./dynamodb/entities/Like";
import { listResponsesFromTweet } from "./dynamodb/entities/Response";
import { listTweetsFromUser } from "./dynamodb/entities/Tweet";
import { getUser } from "./dynamodb/entities/User";
import { setUpDynamoDB } from "./dynamodb/set-up";
import { testGetUser } from "./tests/getUser";
import { testListTweetsOfUser } from './tests/listTweetsOfUser';

manager.initialize().then(async () => {
    await manager.synchronize();

    await setUpDynamoDB()

    // await listResponsesFromTweet('2HSuI988YIAFkHpjCEEwuADc7JB');
    // await listTweetsFromUser('Estella.White');

    // await testGetUser('Estella.White')

    // await testListTweetsOfUser('Andre32', '2HUzgRsFAvLnXcGLSSWRDgGlzLr')

    userLikedTweet('Frederic_Stamm', '2IL7PXIRIvbbNggdPWQOWnHkZOP')
        .then(res => { (res == true) ? console.log('Frederic_Stamm liked the tweet with id 2IL7PXIRIvbbNggdPWQOWnHkZOP') : console.log('Frederic_Stamm DID NOT liked the tweet with id 2IL7PXIRIvbbNggdPWQOWnHkZOP') });

    userLikedTweet('Frederic_Stamm', '2IL7PYhbLmBJzn81bwDMUXNcYa7')
        .then(res => { (res == true) ? console.log('Frederic_Stamm liked the tweet with id 2IL7PYhbLmBJzn81bwDMUXNcYa7') : console.log('Frederic_Stamm DID NOT liked the tweet  with id 2IL7PYhbLmBJzn81bwDMUXNcYa7') })

    await listLastLikedTweetsByUser('Frederic_Stamm');
}).catch(error => console.log(error))
