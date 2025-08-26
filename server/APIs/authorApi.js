const exp = require("express")
const authorApp = exp.Router()
const expressAsyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const createUser = require("../middlewares/createUser")
const Article = require("../models/articleModel")
const { requireAuth } = require("@clerk/express")
require("dotenv").config()

// Create a new author
authorApp.post("/user", expressAsyncHandler(createUser))

// Create a new article
authorApp.post(
  "/article",
  expressAsyncHandler(async (req, res) => {
    const newArticle = new Article(req.body)
    const savedArticle = await newArticle.save()
    res.status(201).send({ message: "article created", payload: savedArticle })
  }),
)

// All routes with FIXED signInUrl
authorApp.get(
  "/articles",
  // requireAuth({ signInUrl: "/unauthorized" }), // ✅ Fixed
  expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({ isArticleActive: true })
    res.status(200).send({ message: "articles", payload: articles })
  }),
)

authorApp.get(
  "/articles/:authorName",
  requireAuth({ signInUrl: "/unauthorized" }), // ✅ Fixed
  expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({
      "authorData.nameOfAuthor": req.params.authorName,
      isArticleActive: true,
    })
    res.status(200).send({ message: "articles by author", payload: articles })
  }),
)

authorApp.get(
  "/deletedArticles/:authorName",
  requireAuth({ signInUrl: "/unauthorized" }), // ✅ Fixed
  expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({
      "authorData.nameOfAuthor": req.params.authorName,
      isArticleActive: false,
    })
    res.status(200).send({ message: "deleted articles by author", payload: articles })
  }),
)

authorApp.put(
  "/article/:articleId",
  requireAuth({ signInUrl: "/unauthorized" }), // ✅ Fixed
  expressAsyncHandler(async (req, res) => {
    const updatedArticle = await Article.findOneAndUpdate(
      { articleId: req.params.articleId },
      { ...req.body },
      { new: true },
    )
    res.status(200).send({ message: "article updated", payload: updatedArticle })
  }),
)

authorApp.put(
  "/articleDelete/:articleId",
  requireAuth({ signInUrl: "/unauthorized" }), // ✅ Fixed
  expressAsyncHandler(async (req, res) => {
    const updatedArticle = await Article.findOneAndUpdate(
      { articleId: req.params.articleId },
      { ...req.body },
      { new: true },
    )
    const msg = updatedArticle.isArticleActive ? "article restored" : "article deleted"
    res.status(200).send({ message: msg, payload: updatedArticle })
  }),
)

// Unauthorized page
authorApp.get("/unauthorized", (req, res) => {
  res.status(401).send({ message: "Unauthorized. Please log in." })
})

module.exports = authorApp
