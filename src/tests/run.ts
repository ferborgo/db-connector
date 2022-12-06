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
        console.log('sum both')
        this.sumMysql(mysql_time);
        this.sumDynamo(dynamodb_time);

        this.cant_sums++;
        if (this.cant_sums == this.when_log) console.log(this.log());
    }

    log(): string {
        return `Average after ${this.cant_sums} times of '${this.name}': MySQL ${this.total_mysql} ms - DynamoDB ${this.total_dynamo} ms.`;
    }
}

const runAll = async () => {

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();

    let getTweetTime = new TestTimes('Get tweet', 1);

    for (let index = 0; index < 1; index++) {

        testGetTweet('Zackary_Shields', '2IL7PUkkTGjDjw43P7CeWJOt7R7')
            .then((res) => getTweetTime.sumBoth(res.mysql_time, res.dynamo_time));

        testGetUser('Zackary_Shields');
        testListTweetsOfUser('Zackary_Shields', '2IL7PYgo27ksoq50DW7OgtulaMY');
        testLikeExists('2IL7PXSZnX0H4RSWTn56wMqPHvo', 'Marilie.Gerhold8', '2IL7PSmKncFa2agwx0ndwZAiuXh');
        testListResponsesOfTweet('Marilie.Gerhold8', '2IL7PZ4MfuyDJICkZN0skKUBSJ4');
        testListLastLikedTweetsByUser('Marilie.Gerhold8', '2IL7PXSZnX0H4RSWTn56wMqPHvo')
    }
}

runAll();