import TweetsService from '@/services/tweets.service';
import { NextFunction, Request, Response } from 'express';

class TweetsController {
  public tweetsService = new TweetsService();

  public getTweets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { twitterUserId, accessToken, accessSecret } = req.user;
      const tweets = await this.tweetsService.getAllTweets(twitterUserId, accessToken, accessSecret);
      res.status(200).json({ data: tweets, message: 'getTweets' });
    } catch (error) {
      next(error);
    }
  };

  public getTweetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { twitterUserId, accessToken, accessSecret } = req.user;
      const tweet = await this.tweetsService.getTweetById(req.params.tweetId, twitterUserId, accessToken, accessSecret);
      res.status(200).json({ data: tweet, message: 'getTweetById' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTweetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { twitterUserId, accessToken, accessSecret } = req.user;
      const tweets = await this.tweetsService.deleteTweetById(req.params.tweetId, twitterUserId, accessToken, accessSecret);
      res.status(200).json({ data: tweets, message: 'deleteTweetById' });
    } catch (error) {
      next(error);
    }
  };
}

export default TweetsController;
