import { Request, Response } from "express";
import { AppResponse } from "../utils/response";
import User from "../models/users";

class UserController {
  static async profile(req: Request, res: Response) {
    try {
      let user = await User.findOne(req.user_id);
      return AppResponse.ok({
        res,
        data: user,
      });
    } catch (error) {
      return AppResponse.error({
        res,
        message: "bad request",
        status: 400,
      });
    }
  }
}
export default UserController;
