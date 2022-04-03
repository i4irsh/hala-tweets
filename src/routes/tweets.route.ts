import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import TweetsController from '@/controllers/tweets.controller';
import authMiddleware from '@middlewares/auth.middleware';

class TweetsRoute implements Routes {
  public path = '/tweets';
  public router = Router();
  public tweetsController = new TweetsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.tweetsController.getTweets);
    this.router.get(`${this.path}/:tweetId`, authMiddleware, this.tweetsController.getTweetById);
    this.router.delete(`${this.path}/:tweetId`, authMiddleware, this.tweetsController.deleteTweetById);
  }
}

export default TweetsRoute;
