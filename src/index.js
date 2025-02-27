const Fastify = require('fastify');
const connectDB = require('./Infrastructure/database/mongooseConnection');
const userRoutes = require('./Presenatation/Routes/userRoute'); 

const app = Fastify();
const fastifyCookie = require('fastify-cookie');
const fastifyCors = require('@fastify/cors');

require('dotenv').config();



app.register(fastifyCookie);
app.register(fastifyCors, {
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
});

// Register routes
app.register(userRoutes);

//connect
connectDB();


const port = process.env.PORT || 3000;
app.listen({ port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running on http://localhost:${port}`);
});
