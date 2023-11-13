export enum STATUS {
  ACCEPTED,
  WAITING,
  REJECTED,
}

export enum Source {
  PDF = "PDF",
  VIDEO ="VIDEO",
}

export type Premium = {
  user_id: number;
  username: string;
  status: STATUS;
};

export type CoursePremium = {
  id: number;
  title: string;
  description: string;
  image_path?: string;
  teacher_id: number;
  release_date: Date;
};

export type User = {
  id : number;
  username : string;
  fullname : string;
  isAdmin : boolean;
  password : string;
  created_on : Date;
  image_path : string | null;
}

export enum Error{
  USER_NOT_FOUND = "Username not found!",
  WRONG_PASSWORD = "Wrong password!",
  LOGIN_SUCCESS = "Login success!",
}