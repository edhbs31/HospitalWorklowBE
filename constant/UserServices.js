const UserModel = require("../models/cas_users");
// user services is a file to declare every services for user controllers and used in many place
// implementing SOLID principles -> Single Responsibility
exports.getAllUser = async () => {
  return UserModel.find();
};
// find one by payload
exports.findData = async (payload) => {
  return UserModel.findOne(payload);
};
// find only return email user
exports.findUserEmail = async (payload) => {
  return UserModel.findOne(payload).select('email');
};
// create user
exports.createUser = async (payload) => {
  return UserModel.create(payload);
};
// get user by id
exports.getUserById = async (id) => {
  return UserModel.findById(id);
};
// update user
exports.updateUser = async (id, payload) => {
  return UserModel.findByIdAndUpdate(id, payload);
};
// delete user
exports.deleteUser = async (id) => {
  return UserModel.findByIdAndDelete(id);
};

// check string email format is valid format email or not using regex
exports.checkStringEmail = async (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}