class CapitalGoodController {
  constructor(capitalGoodService) {
    this.capitalGoodService = capitalGoodService;
  }

  async getCapitalGoods(req, reply) {
    try {
      const capitalGoods = await this.capitalGoodService.getAllCapitalGoods();
      reply.send({ success: true, data: capitalGoods });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async getCapitalGood(req, reply) {
    const { id } = req.params;
    try {
      const capitalGood =
        await this.capitalGoodService.getCapitalGoodByCompanyId(id);
      if (capitalGood) {
        reply.send({ success: true, data: capitalGood });
      } else {
        reply
          .status(404)
          .send({ success: false, message: "Capital Good not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  } 

  async registerCapitalGood(req, reply) {
    try {
      const newCapitalGood = await this.capitalGoodService.createCapitalGood(
        req.body
      );
      reply.send({ success: true, data: newCapitalGood });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async updateCapitalGood(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedCapitalGood =
        await this.capitalGoodService.updateCapitalGood(id, updateData);
      if (updatedCapitalGood) {
        reply.send({ success: true, data: updatedCapitalGood });
      } else {
        reply
          .status(404)
          .send({ success: false, message: "Capital Good not found" });
      }
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async deleteCapitalGood(req, reply) {
    const { id } = req.params;
    try {
      const isDeleted = await this.capitalGoodService.deleteCapitalGood(id);
      if (isDeleted) {
        reply.send({
          success: true,
          message: "Capital Good deleted successfully",
        });
      } else {
        reply
          .status(404)
          .send({ success: false, message: "Capital Good not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = CapitalGoodController;
