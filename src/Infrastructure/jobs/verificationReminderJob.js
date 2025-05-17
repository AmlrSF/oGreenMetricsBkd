const cron = require('node-cron');
const NotificationService = require('../../Application/Services/NotificationService');
const NotificationRepo = require('../../Infrastructure/Repositories/NotificationRepo');

const User = require('../../Domain/Entities/user');  
const Company = require('../../Domain/Entities/company');

class VerificationReminderJob {
  constructor() {
    this.notificationService = new NotificationService(new NotificationRepo());
  }

  start() {
    // Run every minute (pour les tests, en production on mettrait un intervalle plus long)
    cron.schedule('*/1 * * * *', async () => {
      console.log('Checking for unverified users/companies...')
      await this.checkUnverifiedUsers();
      await this.checkUnverifiedCompanies();
    });
  }

  async checkUnverifiedUsers() {
    try {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

 

      // Check unverified users
      const unverifiedUsers = await User.find({
        isVerified: false,
        createdAt: { $lte: twoHoursAgo },
        lastReminderSent: { $exists: false }
      });
       for (const user of unverifiedUsers) {
        await this.notificationService.createAdminUserReminderNotification(
          user._id,
          `${user.prenom} ${user.nom}`
        );
        await User.findByIdAndUpdate(user._id, { lastReminderSent: new Date() });
      }
    } catch (error) {
      console.error('Error in user verification job:', error);
    }
  }

  async checkUnverifiedCompanies() {
    try {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  

      // Check unverified companies
      const unverifiedCompanies = await Company.find({
        isVerified: false,
        createdAt: { $lte: twoHoursAgo },
        lastReminderSent: { $exists: false }
      });
       for (const company of unverifiedCompanies) {
        await this.notificationService.createAdminCompanyReminderNotification(
          company._id,
          company.nom_entreprise
        );
        await Company.findByIdAndUpdate(company._id, { lastReminderSent: new Date() });
      }
    } catch (error) {
      console.error('Error in company verification job:', error);
    }
  }
}

module.exports = new VerificationReminderJob();