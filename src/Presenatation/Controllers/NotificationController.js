const mongoose = require('mongoose');

class NotificationController {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  async getNotifications(req, reply) {
    const { user_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return reply.status(400).send({ success: false, message: 'Invalid user ID' });
    }
    try {
      const notifications = await this.notificationService.getUserNotifications(user_id);
      reply.send({ success: true, data: notifications });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async deleteNotification(req, reply) {
    const { notification_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(notification_id)) {
      return reply.status(400).send({ success: false, message: 'Invalid notification ID' });
    }
    try {
      await this.notificationService.deleteNotification(notification_id);
      reply.send({ success: true, message: 'Notification deleted successfully' });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }
}

module.exports = NotificationController;