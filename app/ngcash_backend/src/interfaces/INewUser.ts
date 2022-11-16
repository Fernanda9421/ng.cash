export interface IUser {
  username: string;
  password: string;
}

export interface INewUser extends IUser {
  id: number;
}
