
const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();



router.get('/create', blogController.blog_create_get);


router.get('/', blogController.blog_index);

// POST handler
router.post('/', blogController.blog_create_post);

// GET specific blog
router.get('/:id', blogController.blog_details);

// DELETE request handler

router.delete('/:id', blogController.blog_delete);


module.exports = router; //export the router object so that it can be used in app.js