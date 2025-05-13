const NotificationRepo = require("../../Infrastructure/Repositories/NotificationRepo");
const NotificationService = require("../../Application/Services/NotificationService");
const NotificationController = require("../Controllers/NotificationController");

async function notificationRoutes(fastify, options) {
  const notificationRepo = new NotificationRepo();
  const notificationService = new NotificationService(notificationRepo);
  const notificationController = new NotificationController(notificationService);

  // Get all notifications for a user
  fastify.get('/notifications/:user_id', (req, reply) => 
    notificationController.getNotifications(req, reply));

  // Delete a notification
  fastify.delete('/notifications/:notification_id', (req, reply) => 
    notificationController.deleteNotification(req, reply));
}

module.exports = notificationRoutes;