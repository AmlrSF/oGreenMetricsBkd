class UserService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async getAllUsers() {
      return await this.userRepository.getAllUsers();
    }
  
    async registerUser(prenom, nom, email, mot_de_passe,role) {
      return await this.userRepository.registerUser(prenom, nom, email, mot_de_passe,role);
    }
  
    async loginUser(email, mot_de_passe) {
      return await this.userRepository.loginUser(email, mot_de_passe);
    }
  
    async getUserById(id) {
      return await this.userRepository.getUserById(id);
    }
  
    async updateUser(id, updateData) {
      return await this.userRepository.updateUser(id, updateData);
    }
  
    async deleteUser(id) {
      return await this.userRepository.deleteUser(id);
    }
 
  }
  
module.exports = UserService;
  