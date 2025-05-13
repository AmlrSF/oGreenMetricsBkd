const Notification = require('../../Domain/Entities/notificationSchema');

class NotificationRepo {
  async createNotification(notificationData) {
    try {
      const notification = new Notification(notificationData);
      await notification.save();
      return notification;
    } catch (error) {
      throw new Error(`Failed to create notification: ${error.message}`);
    }
  }

  async getNotificationsByUserId(userId) {
    try {
      return await Notification.find({ user_id: userId })
        .populate('goal_id', 'name year')
        .sort({ createdAt: -1 })
        .lean();
    } catch (error) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }
  }

  async deleteNotification(notificationId) {
    try {
      const notification = await Notification.findByIdAndDelete(notificationId);
      if (!notification) {
        throw new Error('Notification not found');
      }
      return notification;
    } catch (error) {
      throw new Error(`Failed to delete notification: ${error.message}`);
    }
  }
}

module.exports = NotificationRepo;
