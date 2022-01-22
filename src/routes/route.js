const fastify = require("fastify")({ logger: true });
const blogController = require("../controller/controller");
const multer = require("fastify-multer");
const upload = multer({ dest: "uploads/" });

// content parser from fastify-multer
fastify.register(multer.contentParser);

const  jkl  = require("../swagger-docs/ad.json")

const { findOneBlogSchema ,
  DeleteOneBlogSchema, 
  fileuplodeschema
}  = require("../swagger-docs/apiDocs")


// Routes Array
const routes = [
  {
    method: "GET",
    url: "/api/blog/blogs",
    handler: blogController.blogs,
  },
  {
    method: "POST",
    url: "/api/blog/addNewBlog",
    // schema : fileuplodeschema,  
    preHandler: upload.single("jitu"),
    handler: blogController.addNewBlog,
  },

  {
    method: "POST",
    url: "/api/blog/findone/:Id",
    schema: findOneBlogSchema,
    handler : blogController.findOneBlog
  },
  {
    method: "DELETE",
    url: "/api/blog/deleteone/:Id",
    schema: DeleteOneBlogSchema,
    handler: blogController.delete,
  },
  {
    method: "PUT",
    url: "/api/blog/update/:Id",
    schema: findOneBlogSchema,
    preHandler: upload.single("jitu"),
    handler: blogController.update,
  },
];


module.exports = routes