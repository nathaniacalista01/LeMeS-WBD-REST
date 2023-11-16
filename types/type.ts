export enum STATUS {
  ACCEPTED,
  WAITING,
  REJECTED,
}

export enum Source {
  PDF = "PDF",
  VIDEO = "VIDEO",
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
  image_path: string | null;
  teacher_id: number;
  release_date: Date;
};

export type User = {
  id: number;
  username: string;
  fullname: string;
  isAdmin: boolean;
  password: string;
  created_on: Date;
  image_path: string | null;
};

export enum Error {
  USER_NOT_FOUND = "User not found!",
  WRONG_PASSWORD = "Wrong password!",
  REGISTER_FAILED = "Register failed, please check all your input!",
  FETCH_FAILED = "Failed getting data!",
  EDIT_FAILED = "Failed editing data, please check all your input!",
  DELETE_FAILED = "Failed deleting data, user not found!",
  ADD_COURSE_FAILED = "Failed adding course, please check all your input!",
  COURSE_NOT_FOUND = "Course not found!",
  UNAUTHORZIED_ACTION = "Unauthorized action!",
  INTERNAL_ERROR = "Internal server error",
  PAGE_NOT_FOUND = "Page not found",
  ADD_MODULE_FAILED = "Failed adding module, please check all your input!",
  MDOULE_NOT_FOUND = "Module not found!",
  ADD_MATERIAL_FAILED = "Failed adding material, please check all your input!",
  MATERIAL_NOT_FOUND = "Material not found!",
  REQUEST_NOT_FOUND = "Request not found!",
  API_KEY_WRONG = "API Key Wrong",
}

export enum Success {
  LOGIN_SUCCESS = "Login success!",
  REGISTER_SUCCESS = "Register success!",
}

export enum MAX_CONTENT{
  PAGINATION_TABLE = 4,
  PAGINATOON_PAGE = 4,
}
