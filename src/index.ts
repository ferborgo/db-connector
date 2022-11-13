import { AppDataSource as manager } from "./data-source"
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
}).catch(error => console.log(error))
