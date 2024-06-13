const DB = require("../../db/connect.js");

class User {
  static findAll() {
    return DB("users");
  }
  static findOne(id: any) {
    return DB("users").where("id", id);
  }
  static findByEmail(email: string) {
    return DB("users").where("email", email);
  }
  static emailExist(email: string) {
    return DB("users").where("email", email).count("id as count");
  }
  static findByPhone(phone: string) {
    return DB("users").where("phone", phone);
  }
  static findIdByPhone(phone: string) {
    return DB("users").select("id").where("phone", phone);
  }
  delete(id: number) {
    return DB("users").where("id", id).del();
  }
  update(id: number, data: any) {
    return DB("users").where("id", id).update(data);
  }
  save(data: any) {
    return DB("users").insert(data);
  }
}

export default User;
