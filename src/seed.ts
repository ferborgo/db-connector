import { AppDataSource } from "./data-source"
import { Like } from "./entity/Like";
import { Tweet } from "./entity/Tweet";
import { User } from "./entity/User"
import { LikeSeed } from "./seed/like.seed";
import { PictureSeed } from "./seed/picture.seed";
import { ResponseSeed } from "./seed/response.seed";
import { TweetSeed } from "./seed/tweet.seed";
import { UserSeed } from "./seed/user.seed";

AppDataSource.initialize().then(async () => {
    await AppDataSource.synchronize();

    const userRepository = AppDataSource.getRepository('User');
    const tweetRepository = AppDataSource.getRepository('Tweet');
    const likeRepository = AppDataSource.getRepository('Like');
    const pictureRepository = AppDataSource.getRepository('Picture');
    const responseRepository = AppDataSource.getRepository('Response');

    const userSeed = new UserSeed(userRepository); 
    const users = userSeed.createUsers(10);

    const tweetSeed = new TweetSeed(tweetRepository);
    const tweets = tweetSeed.createTweets(20, users);

    const likeSeed = new LikeSeed(likeRepository);
    await likeSeed.createLikes(30, users, tweets);

    const tweets2 = await tweetRepository.find({ take: 20 });
    const pictureSeed = new PictureSeed(pictureRepository);
    pictureSeed.createPictures(15, tweets2 as Tweet[]);


    const responseSeed = new ResponseSeed(responseRepository);
    responseSeed.createResponses(20, tweets as Tweet[], users as User[]);

}).catch(error => console.log(error))
