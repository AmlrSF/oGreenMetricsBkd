const WebsiteData = require("../../../Domain/Entities/site/site"); 

class SiteRepo {

  async getAllSites() {
    const sites = await WebsiteData.find().lean();
    return sites;
  }


  async getSitesByUserId(userId) {
    const userSites = await WebsiteData.find({ userId }).lean();
    return userSites;
  }


  async getSiteById(siteId) {
    const site = await WebsiteData.findById(siteId).lean();
    if (!site) {
      throw new Error("Site not found");
    }
    return site;
  }


  async createSite(siteData) {
    const newSite = new WebsiteData(siteData);
    await newSite.save();
    return newSite;
  }

  
  async updateSite(siteId, updateData) {
    const updatedSite = await WebsiteData.findByIdAndUpdate(
      siteId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedSite) {
      throw new Error("Site not found");
    }

    return updatedSite;
  }

  async deleteSite(siteId) {
    const deletedSite = await WebsiteData.findByIdAndDelete(siteId);
    if (!deletedSite) {
      throw new Error("Site not found");
    }
    return deletedSite;
  }
}

module.exports = new SiteRepo();
