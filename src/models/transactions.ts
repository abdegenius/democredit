const DB = require("../../db/connect.js");

class Transaction {
  static findAll() {
    return DB("transactions");
  }
  static findOne(id: any) {
    return DB("transactions").where("id", id);
  }
  delete(id: number) {
    return DB("transactions").where("id", id).del();
  }
  update(id: number, data: any) {
    return DB("transactions").where("id", id).update(data);
  }
  save(data: any) {
    return DB("transactions").insert(data);
  }
}

export default Transaction;
