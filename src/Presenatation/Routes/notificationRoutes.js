const NotificationRepo = require("../../Infrastructure/Repositories/NotificationRepo");
const NotificationService = require("../../Application/Services/NotificationService");
const NotificationController = require("../Controllers/NotificationController");

async function notificationRoutes(fastify, options) {
  const notificationRepo = new NotificationRepo();
  const notificationService = new NotificationService(notificationRepo);
  const notificationController = new NotificationController(notificationService);

  // Get all user notifications
  fastify.get('/notifications/:user_id', (req, reply) => 
    notificationController.getUserNotifications(req, reply));

  // Get admin user notifications
  fastify.get('/admin/notifications/users', (req, reply) => 
    notificationController.getAdminUserNotifications(req, reply));

  // Get admin company notifications
  fastify.get('/admin/notifications/companies', (req, reply) => 
    notificationController.getAdminCompanyNotifications(req, reply));

  // Get all admin notifications
  fastify.get('/admin/notifications', (req, reply) => 
    notificationController.getAllAdminNotifications(req, reply));

  // Delete a notification
  fastify.delete('/notifications/:notification_id', (req, reply) => 
    notificationController.deleteNotification(req, reply));
}

module.exports = notificationRoutes;