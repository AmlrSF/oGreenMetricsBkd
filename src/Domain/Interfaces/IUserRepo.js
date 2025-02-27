class IUserRepository {

  getAllUsers = async () => { throw new Error("Method not implemented: getAllUsers"); };
  getUserById = async (id) => { throw new Error("Method not implemented: getUserById"); };
  createUser = async (name, email, password, role) => { throw new Error("Method not implemented: createUser"); };
  updateUser = async (id, updateData) => { throw new Error("Method not implemented: updateUser"); };
  deleteUser = async (id) => { throw new Error("Method not implemented: deleteUser"); };
  findByEmail = async (email) => { throw new Error("Method not implemented: findByEmail"); };
  registerUser = async (name, email, password) => { throw new Error("Method not implemented: registerUser"); };
  loginUser = async (email, password) => { throw new Error("Method not implemented: loginUser"); };

}

module.exports = IUserRepository;
