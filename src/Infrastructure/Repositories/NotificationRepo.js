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
      return await Notification.find({ 
        user_id: userId,
        type: { $in: ['goal_achieved', 'info', 'warning'] }
      })
        .populate('goal_id', 'name year')
        .sort({ createdAt: -1 })
        .lean();
    } catch (error) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }
  }

  async getAdminNotificationsByType(type) {
    try {
      return await Notification.find({ type: type })
        .populate({
          path: 'entity_id',
          select: 'nom_entreprise prenom nom email isVerified'
        })
        .sort({ createdAt: -1 })
        .lean();
    } catch (error) {
      throw new Error(`Failed to fetch admin notifications: ${error.message}`);
    }
  }

  async getAllAdminNotifications() {
    try {
      return await Notification.find({ 
        type: { $in: ['admin_user_reminder', 'admin_company_reminder'] }
      })
        .populate({
          path: 'entity_id',
          select: 'nom_entreprise prenom nom email isVerified'
        })
        .sort({ createdAt: -1 })
        .lean();
    } catch (error) {
      throw new Error(`Failed to fetch admin notifications: ${error.message}`);
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