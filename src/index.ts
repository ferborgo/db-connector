import { AppDataSource } from "./data-source"
import { Like } from "./entity/Like";
import { Tweet } from "./entity/Tweet";
import { User } from "./entity/User"
import { UserSeed } from "./seed/user.seed";

AppDataSource.initialize().then(async () => {
    await AppDataSource.synchronize();

    const userRepository = AppDataSource.getRepository('User');
    const tweetRepository = AppDataSource.getRepository('Tweet');
    const likeRepository = AppDataSource.getRepository('Like');
    const pictureRepository = AppDataSource.getRepository('Picture');

    const userSeed = new UserSeed(userRepository); 
    const users = userSeed.createUsers(5)

    const tweet1: Tweet = {
        id: '1',
        content: 'Primer tuit carajo',
        user: users[0]
    }
    tweetRepository.save(tweet1)

}).catch(error => console.log(error))
