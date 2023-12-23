export interface IReqData {
  username?: string;
  login: string;
  password: string;
}

export interface IUserData {
  id: number;
  username: String;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUser extends IUserData {
  login: string;
  hash: string;
  posts: IPost[] | [];
}

export interface IPost {
  id: number;
  content: string;
  tags: string[] | [];
  image_url?: string;
  author: IUserData;
  likes: number;
  dislikes: number;
  created_at: Date;
  updated_at: Date;
  authorId: number;
}

export interface IData {
  data: { userData: IUserData | null; posts: IPost[] } | null;
  status: string;
}

export interface IinitialState {
  token: null | string;
  data: null | IUser;
  status: string;
}

export interface IUrlParams {
  id: number;
  username: string;
}
