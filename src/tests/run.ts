import { AppDataSource } from "../data-source";
import { testGetTweet } from "./getTweet"
import { testGetUser } from "./getUser";
import { testLikeExists } from "./likeExists";
import { testListLastLikedTweetsByUser } from "./listLastLikedTweetsByUser";
import { testListResponsesOfTweet } from "./listResponsesOfTweet";
import { testListTweetsOfUser } from "./listTweetsOfUser";

export interface TestInfo {
    mysql_data?: any;
    dynamo_data?: any;
    mysql_time: number;
    dynamo_time: number;
}

class TestTimes {

    name: string;
    total_dynamo: number;
    total_mysql: number;

    when_log: number;
    cant_sums: number;

    constructor(name: string, when_log?: number) {
        this.total_dynamo = 0;
        this.total_mysql = 0;
        this.name = name;

        this.when_log = when_log;
        this.cant_sums = 0;
    }

    sumDynamo(time: number): void {
        this.total_dynamo = this.total_dynamo + time;
    }

    sumMysql(time: number): void {
        this.total_mysql = this.total_mysql + time;
    }

    sumBoth(mysql_time: number, dynamodb_time: number): void {
        this.sumMysql(mysql_time);
        this.sumDynamo(dynamodb_time);

        this.cant_sums++;
        if (this.cant_sums == this.when_log) console.log(this.log());
    }

    private getDynamoAvg(): number {
        return Number(this.total_dynamo / this.cant_sums);
    }

    private getMysqlAvg(): number {
        return Number(this.total_mysql / this.cant_sums);
    }

    log(): string {
        return `Average after ${this.cant_sums} times of '${this.name}': MySQL ${this.getMysqlAvg()} ms - DynamoDB ${this.getDynamoAvg()} ms.`;
    }
}

const runAll = async () => {

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();

    const cant_iterations = 1;

    let getTweetTime = new TestTimes('Get tweet', cant_iterations);
    let getUserTime = new TestTimes('Get user', cant_iterations);
    let listTweetsOfUserTime = new TestTimes('List tweets of user', cant_iterations);
    let likeExistsTime = new TestTimes('Like exists?', cant_iterations);
    let listResponsesOfTweetTime = new TestTimes('List responses of tweet', cant_iterations);
    let listLastLikedTweetsByUserTime = new TestTimes('List last liked tweets by user', cant_iterations);

    for (let index = 0; index < cant_iterations; index++) {

        testGetTweet('Zackary_Shields', '2IL7PUkkTGjDjw43P7CeWJOt7R7')
            .then((res) => getTweetTime.sumBoth(res.mysql_time, res.dynamo_time));

        testGetUser('Zackary_Shields')
            .then((res) => getUserTime.sumBoth(res.mysql_time, res.dynamo_time));

        testListTweetsOfUser('Zackary_Shields', '2IL7PYgo27ksoq50DW7OgtulaMY')
            .then((res) => listTweetsOfUserTime.sumBoth(res.mysql_time, res.dynamo_time))


        testLikeExists('2IL7PXSZnX0H4RSWTn56wMqPHvo', 'Marilie.Gerhold8', '2IL7PSmKncFa2agwx0ndwZAiuXh')
            .then((res) => likeExistsTime.sumBoth(res.mysql_time, res.dynamo_time))

    
        testListResponsesOfTweet('Marilie.Gerhold8', '2IL7PZ4MfuyDJICkZN0skKUBSJ4')
            .then((res) => listResponsesOfTweetTime.sumBoth(res.mysql_time, res.dynamo_time))

        
        testListLastLikedTweetsByUser('Marilie.Gerhold8', '2IL7PXSZnX0H4RSWTn56wMqPHvo')
            .then((res) => listLastLikedTweetsByUserTime.sumBoth(res.mysql_time, res.dynamo_time))
    }
}

runAll();