const express = require("express");
const path = require("path");
const { title } = require("process");
const app = express();
const createPath = (page) => path.resolve("ejs-views", `${page}.ejs`);
const PORT = 3000;
const mongoose = require('mongoose');
const { error } = require("console");
const db = 'mongodb+srv://Burt:Pass123@cluster0.2uhl9s5.mongodb.net/Db_name?retryWrites=true&w=majority'
const Post = require('./models/post')

mongoose 
.connect(db, { useNewUrlParser: true })
.then((res, req) => console.log('db connected'))
.catch((error) => console.log(error))

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "")));
app.use(express.urlencoded({extended: false}));

app.listen(PORT);

app.post("/add-post", (req, res) => {
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
app.get("/", (req, res) => {
	const title = "Home";
	res.render(createPath("index"), { title });
});
app.get("/about", (req, res) => {
	const title = "About";
	res.render(createPath("about"), { title });
});
app.get("/posts/:id", (req, res) => {
	const title = "Post";
	Post
		.findById(req.params.id)
		.then((post) => res.render(createPath("post"), { title, post }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title })
		})
});
app.delete("/posts/:id", (req, res) => {
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
app.get("/posts", (req, res) => {
	const title = "Posts";
	Post
		.find()
		.then((posts) => res.render(createPath("posts"), { title, posts }))
		.catch((error) => {
			console.log(error);
			res.render(createPath('error'), { title })
		})
});
app.get("/post", (req, res) => {
	const title = "Post";
	res.render(createPath("post"), { title });
});
app.get("/add-post", (req, res) => {
	const title = "AddPosts";
	res.render(createPath("add-post"), { title });
});
app.use((req, res) => {
  const title = "ERROR"
	res.render(createPath("error"), { title });
});
