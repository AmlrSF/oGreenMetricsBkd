const Fastify = require('fastify');
const connectDB = require('./Infrastructure/database/mongooseConnection');
const userRoutes = require('./Presenatation/Routes/userRoute'); 
const companyRoutes = require('./Presenatation/Routes/companyRoute');
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
