const { response } = require("express")

exports.findOneBlogSchema = {
  description: 'Enter BlogId',
  tags: ['user'],
  summary: 'Return blog on the request Id',
  params: {
    type: 'object',
    properties: {
      Id: {
        type: 'string',
        description: 'Blog Id',
        default : "61cc807122c9818180eab311"
      }
    }
  },
 
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        Blog: {
          type: 'object',
          properties: {
            Id: { type: 'string' },
            title : {type : 'string'},
            author : {type : 'string'},
            body : {type : 'string'},
            date : {type : 'string'},
            photo : {
              type : 'object',
              properties : {
              public_id : {type : 'string'},
              secure_url : {type  : 'string'}
              }
            }
          }
        }
      }
    },
    401 :{
      type : 'null',
      description :  "Bed Request " 

    }

  },
}


exports.DeleteOneBlogSchema = {
  description: 'Enter BlogId',
  tags: ['user'],
  summary: 'Delete blog on the request Id',
  params: {
    type: 'object',
    properties: {
      Id: {
        type: 'string',
        description: 'Blog Id',
        default : "Enter Id which you want to delete"
      }
    }
  },
 
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        Blog: {
          type : "string",  
          description : "Delete the blog"
        }
      }
    },
    401 :{
      type : 'null',
      description :  "Bed Request " 

    }
    
  },
}

exports.fileuplodeschema = {
  description : "Uploding new Blog with file/image ",
  tags : ["Media"],
  summary: 'Adding new blog in the DataBase',
  name : "Upload Media",
  requestBody : {
    // required : true,
    content : {
        schema : {
          type : 'object',
          properties : {
            type : "string",
            format : "base64"
          }
        }
      
    }
  },

  body : {
    requestBody : {
      content : "multipart/form-data",

    },
  },

  response : {
    200 : {
      description  : "hello",
      type : "object",
      blog : {
        han : {type : "string"}
      }
    }
  }

}



// module.exports = findOneBlogSchema
