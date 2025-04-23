class SiteController {
  constructor(siteService) {
    this.siteService = siteService;
  }

  // Get all website data
  async getSites(req, reply) {
    try {
      const sites = await this.siteService.getAllSites();
      reply.send({ success: true, data: sites });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  // Get websites by user ID
  async getSitesByUserId(req, reply) {
    const { userId } = req.params;
    try {
      const sites = await this.siteService.getSitesByUserId(userId);
      reply.send({ success: true, data: sites });
    } catch (error) {
      reply.status(404).send({ success: false, message: error.message });
    }
  }

  // Register a new website
  async registerSite(req, reply) {
    console.log("Register Site Request Body:", req.body);
  
    try {
      const result = await this.siteService.createSite(req.body);
      console.log("Site created successfully:", result);
      reply.send({ success: true, data: result });
    } catch (error) {
      console.error("Error registering site:", error);
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  // Update an existing website
  async updateSite(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedSite = await this.siteService.updateSite(id, updateData);
      reply.send({ success: true, data: updatedSite });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  // Get a single website by its ID
  async getSite(req, reply) {
    const { id } = req.params;
    try {
      const site = await this.siteService.getSiteById(id);
      reply.send({ success: true, data: site });
    } catch (error) {
      reply.status(404).send({ success: false, message: error.message });
    }
  }

  // Delete a website
  async deleteSite(req, reply) {
    const { id } = req.params;
    try {
      const isDeleted = await this.siteService.deleteSite(id);
      if (isDeleted) {
        reply.send({ success: true, message: "Site deleted successfully" });
      } else {
        reply.status(404).send({ success: false, message: "Site not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = SiteController;
