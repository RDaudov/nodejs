const express = require("express");
const path = require("path");
const { title } = require("process");
const app = express();
const methodOverride = require('method-override')
const mongoose = require('mongoose');
require('dotenv').config()
const { error } = require("console");
const Post = require('./models/post')
const postRouter = require('./routes/post-routes')
const postApiRoutes = require('./routes/api-post-routes')
const createPath = require('./helpers/create-path')

mongoose 
.connect(process.env.MONGO_URL, { useNewUrlParser: true })
.then((res, req) => console.log('db connected'))
.catch((error) => console.log(error))

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "")));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use(postRouter)
app.use(postApiRoutes)

app.listen(process.env.postRouter);

app.get("/", (req, res) => {
	const title = "Home";
	res.render(createPath("index"), { title });
});

app.get("/about", (req, res) => {
	const title = "About";
	res.render(createPath("about"), { title });
});

app.use((req, res) => {
  const title = "ERROR"
	res.render(createPath("error"), { title });
});