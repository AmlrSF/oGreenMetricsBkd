// Web/Controllers/VerificationReminderController.js
class VerificationReminderController {
  constructor(verificationReminderService) {
    this.verificationReminderService = verificationReminderService;
  }

  async checkVerifications(req, reply) {
    try {
      const results = await this.verificationReminderService.checkAllVerificationStatuses();
      
      if (results.success) {
        reply.send({
          success: true,
          message: "Vérification des statuts terminée avec succès",
          data: results
        });
      } else {
        reply.status(500).send({
          success: false,
          message: "Erreur lors de la vérification des statuts",
          data: results
        });
      }
    } catch (error) {
      console.error('Error in verification check:', error);
      reply.status(500).send({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = VerificationReminderController;