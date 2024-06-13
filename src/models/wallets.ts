const DB = require("../../db/connect.js");

class Wallet {
  static findOne(user_id: any) {
    return DB("wallets").where("user_id", user_id);
  }
  static userBalance(user_id: any) {
    return DB("wallets").select("balance").where("user_id", user_id);
  }
  static async deposit(data: any) {
    const trx = await DB.transaction();
    try {
      const get_wallet = await trx("wallets")
        .select("balance", "id")
        .where("user_id", data.user_id);
      const update_wallet = await trx("wallets")
        .update({ balance: get_wallet[0].balance + data.amount })
        .where("user_id", data.user_id);
      const add_transaction = await trx("transactions").insert({
        wallet_id: get_wallet[0].id,
        type: "credit",
        action: "deposit",
        amount: data.amount,
        description: "Wallet topup",
        extra: {},
        receiving_wallet_id: get_wallet[0].id,
      });
      await trx.commit();
      return true;
    } catch (error) {
      await trx.rollback();
      return false;
    }
  }
  static async withdrawal(data: any) {
    const trx = await DB.transaction();
    try {
      const get_wallet = await trx("wallets")
        .select("balance", "id")
        .where("user_id", data.user_id);
      const update_wallet = await trx("wallets")
        .update({ balance: get_wallet[0].balance - data.amount })
        .where("user_id", data.user_id);
      const add_transaction = await trx("transactions").insert({
        wallet_id: get_wallet[0].id,
        type: "debit",
        action: "withdrawal",
        amount: data.amount,
        description: data.narration,
        extra: data.extra,
        receiving_wallet_id: null,
      });
      await trx.commit();
      return true;
    } catch (error) {
      await trx.rollback();
      return false;
    }
  }
  static async transfer(data: any) {
    const trx = await DB.transaction();
    try {
      const get_sender_wallet = await trx("wallets")
        .select("balance", "id")
        .where("user_id", data.sender_id);
      const get_recipient_wallet = await trx("wallets")
        .select("balance", "id")
        .where("user_id", data.recipient_id);
      const update_sender_wallet = await trx("wallets")
        .update({ balance: get_sender_wallet[0].balance - data.amount })
        .where("user_id", data.sender_id);
      const add_sender_transaction = await trx("transactions").insert({
        wallet_id: get_sender_wallet[0].id,
        type: "debit",
        action: "transfer",
        amount: data.amount,
        description: "Fund transfer",
        extra: {},
        receiving_wallet_id: get_recipient_wallet[0].id,
      });
      const update_recipient_wallet = await trx("wallets")
        .update({ balance: get_recipient_wallet[0].balance + data.amount })
        .where("user_id", data.recipient_id);
      const add_recipient_transaction = await trx("transactions").insert({
        wallet_id: get_recipient_wallet[0].id,
        type: "credit",
        action: "transfer",
        amount: data.amount,
        description: "Fund received",
        extra: {},
        receiving_wallet_id: null,
      });
      await trx.commit();
      return true;
    } catch (error) {
      await trx.rollback();
      return false;
    }
  }
}

export default Wallet;
