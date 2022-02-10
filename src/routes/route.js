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
    preHandler: upload.single("jitu"),
    handler: blogController.addNewBlog,
  },

  {
    method: "POST",
    url: "/api/blog/findone/:Id",
    // schema: findOneBlogSchema,
    handler : blogController.findOneBlog
  },
  {
    method: "GET",
    url: "/api/blog/deleteone/:Id",
    // schema: DeleteOneBlogSchema,
    handler: blogController.delete,
  },
  {
    method: "POST",
    url: "/api/blog/update",
    schema: findOneBlogSchema,
    preHandler: upload.single("jitu"),
    handler: blogController.update,
  },


//  frontEnd URLS
{
  method : "GET",
  url : "/",
  handler : async(req,reply) => {
    return reply.view("/templates/home.ejs", {text : "text"})
  }
},
  {
    method : "GET",
    url : "/Home",
    handler : async(req,reply) => {
      return reply.view("/templates/home.ejs", {text : "text"})
    }
  },

  {
    method : "GET",
    url : "/addblog",
    handler : async(req,reply) => {
      return reply.view("/templates/form.ejs", {text : "text"})
    }
  },

  {
    method : "GET",
    url : "/updateblog",
    handler : async(req,reply) => {
      return reply.view("/templates/update.ejs", {text : "text"})
    }
  },

  {
    method : "GET",
    url : "/api/blog/deleteone/",
    handler : async(req,reply) => {
      return reply.view("/templates/delete.ejs", {text : "text"})
    }
  },
];


module.exports = routes