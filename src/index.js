const Fastify = require('fastify');
const connectDB = require('./Infrastructure/database/mongooseConnection');

const app = Fastify();
const dotenv = require('dotenv').config();

const userRoutes = require('./Presenatation/Routes/userRoute'); // Adjust the path if needed



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
