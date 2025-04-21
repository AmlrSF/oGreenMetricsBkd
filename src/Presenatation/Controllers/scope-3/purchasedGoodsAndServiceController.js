class PurchasGoodsAndServiceController {
  constructor(CapitalGoodsAndServiceService) {
    this.CapitalGoodsAndServiceService = CapitalGoodsAndServiceService;
  }

  // Get all capital goods and services
  async getCapitalGoodsAndServices(req, reply) {
    try {
      const capitalGoodsAndServices =
        await this.CapitalGoodsAndServiceService.getAllCapitalGoodsAndServices();
      reply.send({ success: true, data: capitalGoodsAndServices });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  // Get capital good or service by ID
  async getCapitalGoodAndService(req, reply) {
    const { id } = req.params;
    //console.log(id);
    
    try {
      const capitalGoodAndService =
        await this.CapitalGoodsAndServiceService.getCapitalGoodById(id);
      if (capitalGoodAndService) {
        reply.send({ success: true, data: capitalGoodAndService });
      } else {
        reply
          .status(404)
          .send({
            success: false,
            message: "Capital Good and Service not found",
          });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  // Register a new capital good or service
  async registerCapitalGoodAndService(req, reply) {
    try {
      const newCapitalGoodAndService =
        await this.CapitalGoodsAndServiceService.createCapitalGoodAndService(
          req.body
        );
      reply.send({ success: true, data: newCapitalGoodAndService });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  // Update an existing capital good or service
  async updateCapitalGoodAndService(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedCapitalGoodAndService =
        await this.CapitalGoodsAndServiceService.updateCapitalGoodAndService(
          id,
          updateData
        );
      if (updatedCapitalGoodAndService) {
        reply.send({ success: true, data: updatedCapitalGoodAndService });
      } else {
        reply
          .status(404)
          .send({
            success: false,
            message: "Capital Good and Service not found",
          });
      }
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  // Delete a capital good or service
  async deleteCapitalGoodAndService(req, reply) {
    const { id } = req.params;
    try {
      const isDeleted =
        await this.CapitalGoodsAndServiceService.deleteCapitalGoodAndService(
          id
        );
      if (isDeleted) {
        reply.send({
          success: true,
          message: "Capital Good and Service deleted successfully",
        });
      } else {
        reply
          .status(404)
          .send({
            success: false,
            message: "Capital Good and Service not found",
          });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = PurchasGoodsAndServiceController;
