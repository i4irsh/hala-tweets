import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { TwitterApi } from 'twitter-api-v2';
import { redisClient }  from 'databases/redis';
import userService from '@services/users.service';


class AuthService {
  public users = userModel;
  public userService = new userService();
  public CONSUMER_KEY = 'TpqVvXT9oZmklCsotvA2PjdOU';
  public CONSUMER_SECRET = 'UV4rb4fcf4HKiWTBegn1X8dn3xecNzgcYvDkFwFSL1Dbitx2ie';
  public CALLBACK_URL = "http://www.localhost:3000/callback";


  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async twitterAuth(): Promise<{ url: string, oauth_token: string; oauth_token_secret: string }> {
    const client = new TwitterApi({
      appKey: this.CONSUMER_KEY,
      appSecret: this.CONSUMER_SECRET,
    });

    const response = await client.generateAuthLink(this.CALLBACK_URL);
    const { url, oauth_token, oauth_token_secret } = response;
    await redisClient.set(oauth_token, oauth_token_secret);
    return { url, oauth_token, oauth_token_secret };
  }

  public async twitterCallback(oauth_token: string, oauth_verifier: string): Promise<{ token: string; screenName: string }> {
    const oauth_token_secret = await redisClient.get(oauth_token);
    if (!oauth_token_secret) throw new HttpException(400, "error: oauth_token_secret");

    const client = new TwitterApi({
      appKey: this.CONSUMER_KEY,
      appSecret: this.CONSUMER_SECRET,
      accessToken: oauth_token,
      accessSecret: oauth_token_secret,
    });

    const { accessToken, accessSecret, screenName } = await client.login(oauth_verifier);

    const savedUserInfo = await this.userService.saveUser({ userName: screenName, accessToken, accessSecret });
    
    const tokenData = this.createToken(savedUserInfo);
    return { token: tokenData.token, screenName };
  }
}

export default AuthService;
