class BusinessTravelController {
  constructor(businessTravelService) {
    this.businessTravelService = businessTravelService;
  }

  async getBusinessTravels(req, reply) {
    try {
      const businessTravels =
        await this.businessTravelService.getAllBusinessTravels();
      reply.send({ success: true, data: businessTravels });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async getBusinessTravel(req, reply) {
    const { id } = req.params;
    try {
      const businessTravel =
        await this.businessTravelService.getBusinessTravelByCompanyId(id);
      if (businessTravel) {
        reply.send({ success: true, data: businessTravel });
      } else {
        reply
          .status(404)
          .send({
            success: false,
            message: "Business travel record not found",
          });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async registerBusinessTravel(req, reply) {
    try {
      const newBusinessTravel =
        await this.businessTravelService.createBusinessTravel(req.body);
      reply.send({ success: true, data: newBusinessTravel });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async updateBusinessTravel(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedBusinessTravel =
        await this.businessTravelService.updateBusinessTravel(id, updateData);
      if (updatedBusinessTravel) {
        reply.send({ success: true, data: updatedBusinessTravel });
      } else {
        reply
          .status(404)
          .send({
            success: false,
            message: "Business travel record not found",
          });
      }
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async deleteBusinessTravel(req, reply) {
    const { id } = req.params;
    try {
      const isDeleted = await this.businessTravelService.deleteBusinessTravel(
        id
      );
      if (isDeleted) {
        reply.send({
          success: true,
          message: "Business travel record deleted successfully",
        });
      } else {
        reply
          .status(404)
          .send({
            success: false,
            message: "Business travel record not found",
          });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = BusinessTravelController;
