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

  async getUserNotifications(userId) {
    return await this.notificationRepo.getNotificationsByUserId(userId);
  }

  async deleteNotification(notificationId) {
    return await this.notificationRepo.deleteNotification(notificationId);
  }
}

module.exports = NotificationService;