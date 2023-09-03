const express = require('express');
const Post = require('../models/post')
const router = express.Router();
const createPath = require('../helpers/create-path');

router.get("/posts", (req, res) => {
	const title = "Posts";
	Post
		.find()
		.then((posts) => res.render(createPath("posts"), { title, posts }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title })
		})
});

router.get("/posts/:id", (req, res) => {
	const title = "Post";
	Post
		.findById(req.params.id)
		.then((post) => res.render(createPath("post"), { title, post }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title })
		})
});

router.get("/edit/:id", (req, res) => {
	const title = "EditPost";
	Post
		.findById(req.params.id)
		.then((post) => res.render(createPath("edit-post"), { title, post }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title })
		})
});

router.put("/edit/:id", (req, res) => {
	const { title, text } = req.body;
	const { id } = req.params;
	Post
		.findByIdAndUpdate(id, { title, text })
		.then(result => res.redirect(`/posts/${id}`))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title })
		})
});

router.delete("/posts/:id", (req, res) => {
	const title = "Post";
	Post
		.findByIdAndDelete(req.params.id)
		.then(result => { 
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title })
		})
});

router.post("/add-post", (req, res) => {
	const { title, text } = req.body;
	const post = new Post({ title, text })
	post
		.save()
		.then((result) => res.redirect('posts'))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title })
		})
})

module.exports = router;