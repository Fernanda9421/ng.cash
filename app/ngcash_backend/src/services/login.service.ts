import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/INewUser';
import { ILoggedUser } from '../interfaces/ILoggedUser';
import { UserService } from './user.service';
import { tokenGenerate } from '../utils/tokenGenerate';
import HttpException from '../exceptions/HttpException';

export class LoginService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async login(user:IUser):Promise<ILoggedUser | null> {
    const userExists = await this.userService.getByUsername(user.username);
    if (!userExists) throw new HttpException(404, 'User not found');

    const comparePassword = await bcrypt.compare(user.password, userExists.password);
    if (comparePassword === false) throw new HttpException(401, 'Invalid password');

    const token = tokenGenerate(userExists.username, userExists.id);

    return {
      newUser: userExists,
      token,
    };
  }
}
