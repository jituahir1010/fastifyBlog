require("dotenv").config();

const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const routes = require("../src/routes/route");
const multer = require("fastify-multer")
const Blog = require("../src/models/models")
const PORT = process.env.PORT;
fastify.register(require("fastify-multipart"));

// swagger documentation 
const   main   = require("./swagger-docs/check.json");
fastify.register(require("fastify-swagger"), main);


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
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// managing the routes
routes.forEach((route, index) => {
  fastify.route(route)
});

// for try

fastify.post("/hello/:id",
  jkl
,(req, reply) => {
  const data = req.params.id;
  reply.send({
    dat : data
  })
})

// fastify.post("/api/blog/findone/:id", jkl, 
// async (req, reply) => {
//   try {
//     const blogId  = req.params.id
//     const blog = await Blog.findById(blogId);
//     // return(blogs)
//     if (blog) {
//           reply.send(blog);
//           // return blogs;
//     }
//     return "No blog is found by given Id"

//   } catch (error) {
//     fastify.log.error(error);
    
//   }
// }
// )




// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info("jai ho ");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();