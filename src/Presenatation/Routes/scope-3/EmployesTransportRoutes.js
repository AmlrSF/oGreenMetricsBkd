const EmployesTransportController = require("../../Controllers/scope-3/EmployesTransportController");
const EmployesTransportService = require("../../../Application/Services/scope-3/EmployesTransportService");
const EmployesTransportRepository = require("../../../Infrastructure/Repositories/scope-3/EmployesTransportRepo");

async function employesTransportRoutes(fastify, options) {
  const employesTransportRepository = new EmployesTransportRepository();
  const employesTransportService = new EmployesTransportService(
    employesTransportRepository
  );
  const employesTransportController = new EmployesTransportController(
    employesTransportService
  );

  fastify.get("/employesTransport", (req, reply) =>
    employesTransportController.getEmployesTransports(req, reply)
  );

  fastify.post("/employesTransport", (req, reply) =>
    employesTransportController.registerEmployesTransport(req, reply)
  );

  fastify.get("/employesTransport/:id", (req, reply) =>
    employesTransportController.getEmployesTransport(req, reply)
  );

  fastify.put("/employesTransport/:id", (req, reply) =>
    employesTransportController.updateEmployesTransport(req, reply)
  );

  fastify.delete("/employesTransport/:id", (req, reply) =>
    employesTransportController.deleteEmployesTransport(req, reply)
  );
}

module.exports = employesTransportRoutes;
