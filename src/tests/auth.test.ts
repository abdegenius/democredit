import AuthController from "../controllers/auth";
import User from "../models/users";
import Auth from "../models/auth";
import bcrypt from "bcryptjs";
import * as Karma from "../utils/karma";

jest.mock("../models/users");
jest.mock("../models/auth");
jest.mock("../utils/karma");

describe("Login", () => {
  test("should throw error if credentials invalid", async () => {
    jest.spyOn(User, "findByEmail").mockResolvedValueOnce([]);
    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false as never);

    await AuthController.login(
      {
        body: {
          email: "test@user.com",
          password: "Tu0000##2",
        },
      } as any,
      { status: () => ({ json: () => {} }) } as any
    );
    expect(User.findByEmail).toHaveBeenCalled();
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  test("should return success if user is returned and password matches", async () => {
    jest
      .spyOn(User, "findByEmail")
      .mockResolvedValueOnce([{ id: 1, password: "12323232" }]);

    jest
      .spyOn(bcrypt, "compare")
      .mockResolvedValueOnce(true as unknown as never);

    await AuthController.login(
      {
        body: {
          email: "test@user.com",
          password: "Tu0000##2",
        },
      } as any,
      { status: () => ({ json: () => {} }) } as any
    );

    expect(User.findByEmail).toHaveBeenCalled();

    expect(bcrypt.compare).toHaveBeenCalled();
  });
});

describe("Register", () => {
  test("should check if user already exist", async () => {
    jest.spyOn(User, "findByPhone").mockResolvedValueOnce("12112");
    await AuthController.register(
      {
        body: {
          phone: "3809232833232",
        },
      } as any,
      { status: () => ({ json: () => {} }) } as any
    );
    expect(User.findByPhone).toHaveBeenCalled();
    expect(Karma.checkPhone).not.toHaveBeenCalled();
  });

  test("should register user", async () => {
    jest.spyOn(User, "findByPhone").mockResolvedValueOnce("");
    jest.spyOn(User, "findByEmail").mockResolvedValueOnce("");
    jest.spyOn(Auth, "register").mockResolvedValueOnce({});
    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("password" as unknown as never);

    await AuthController.register(
      {
        body: {
          phone: "3809232833232",
        },
      } as any,
      { status: () => ({ json: () => {} }) } as any
    );

    expect(Auth.register).toHaveBeenCalled();
    expect(Karma.checkPhone).toHaveBeenCalled();
    expect(User.findByEmail).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalled();
  });
});
