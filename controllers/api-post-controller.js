const Post = require('../models/post')

const handleError = (res, error) => {
	console.log(error)
	res.status(500).send(error.message)
}

const getPosts = (req, res) => {
	Post
		.find()
		.then((posts) => res.status(200).json(posts))
		.catch((error) => handleError(res,error))
}

const getPost = (req, res) => {
	Post
		.findById(req.params.id)
		.then((post) => res.status(200).json(post))
		.catch((error) => handleError(res, error))
}

const editPost = (req, res) => {
	const { title, text } = req.body;
	const { id } = req.params;
	Post
		.findByIdAndUpdate(id, { title, text }, { new: true})
		.then((post) => res.status(200).json(post))
		.catch((error) => handleError(res, error))
}

const deletePost = (req, res) => {
	Post
		.findByIdAndDelete(req.params.id)
		.then(() => res.status(200).json(req.params.id))
		.catch((error) => handleError(res, error))
}

const addPost = (req, res) => {
	const { title, text } = req.body;
	const post = new Post({ title, text })
	post
		.save()
		.then((post) => res.status(200).json(post))
		.catch((error) =>  handleError(res, error)
		)
}






module.exports = {
	getPosts,
    getPost,
	editPost,
	deletePost,
	addPost
}