const DB = require("../../db/connect.js");

class Auth {
  static async register(data: any) {
    const trx = await DB.transaction();
    try {
      const user = await trx.insert(data).into("users");
      const wallet = DB("wallets")
        .insert({ user_id: user[0] })
        .transacting(trx);
      await trx.commit();
      return user[0];
    } catch (error) {
      await trx.rollback();
      return false;
    }
  }
}

export default Auth;
