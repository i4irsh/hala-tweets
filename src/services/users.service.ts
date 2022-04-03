import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserByUserName(userName: string): Promise<User> {
    if (isEmpty(userName)) throw new HttpException(400, "userName missing");

    const findUser: User = await this.users.findOne({ userName });
    if (!findUser) throw new HttpException(409, "User not found");

    return findUser;
  }

  public async saveUser(userData: CreateUserDto): Promise<any> {
    const query = { userName: userData.userName };
    const update = { $set: { ...userData } };
    const options = { upsert: true, returnNewDocument : true };
    return await this.users.updateOne(query, update, options);
  }
}

export default UserService;
