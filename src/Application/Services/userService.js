class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async registerUser(prenom, nom, email, mot_de_passe, role,AdminRoles) {
    return await this.userRepository.registerUser(
      prenom,
      nom,
      email,
      mot_de_passe,
      role,
      AdminRoles
    );
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
  async changePassword(userId, currentPassword, newPassword) {
    return await this.userRepository.changePassword(userId, currentPassword, newPassword);
  }

  async sendOTP(email){
    return await this.userRepository.sendPasswordResetOtpEmail(email);
  }

  async findOTPByEmail(email){
    return await this.userRepository.findOTPByEmail(email);
  }
  
  async deleteOTPByEmail (email){
    return await this.userRepository.deleteOTPByEmail(email);
  }

  async resetPassword(email, newPass){
    return await this.userRepository.resetPassword(email, newPass)
  }

  async getUserByEmail(email){
    return await this.userRepository.getUserByEmail(email);
  }

  async createResetToken(email){
    return await this.userRepository.createResetToken(email)
  }

  async verifyAndDeleteResetToken(email, token){
    return await this.userRepository.verifyAndDeleteResetToken(email, token);
  }

  async inviteUser(user){
    return await this.userRepository.sendEmailInvitation(user);
  }
  
} 

module.exports = UserService;
