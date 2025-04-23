class SiteService {
  constructor(siteRepository) {
    this.siteRepository = siteRepository;
  }

  // Get all website data entries
  async getAllSites() {
    return await this.siteRepository.getAllSites();
  }

  // Get all website data entries for a specific user
  async getSitesByUserId(userId) {
    return await this.siteRepository.getSitesByUserId(userId);
  }

  // Get a single website data entry by its ID
  async getSiteById(siteId) {
    return await this.siteRepository.getSiteById(siteId);
  }

  // Create a new website data entry
  async createSite(siteData) {
    return await this.siteRepository.createSite(siteData);
  }

  // Update a website data entry
  async updateSite(siteId, updateData) {
    return await this.siteRepository.updateSite(siteId, updateData);
  }

  // Delete a website data entry
  async deleteSite(siteId) {
    return await this.siteRepository.deleteSite(siteId);
  }
}

module.exports = SiteService;
