import { FailedResponse } from "./template";
import { Error } from "../types/type";

export const validateTeacher = (payload: any, teacher_id: any) => {
  if (teacher_id === Error.FETCH_FAILED) {
    return new FailedResponse(500, Error.FETCH_FAILED);
  }
  if (teacher_id === Error.MDOULE_NOT_FOUND) {
    return new FailedResponse(404, Error.MDOULE_NOT_FOUND);
  }
  if (teacher_id === Error.MATERIAL_NOT_FOUND) {
    return new FailedResponse(404, Error.MATERIAL_NOT_FOUND);
  }
  if(teacher_id === Error.DELETE_FAILED){
    return new FailedResponse(500, Error.DELETE_FAILED);
  }
  if (teacher_id !== payload.id && !payload.isAdmin) {
    return new FailedResponse(401, Error.UNAUTHORZIED_ACTION);
  }
};
