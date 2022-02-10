const fastify = require("fastify")({
  logger: true,
});
const Blog = require("../models/models");
const cloudinary = require("cloudinary").v2;
const multer = require("fastify-multer");
const upload = multer({ dest: "uploads/" });
const mongoose = require("mongoose");
fastify.register(require("fastify-multipart"));

// content parser from fastify-multer
fastify.register(multer.contentParser);

// Get all blogs
exports.blogs = async (req, reply) => {
  try {
    const blogs = await Blog.find();
    // return reply.view("/templates/index.ejs", { text: "text" })
    return blogs; 
    
  } catch (error) {
    fastify.log.error(error);
  }
}

// Find one Blog by given Id
exports.findOneBlog =  async(req, reply) => {
  try {
    
    const blogId  = req.params.Id
    const blog = await Blog.findById(blogId);
    // return(blog)
    if (blog) {
          reply.send(blog);
          // return blogs;
    }
    return "No blog is found by given Id"

  } catch (error) {
    fastify.log.error(error);
    
  }
}

// Add New blog
exports.addNewBlog = async (req, reply) => {

    
  try {

    const { title, desforSeo, author, body, date} = req.body;


    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file, {
      folder: "users",
    });

    const blog = new Blog({
      title,
      desforSeo,
      author,
      body,
      date,
      photo: {
        id: result.public_id,
        secure_url: result.secure_url,
      },

    });
    // save the data in mongoDB
    const data = await blog.save()
    
    reply.code(200).send({
      status: "Success",
      data
    });
  } catch (error) {
    throw error
  }
},

  // Update already saved blog by given id
  (exports.update = async (req, reply) => {

  try {
    
    const blogId = req.body.Id;
    const blog = await Blog.findById(blogId);
    const public_Id = blog.photo.id;
    // return reply.send(public_Id)

    
    if (blog) {

      const file = req.file.path;
      // return file
      await cloudinary.uploader.destroy(public_Id);
      const result = await cloudinary.uploader.upload(file, {
        folder: "users",
      });
      
      const newdetails = req.body;
      const { ...updatedBlog } = {
        newdetails: newdetails,
        photo: {
          id: result.public_id,
          secure_url : result.secure_url
      }};
      // const updatedBlog.photo = {} 
      const updated = await Blog.findByIdAndUpdate(blogId, updatedBlog, {
        new: true,
      });
      
      reply.code(200).send(updated)
      return updated

      
    }
      return "No blog is found by given id ";

  }
  catch (error) {
      throw error;
    }
  });

// Delete one Blog By given id 
exports.delete = async (req, reply) => {
    try {
      const blogId  =  req.params.Id 
      const blog = await Blog.findById(blogId);
      if (blog) {
        const blogId = req.params.Id;
        const public_Id = blog.photo.id;
        await cloudinary.uploader.destroy(public_Id);
        await Blog.findByIdAndDelete(blogId);
        return(`successfully deleted the blog with id ${blogId}`)
      }
      return "No blog is found by given id ";
    } catch (error) {
      throw error;
    }
}
