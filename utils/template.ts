import { Response } from "express";

export class FailedResponse {
  constructor(status: number, message: string) {
    return { status, message };
  }
}

export class SuccessResponse {
  constructor(data: Object | Object[]) {
    return { status: 200, data };
  }
}
