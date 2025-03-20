const Fastify = require('fastify');
const connectDB = require('./Infrastructure/database/mongooseConnection');
const userRoutes = require('./Presenatation/Routes/userRoute'); 
const companyRoutes = require('./Presenatation/Routes/companyRoute'); 
const fuelRoutes = require('./Presenatation/Routes/fuelRoutes')
const roleRoutes = require('./Presenatation/Routes/RoleRoutes');
const energyConsumptionRoutes= require('./Presenatation/Routes/energyConsumptionRoutes');
const heatingRoutes = require('./Presenatation/Routes/heatingRoutes');
const coolingRoutes = require('./Presenatation/Routes/coolingRoutes');
const fastifyCookie = require('fastify-cookie');
const fastifyCors = require('@fastify/cors');

require('dotenv').config();

// Initialize Fastify app
const app = Fastify();

// Register plugins
app.register(require('@fastify/formbody'));
app.register(fastifyCookie);
app.register(fastifyCors, {
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
});

// Register routes
app.register(userRoutes);
app.register(companyRoutes);
app.register(fuelRoutes)
app.register(roleRoutes)
app.register(energyConsumptionRoutes);
app.register(heatingRoutes);
app.register(coolingRoutes);
 

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
