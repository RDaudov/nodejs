const express = require('express');
const router = express.Router();
const { 
	getPosts,
	getPost,
	getEdit,
	editPost,
	deletePost,
	getAddPost,
	addPost,
	getSearchPost,
	searchPost

} = require('../controllers/post-controller')

router.get("/posts", getPosts);

router.get("/posts/:id", getPost);

router.get("/edit/:id", getEdit);

router.put("/edit/:id", editPost);

router.delete("/posts/:id", deletePost);

router.post("/add-post", addPost)

router.get("/add-post", getAddPost)

router.get("/search", getSearchPost)

router.post("/search", searchPost)


module.exports = router;