import User from "../models/users";
import UserController from "../controllers/user";

jest.mock("../models/users");

describe("Profile", () => {
  test("should returns profile", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce([]);

    await UserController.profile(
      {} as any,
      { status: () => ({ json: () => {} }) } as any
    );
    expect(User.findOne).toHaveBeenCalled();
  });
});
