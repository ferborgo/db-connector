import { AppDataSource } from "./data-source"
import { Like } from "./entity/Like";
import { Tweet } from "./entity/Tweet";
import { User } from "./entity/User"
import { TweetSeed } from "./seed/tweet.seed";
import { UserSeed } from "./seed/user.seed";

AppDataSource.initialize().then(async () => {
    await AppDataSource.synchronize();

    const userRepository = AppDataSource.getRepository('User');
    const tweetRepository = AppDataSource.getRepository('Tweet');
    const likeRepository = AppDataSource.getRepository('Like');
    const pictureRepository = AppDataSource.getRepository('Picture');

    const userSeed = new UserSeed(userRepository); 
    const users = userSeed.createUsers(500);

    const tweetSeed = new TweetSeed(tweetRepository);
    const tweets = tweetSeed.createTweets(3000, users);

}).catch(error => console.log(error))
