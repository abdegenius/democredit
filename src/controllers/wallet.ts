import { Request, Response } from "express";
import { AppResponse } from "../utils/response";
import Wallet from "../models/wallets";
import { verifyBank } from "../utils/karma";
import User from "../models/users";

class WalletController {
  static async deposit(req: Request, res: Response) {
    try {
      const user_id = req.user_id;
      const { amount } = req.body;
      const data = await Wallet.deposit({ user_id, amount });
      if (data) {
        return AppResponse.ok({
          res,
          data: { msg: "deposit successful" },
        });
      } else {
        return AppResponse.error({
          res,
          message: "failed to deposit",
          status: 422,
        });
      }
    } catch (error) {
      return AppResponse.error({
        res,
        message: "bad request",
        status: 400,
      });
    }
  }
  static async withdrawal(req: Request, res: Response) {
    try {
      const user_id = req.user_id;
      const { amount, account_number, bank_code, narration } = req.body;
      const userBalance = await Wallet.userBalance(user_id);
      if (userBalance.length > 0 && userBalance[0].balance >= amount) {
        const bankDetails = await verifyBank(account_number, bank_code);
        if (bankDetails !== null) {
          const data = await Wallet.withdrawal({
            user_id,
            amount,
            extra: bankDetails,
            narration,
          });
          if (data) {
            return AppResponse.ok({
              res,
              data: { msg: "withdrawal successful" },
            });
          } else {
            return AppResponse.error({
              res,
              message: "failed to withdraw",
              status: 422,
            });
          }
        } else {
          return AppResponse.error({
            res,
            message: "failed to verify bank",
            status: 422,
          });
        }
      } else {
        return AppResponse.error({
          res,
          message: "insufficient funds",
          status: 422,
        });
      }
    } catch (error) {
      return AppResponse.error({
        res,
        message: "bad request",
        status: 400,
      });
    }
  }
  static async transfer(req: Request, res: Response) {
    try {
      const user_id = req.user_id;
      const { amount, phone } = req.body;
      const userBalance = await Wallet.userBalance(user_id);
      if (userBalance[0].balance >= amount) {
        const recipient = await User.findByPhone(phone);
        if (recipient.length > 0) {
          if (recipient[0].id !== user_id) {
            const transfer = await Wallet.transfer({
              sender_id: user_id,
              recipient_id: recipient[0].id,
              amount: amount,
            });
            if (transfer) {
              return AppResponse.ok({
                res,
                data: { msg: "transfer successful" },
              });
            } else {
              return AppResponse.error({
                res,
                message: "failed to transfer funds",
                status: 400,
              });
            }
          } else {
            return AppResponse.error({
              res,
              message: "can not transfer to self",
              status: 400,
            });
          }
        } else {
          return AppResponse.error({
            res,
            message: "recipient phone not found",
            status: 400,
          });
        }
      } else {
        return AppResponse.error({
          res,
          message: "insufficient funds",
          status: 422,
        });
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
export default WalletController;
