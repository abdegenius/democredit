import Wallet from "../models/wallets";
import WalletController from "../controllers/wallet";
import * as Karma from "../utils/karma";
import User from "../models/users";

jest.mock("../models/wallets");
jest.mock("../utils/karma");
jest.mock("../models/users");

describe("Deposit", () => {
  test("should deposit successfully", async () => {
    jest.spyOn(Wallet, "deposit").mockResolvedValueOnce(true);

    await WalletController.deposit(
      { body: { amout: "12291221" }, user_id: 1 } as any,
      { status: () => ({ json: () => {} }) } as any
    );
    expect(Wallet.deposit).toHaveBeenCalled();
  });
});

describe("withdrawal", () => {
  test("should withraw successfully", async () => {
    jest.spyOn(Wallet, "withdrawal").mockResolvedValueOnce(true);
    jest.spyOn(Wallet, "userBalance").mockResolvedValueOnce([{ balance: 20 }]);

    await WalletController.withdrawal(
      { body: { amount: 10 }, user_id: 1 } as any,
      { status: () => ({ json: () => {} }) } as any
    );
    expect(Wallet.withdrawal).toHaveBeenCalled();
    expect(Karma.verifyBank).toHaveBeenCalled();
  });
});

describe("Transfer", () => {
  test("should withraw successfully", async () => {
    jest.spyOn(Wallet, "transfer").mockResolvedValueOnce(true);
    jest.spyOn(Wallet, "userBalance").mockResolvedValueOnce([{ balance: 20 }]);
    jest.spyOn(User, "findByPhone").mockResolvedValueOnce([{ user_id: 2 }]);

    await WalletController.transfer(
      { body: { amount: 10 }, user_id: 1 } as any,
      { status: () => ({ json: () => {} }) } as any
    );
    expect(Wallet.transfer).toHaveBeenCalled();
    expect(User.findByPhone).toHaveBeenCalled();
  });
});
