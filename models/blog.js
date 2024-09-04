const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema is a class that we use to create a schema for our data, it is a constructor function


const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        snippet: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    }, { timestamps: true }
);

//when you use model name 'Blog', mongoose will look for a collection called 'blogs' in the database (auto pluralize the model name)
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog; //export the model so that we can use it in other files


