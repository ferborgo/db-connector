import { AppDataSource } from "./data-source"
import { Like } from "./entity/Like";
import { Tweet } from "./entity/Tweet";
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {
    await AppDataSource.synchronize();

    const userRepository = AppDataSource.getRepository('User');
    const tweetRepository = AppDataSource.getRepository('Tweet');
    const likeRepository = AppDataSource.getRepository('Like');
    const pictureRepository = AppDataSource.getRepository('Picture');

    const ferborgo: User = {
        id: '1',
        username: 'ferborgo',
        biography: 'Software developer at Tecnom',
        screen_name: 'Fernando'
    }
    userRepository.save(ferborgo)

    const carlitos: User = {
        id: '2',
        username: 'carlitos',
        biography: 'Aguante el pincha',
        screen_name: 'Carlitos'
    }
    userRepository.save(carlitos)

    const tweet1: Tweet = {
        id: '1',
        content: 'Primer tuit de ferborgo',
        user: ferborgo
    }
    tweetRepository.save(tweet1)

    const like: Like = {
        id: 1,
        tweet: tweet1,
        user: carlitos,
        userId: carlitos.id,
        tweetId: tweet1.id
    }
    likeRepository.save(like)

}).catch(error => console.log(error))
