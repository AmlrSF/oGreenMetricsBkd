// Web/Routes/verificationRoutes.js
const UserRepo = require("../../Infrastructure/Repositories/userRepo");
const CompanyRepo = require("../../Infrastructure/Repositories/companyRepo");
const NotificationRepo = require("../../Infrastructure/Repositories/NotificationRepo");
const NotificationService = require("../../Application/Services/NotificationService");
const VerificationReminderService = require("../../Application/Services/VerificationReminderService");
const VerificationReminderController = require("../Controllers/VerificationReminderController");

async function verificationRoutes(fastify, options) {
  const userRepo = new UserRepo();
  const companyRepo = new CompanyRepo();
  const notificationRepo = new NotificationRepo();
  const notificationService = new NotificationService(notificationRepo);
  const verificationReminderService = new VerificationReminderService(
    notificationService,
    userRepo,
    companyRepo
  );
  const verificationController = new VerificationReminderController(verificationReminderService);

  // Route pour déclencher manuellement la vérification
  fastify.post('/admin/verification-check', {
    preHandler: fastify.auth([fastify.verifyAdminRole]),
    handler: (req, reply) => verificationController.checkVerifications(req, reply)
  });
}

module.exports = verificationRoutes;