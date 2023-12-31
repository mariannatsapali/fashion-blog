//jshint esversion:6

//Required packages
const express = require("express");
require('dotenv').config();

const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require("mongoose");

//Connect to mongoDB database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blogDB");


//Article Schema for database
const articlesSchema = {
  title: String,
  author: String,
  category: String,
  date: Date,
  body: String,
  imageUrl: String,
};

//Model for the database
const Article = mongoose.model("article", articlesSchema);

const homeStartingContent =
  "Discover the latest trends, fashion tips, and style inspiration to transform your wardrobe. From classic elegance to modern chic, we've got you covered. Explore the world of fashion with us and make every outfit a statement.Join us on a journey of self-expression through clothing, and let your inner style shine. Your fashion adventure starts here.";

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");
// Use the favicon middleware to serve the favicon

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.get("/", function (req, res) {
  try {
    Article.find({}, function (err, articlesFound) {
      if (!err) {
        res.render("home", {
          homeStartingContent: homeStartingContent,
          articles: articlesFound,
        });
      } else console.log(err);
    });
  } catch {
    console.log("Error in GET to home route request.");
  }
});

app.get("/articles", function (req, res) {
  try {
    Article.find({}, function (err, articlesFound) {
      if (!err) {
        res.render("articles", {
          articles: articlesFound,
        });
      } else console.log(err);
    });
  } catch {
    console.log("Error in GET to articles route request.");
  }
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/search-results", function (req, res) {
  const query = req.query.query;

  if (query) {
    const regex = new RegExp(_.escapeRegExp(query), "i");
    Article.find({ title: regex }, function (err, articlesFound) {
      if (!err) {
        res.render("search-results", {
          searchResults: articlesFound, // Pass searchResults to the template
        });
      } else {
        console.log("Error in GET to search-results route request:", err);
      }
    });
  } else {
    res.render("search-results", { searchResults: [] }); // Pass an empty array if no search query
  }
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/articles/:articleId/delete", function (req, res) {
  const articleIdToDelete = req.params.articleId;

  // Find the article by ID and remove it from the database
  Article.findByIdAndRemove(articleIdToDelete, function (err) {
    if (!err) {
      console.log("Article deleted successfully!");
      res.redirect("/articles"); // Redirect to the articles page after deletion
    } else {
      console.log("Error deleting article:", err);
      // Handle the error and render an error page or redirect as needed
      res.status(500).send("Internal Server Error");
    }
  });
});

app.get("/articles/:articleId", (req, res) => {
  Article.findOne(
    {
      _id: req.params.articleId,
    },
    function (err, articleFound) {
      if (!err) {
        res.render("post", {
          articleTitle: articleFound.title,
          articleAuthor: articleFound.author,
          articleCategory: articleFound.category,
          articleDate: articleFound.date.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          articleImageUrl: articleFound.imageUrl,
          articleBody: articleFound.body,
        });
      } else console.log(err);
    }
  );
});

// GET route to render the edit form
app.get("/articles/:articleId/edit", async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    res.render("edit", { article: article });
  } catch (err) {
    console.error(err);
    res.redirect("/"); // Handle error, redirect to home for example
  }
});

// POST route to handle the form submission
app.post("/articles/:articleId/edit", async (req, res) => {
  try {
    console.log(req.body); // Log the entire request body to check the received data

    const updatedArticle = {
      title: req.body.newContentTitle,
      author: req.body.newContentAuthor,
      category: req.body.newContentCategory,
      date: req.body.newContentDate,
      body: req.body.newContentBody,
      imageUrl: req.body.newContentImageUrl,
    };

    console.log(updatedArticle); // Log the updatedArticle object

    await Article.findByIdAndUpdate(req.params.articleId, updatedArticle);

    res.redirect(`/articles/${req.params.articleId}`);
  } catch (err) {
    console.error(err);
    res.redirect("/"); // Handle error, redirect to home for example
  }
});

app.post("/compose", function (req, res) {
  const newArticle = new Article({
    title: req.body.newContentTitle,
    author: req.body.newContentAuthor,
    category: req.body.newContentCategory,
    date: req.body.newContentDate,
    body: req.body.newContentBody,
    imageUrl: req.body.newContentImageUrl,
  });

  newArticle.save(function (err) {
    if (!err) {
      console.log("Article is posted successfully!");
    }
    res.redirect("/");
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
