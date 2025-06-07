export interface UserStateModel {
  user: {
    isLoggedIn: boolean;
    id: number;
    name: string;
    email: string;
    role: string;
  };
}
