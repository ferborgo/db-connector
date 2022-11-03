import { AppDataSource } from "./data-source"
import { Like } from "./entity/Like";
import { Tweet } from "./entity/Tweet";
import { User } from "./entity/User"
import { LikeSeed } from "./seed/like.seed";
import { PictureSeed } from "./seed/picture.seed";
import { TweetSeed } from "./seed/tweet.seed";
import { UserSeed } from "./seed/user.seed";

AppDataSource.initialize().then(async () => {
    await AppDataSource.synchronize();

    const userRepository = AppDataSource.getRepository('User');
    const tweetRepository = AppDataSource.getRepository('Tweet');
    const likeRepository = AppDataSource.getRepository('Like');
    const pictureRepository = AppDataSource.getRepository('Picture');

    // const userSeed = new UserSeed(userRepository); 
    // const users = userSeed.createUsers(5000);

    // const tweetSeed = new TweetSeed(tweetRepository);
    // const tweets = tweetSeed.createTweets(150000, users);

    // const likeSeed = new LikeSeed(likeRepository);
    // await likeSeed.createLikes(150000, users, tweets);

    const tweets2 = await tweetRepository.find({ take: 20 });
    const pictureSeed = new PictureSeed(pictureRepository);
    pictureSeed.createPictures(50000, tweets2 as Tweet[]);

}).catch(error => console.log(error))
