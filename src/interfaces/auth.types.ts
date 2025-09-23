import { Request } from "express";
import { IUser } from "../modules/user/user.inerface";

export interface AuthenticatedRequest extends Request {
  user?: Partial<IUser>;
}
