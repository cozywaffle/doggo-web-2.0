export interface IReqData {
  username?: string;
  login: string;
  password: string;
}

export interface IUser {
  id: number;
  login: string;
  username: String;
  hash: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
  posts: IPost[] | [];
}

export interface IPost {
  id: number;
  content: string;
  tags: string[] | [];
  image_url?: string;
  author: IUser;
  likes: number;
  dislikes: number;
  created_at: Date;
  updated_at: Date;
  authorId: number;
}

export interface IData {
  userData: IUser | null;
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
