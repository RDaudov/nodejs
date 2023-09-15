const Post = require('../models/post')
const createPath = require('../helpers/create-path')

const handleError = (res, error) => {
	console.log(error)
	res.render(createPath('error'), { title: 'error' });
}

const getPosts = (req, res) => {
	const title = "Posts";
	Post
		.find()
		.then((posts) => res.render(createPath("posts"), { title, posts }))
		.catch((error) => handleError(res,error))
}

const getPost = (req, res) => {
    const title = "Post";
	Post
		.findById(req.params.id)
		.then((post) => res.render(createPath("post"), { title, post }))
		.catch((error) => handleError(res, error))
}

const getEdit = (req, res) => {
    const title = "EditPost";
	Post
		.findById(req.params.id)
		.then((post) => res.render(createPath("edit-post"), { title, post }))
		.catch((error) => handleError(res, error))
}

const editPost = (req, res) => {
	const { title, text } = req.body;
	const { id } = req.params;
	Post
		.findByIdAndUpdate(id, { title, text })
		.then(result => res.redirect(`/posts/${id}`))
		.catch((error) => handleError(res, error))
}

const deletePost = (req, res) => {
	const title = "Post";
	Post
		.findByIdAndDelete(req.params.id)
		.then(result => { 
			res.sendStatus(200);
		})
		.catch((error) => handleError(res, error))
}

const getAddPost = (req, res) => {
		const title = "About";
		res.render(createPath("add-post"), { title });
}

const addPost = (req, res) => {
	const { title, text } = req.body;
	const post = new Post({ title, text })
	post
		.save()
		.then((result) => res.redirect('posts'))
		.catch((error) =>  handleError(res, error)
		)
}






module.exports = {
	getPosts,
    getPost,
	getEdit,
	editPost,
	deletePost,
	getAddPost,
	addPost
}