require("dotenv").config();

const fastify = require("fastify")({ logger: true });
const cors = require('fastify-cors');
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const routes = require("../src/routes/route");
const multer = require("fastify-multer")
const Blog = require("../src/models/models")
const host = '0.0.0.0';
const PORT = process.env.PORT || 3000
fastify.register(require("fastify-multipart"));

//Cors Plugin
fastify.register(cors, { origin: 'http://127.0.0.1:5500' });


// swagger documentation 
const   main   = require("./swagger-docs/mainswag.json");
fastify.register(require("fastify-swagger"), main);

// Register the template Engine
fastify.register(require("point-of-view"), {
  engine: {
    ejs: require("ejs"),
  },
});

// DB connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology : true,
  })
  .then(() => console.log("DB is ready and running"))
  .catch((err) => console.log(err));

//cloudinary configuration

cloudinary.config({
// create your own cloudinary accout and paste your details
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// managing the routes
routes.forEach((route, index) => {
  fastify.route(route)
});


// Run the server!

fastify.listen(PORT, `0.0.0.0` ,function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
