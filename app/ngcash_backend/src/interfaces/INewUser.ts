export interface IUsername {
  username: string;
}

export interface IPassword {
  password: string;
}

export interface IUser extends IUsername {
  password: string;
}

export interface INewUser extends IUser {
  id: number;
}
