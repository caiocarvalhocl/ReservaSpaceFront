export interface UserInfo {
  id: number;
  name: string;
  role: string;
}

export interface UserStateModel {
  user: UserInfo;
  isLoggedIn: boolean;
}
