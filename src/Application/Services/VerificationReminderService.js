class VerificationReminderService {
  constructor(notificationService, userRepo, companyRepo) {
    this.notificationService = notificationService;
    this.userRepo = userRepo;
    this.companyRepo = companyRepo;
  }

  async checkAndSendUserVerificationReminders() {
    try {
      // Récupérer tous les utilisateurs non vérifiés
      const unverifiedUsers = await this.userRepo.getUnverifiedUsers();
      
      // Pour chaque utilisateur non vérifié, créer une notification
      for (const user of unverifiedUsers) {
        await this.notificationService.createAdminUserReminderNotification(
          user._id,
          `${user.prenom} ${user.nom}`
        );
      }
      
      return {
        success: true,
        count: unverifiedUsers.length,
        message: `${unverifiedUsers.length} rappels de vérification d'utilisateur créés`
      };
    } catch (error) {
      console.error('Error checking user verification status:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  async checkAndSendCompanyVerificationReminders() {
    try {
      // Récupérer toutes les entreprises non vérifiées
      const unverifiedCompanies = await this.companyRepo.getUnverifiedCompanies();
      
      // Pour chaque entreprise non vérifiée, créer une notification
      for (const company of unverifiedCompanies) {
        await this.notificationService.createAdminCompanyReminderNotification(
          company._id,
          company.nom_entreprise
        );
      }
      
      return {
        success: true,
        count: unverifiedCompanies.length,
        message: `${unverifiedCompanies.length} rappels de vérification d'entreprise créés`
      };
    } catch (error) {
      console.error('Error checking company verification status:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  async checkAllVerificationStatuses() {
    const userResults = await this.checkAndSendUserVerificationReminders();
    const companyResults = await this.checkAndSendCompanyVerificationReminders();
    
    return {
      users: userResults,
      companies: companyResults,
      success: userResults.success && companyResults.success
    };
  }
}

module.exports = VerificationReminderService;