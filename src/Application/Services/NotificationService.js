class NotificationService {
  constructor(notificationRepo) {
    this.notificationRepo = notificationRepo;
  }

  async createGoalAchievedNotification(userId, goalId, goalName, year) {
    const notificationData = {
      user_id: userId,
      goal_id: goalId,
      message: `Félicitations ! Votre objectif "${goalName}" pour l'année ${year} a été atteint.`,
      type: 'goal_achieved',
      is_read: false,
    };
    return await this.notificationRepo.createNotification(notificationData);
  }

  async createAdminUserReminderNotification(userId, userName) {
    const notificationData = {
      entity_id: userId,
      entity_type: 'Utilisateur',
      message: `Rappel : L'utilisateur "${userName}" est non vérifié depuis 2 heures.`,
      type: 'admin_user_reminder',
      is_read: false,
    };
    return await this.notificationRepo.createNotification(notificationData);
  }

  async createAdminCompanyReminderNotification(companyId, companyName) {
    const notificationData = {
      entity_id: companyId,
      entity_type: 'Company',
      message: `Rappel : L'entreprise "${companyName}" est non vérifiée depuis 2 heures.`,
      type: 'admin_company_reminder',
      is_read: false,
    };
    return await this.notificationRepo.createNotification(notificationData);
  }

  async getUserNotifications(userId) {
    return await this.notificationRepo.getNotificationsByUserId(userId);
  }

  async getAdminUserNotifications() {
    return await this.notificationRepo.getAdminNotificationsByType('admin_user_reminder');
  }

  async getAdminCompanyNotifications() {
    return await this.notificationRepo.getAdminNotificationsByType('admin_company_reminder');
  }

  async getAllAdminNotifications() {
    return await this.notificationRepo.getAllAdminNotifications();
  }

  async deleteNotification(notificationId) {
    return await this.notificationRepo.deleteNotification(notificationId);
  }
}

module.exports = NotificationService;