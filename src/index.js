const Fastify = require('fastify');
const dotenv = require('dotenv');
const connectDB = require('./infrastructure/database/mongooseConnection');

dotenv.config();

const app = Fastify();


connectDB();



const port = process.env.PORT || 3000;
app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running on ${address}`);
});
