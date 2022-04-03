import { HttpException } from '@exceptions/HttpException';
import { TwitterApi } from 'twitter-api-v2';
import tweetModel from '@models/tweets.model';
import { Tweet } from '@/interfaces/tweets.interface';
import { CONSUMER_KEY, CONSUMER_SECRET } from '@config';

class TweetsService {
  public tweets = tweetModel;

  public async getAllTweets(twitterUserId: string, accessToken: string, accessSecret: string): Promise<Tweet[]> {
    const client = new TwitterApi({
      appKey: CONSUMER_KEY,
      appSecret: CONSUMER_SECRET,
      accessToken,
      accessSecret,
    });

    const userTimelineTweets = await client.v2.userTimeline(twitterUserId);

    return userTimelineTweets.tweets;
  }

  public async getTweetById(tweetId: string, twitterUserId: string, accessToken: string, accessSecret: string): Promise<Tweet[]> {
    const client = new TwitterApi({
      appKey: CONSUMER_KEY,
      appSecret: CONSUMER_SECRET,
      accessToken,
      accessSecret,
    });

    const result = await client.v2.singleTweet(tweetId);
    return result.data;
  }

  public async deleteTweetById(tweetId: string, twitterUserId: string, accessToken: string, accessSecret: string): Promise<Tweet[]> {
    const client = new TwitterApi({
      appKey: CONSUMER_KEY,
      appSecret: CONSUMER_SECRET,
      accessToken,
      accessSecret,
    });

    const result = await client.v2.deleteTweet(tweetId);
    console.log(result)
    return result.data;
  }
}

export default TweetsService;
