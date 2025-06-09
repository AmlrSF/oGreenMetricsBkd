const Fastify = require("fastify");
const connectDB = require("./Infrastructure/database/mongooseConnection");
const userRoutes = require("./Presenatation/Routes/userRoute");
const companyRoutes = require("./Presenatation/Routes/companyRoute");
const fuelRoutes = require("./Presenatation/Routes/scope1/fuelCombustionRoutes");
const productionRoutes = require("./Presenatation/Routes/scope1/productionRoutes");
const roleRoutes = require("./Presenatation/Routes/RoleRoutes");
const energyConsumptionRoutes = require("./Presenatation/Routes/scope2/energyConsumptionRoutes");
const heatingRoutes = require("./Presenatation/Routes/scope2/heatingRoutes");
const coolingRoutes = require("./Presenatation/Routes/scope2/coolingRoutes");
const goalRoutes = require("./Presenatation/Routes/goalRoutes");
const notificationRoutes = require("./Presenatation/Routes/notificationRoutes");
const { scheduleVerificationCheckEveryMinute } = require('./Infrastructure/Cron/verificationJobs');
scheduleVerificationCheckEveryMinute();


//scope 3
const {
  transport,
  dechets,
  capitalGoods,
  businessTravel,
  purchasedGoodsAndServices,
  EmployesTransport,
} = require("./Presenatation/Routes/scope-3");

//website calculator
const websiteCalc = require("./Presenatation/Routes/site/websitecalcRoutes")
const siteRoutes = require("./Presenatation/Routes/site/siteRoutes")

const report = require("./Presenatation/Routes/report/reportRoutes");

const fastifyCookie = require("fastify-cookie");
const fastifyCors = require("@fastify/cors");

require("dotenv").config();

// Initialize Fastify app
const app = Fastify();

// Register plugins
app.register(require("@fastify/formbody"));
app.register(fastifyCookie);
app.register(fastifyCors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

// Register routes
app.register(userRoutes);
app.register(companyRoutes);
app.register(goalRoutes)
app.register(roleRoutes);

//scope 1
app.register(fuelRoutes);
app.register(productionRoutes);

//scope 2
app.register(energyConsumptionRoutes);
app.register(heatingRoutes);
app.register(coolingRoutes);

//scope 3
app.register(transport);
app.register(dechets);
app.register(capitalGoods);
app.register(businessTravel);
app.register(purchasedGoodsAndServices);
app.register(EmployesTransport);

 
app.register(websiteCalc)
app.register(siteRoutes)
app.register(notificationRoutes)
 
//report
app.register(report);

// Connect to database
connectDB();

// Start the server
const port = process.env.PORT || 3000;
app.listen({ port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running on http://localhost:${port}`);
});
