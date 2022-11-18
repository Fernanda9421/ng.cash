import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/INewUser';
import { ILoggedUser } from '../interfaces/ILoggedUser';
import { UserService } from './user.service';
import { tokenGenerate } from '../utils/tokenGenerate';

export class LoginService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async login(user:IUser):Promise<ILoggedUser | null> {
    const userExists = await this.userService.getByUsername(user.username);
    if (!userExists) return null;

    const comparePassword = await bcrypt.compare(user.password, userExists.password);
    if (comparePassword === false) return null;

    const token = tokenGenerate(userExists.username, userExists.id);

    return {
      newUser: userExists,
      token,
    };
  }
}
