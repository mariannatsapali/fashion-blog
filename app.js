//jshint esversion:6

//Required packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require("mongoose");

//Connect to mongoDB database
mongoose.connect("mongodb+srv://mariannatsapali:ckAEKY5URqcALQyV@cluster0.qu01enp.mongodb.net/blogDB");

//Article Schema for database
const articlesSchema = ({
  title: String,
  body: String
});


//Model for the database
const Article = mongoose.model("article", articlesSchema);


const homeStartingContent = "Welcome to the Blog project 'DAILY JOURNAL' ! Add '/compose' to the link above in order to write and publish your article to this public Blog.";
const aboutContent = "This is a Blog project created for educational perposes by Maria Anna Tsapali. I hope you enjoy it!";
const contactContent = "Leave your feedback by sending an email at marianna.tsapali718@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  try {
    Article.find({}, function(err, articlesFound) {
      if (!err) {
        res.render("home", {
          homeStartingContent: homeStartingContent,
          articles: articlesFound
        });
      } else
        console.log(err);
    });
  } catch {
    console.log("Error in GET to home route request.");
  }

});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});


app.get("/articles/:articleId", (req, res) => {


  Article.findOne({
    _id: req.params.articleId
  }, function(err, articleFound) {
    if (!err) {
      res.render("post", {
        articleTitle: articleFound.title,
        articleBody: articleFound.body
      });

    } else
      console.log(err);
  });

});


app.post("/compose", function(req, res) {

  //New article
  const newArticle = new Article({
    title: req.body.newContentTitle,
    body: req.body.newContentBody
  });

  //Save new article into database
  newArticle.save(function(err) {
    if (!err)
      console.log("Article is posted succesfully!");
    res.redirect("/");
  });

});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
