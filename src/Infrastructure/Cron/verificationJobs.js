// Infrastructure/Cron/verificationJobs.js
const cron = require('node-cron');
const UserRepo = require("../Repositories/userRepo");
const CompanyRepo = require("../Repositories/companyRepo");
const NotificationRepo = require("../Repositories/NotificationRepo");
const NotificationService = require("../../Application/Services/NotificationService");
const VerificationReminderService = require("../../Application/Services/VerificationReminderService");

// Initialiser les services
const userRepo = new UserRepo();
const companyRepo = new CompanyRepo();
const notificationRepo = new NotificationRepo();
const notificationService = new NotificationService(notificationRepo);
const verificationReminderService = new VerificationReminderService(
  notificationService,
  userRepo,
  companyRepo
);

// Fonction pour exécuter la vérification
const runVerificationChecks = async () => {
  console.log('Running scheduled verification checks...');
  try {
    const results = await verificationReminderService.checkAllVerificationStatuses();
    console.log('Verification check completed:', results);
  } catch (error) {
    console.error('Error in scheduled verification check:', error);
  }
};
 
const scheduleVerificationCheckEveryMinute = () => {
  cron.schedule('* * * * *', runVerificationChecks);
  console.log('Scheduled verification checks every minute');
};

module.exports = {
  scheduleVerificationCheckEveryMinute,
  runVerificationChecks
};
