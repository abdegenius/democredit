import { Request, Response } from "express";
import { AppResponse } from "../utils/response";
import User from "../models/users";
import bcrypt from "bcryptjs";
import Auth from "../models/auth";
import { checkPhone } from "../utils/karma";
import { generateJwtToken } from "../utils/crypto";

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { firstname, lastname, email, phone, password } = req.body;
      let checkIfPhoneExistInKarma = await checkPhone(phone);
      if (checkIfPhoneExistInKarma) {
        return AppResponse.error({
          res,
          message: "user can not be onboarded",
          status: 422,
        });
      } else {
        let checkIfEmailExist = await User.findByEmail(email);
        if (checkIfEmailExist == 0) {
          return AppResponse.error({
            res,
            message: "email already exists",
            status: 422,
          });
        } else {
          bcrypt.hash(password, 12).then(async (hashed_password) => {
            const payload = {
              firstname,
              lastname,
              email,
              phone,
              password: hashed_password,
            };
            const user = await Auth.register(payload);
            if (user) {
              const token = await generateJwtToken(
                { id: user },
                process.env.JWT_SECRET_KEY || "",
                "30d"
              );
              return AppResponse.ok({
                res,
                data: token,
              });
            } else {
              return AppResponse.error({
                res,
                message: "failed to register",
                status: 422,
              });
            }
          });
        }
      }
    } catch (error) {
      return AppResponse.error({
        res,
        message: "bad request",
        status: 400,
      });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (user == 0) {
        return AppResponse.error({
          res,
          message: "invalid login credentials",
          status: 422,
        });
      } else {
        const passwordMatch = await bcrypt.compare(password, user[0].password);
        if (!passwordMatch) {
          return AppResponse.error({
            res,
            message: "invalid login credentials",
            status: 422,
          });
        } else {
          const token = await generateJwtToken(
            { id: user[0].id },
            process.env.JWT_SECRET_KEY || "",
            "30d"
          );
          return AppResponse.ok({
            res,
            data: token,
          });
        }
      }
    } catch (error) {
      return AppResponse.error({
        res,
        message: "bad request",
        status: 400,
      });
    }
  }
}
export default AuthController;
