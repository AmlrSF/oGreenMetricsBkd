const ReportRepo = require('../../../Infrastructure/Repositories/report/reportRepo'); 
const ReportService = require('../../../Application/Services/report/reportService');
const ReportController = require('../../../Presenatation/Controllers/report/reportController');
const ShowDataRepo = require("../../../Infrastructure/Repositories/report/ShowDataRepo");
const ShowDataService = require("../../../Application/Services/report/ShowDataService ");


async function reportRoute(fastify, options) {
  const reportRepo = new ReportRepo(); 
  const showCaseRep =  new ShowDataRepo();
  const reportService = new ReportService(reportRepo);
  const showDataService = new ShowDataService(showCaseRep)
  const reportController = new ReportController(reportService, showDataService);

  fastify.get('/reports/:id', (req, reply) => reportController.getReports(req, reply));
  fastify.post('/createReport', (req, reply) => reportController.createReport(req, reply));
  fastify.get('/report/:id', (req, reply) => reportController.getReport(req, reply));
  fastify.put('/updateReport/:id', (req, reply) => reportController.updateReport(req, reply));
  fastify.delete('/deleteReport/:id', (req, reply) => reportController.deleteReport(req, reply));
  fastify.get("/report/full/:company_id", async (req, reply) =>
    reportController.getFullCompanyReport(req, reply)
  );
}

module.exports = reportRoute;
