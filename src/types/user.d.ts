export interface User {
  id: number;

  name: string;

  avatarId: string;
}

export interface InputUser extends Omit<User, "id">  {}

export interface UserState {
  name: string | null;
  
  avatarId: string | null;
}

export default User;