const express = require('express');
const router = express.Router();
const { 
	getPosts,
	getPost,
	editPost,
	deletePost,
	addPost

} = require('../controllers/api-post-controller')

router.get("/api/posts", getPosts);

router.get("/api/posts/:id", getPost);

router.put("/api/edit/:id", editPost);

router.delete("/api/posts/:id", deletePost);

router.post("/api/add-post", addPost)

module.exports = router;