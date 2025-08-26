const exp = require("express")
const userApp = exp.Router()
const User = require("../models/userModel")
const expressAsyncHandler = require("express-async-handler")
const createUser = require("../middlewares/createUser")
const Article = require("../models/articleModel")
const { requireAuth } = require("@clerk/express")
require("dotenv").config()

// Create a new user
userApp.post("/user", expressAsyncHandler(createUser))

// Add comment - FIXED: Use relative path
userApp.put(
  "/comment/:articleID",
  requireAuth({ signInUrl: "/unauthorized" }), // ✅ Fixed
  expressAsyncHandler(async (req, res) => {
    const commentObj = req.body
    const modifiedArticle = await Article.findOneAndUpdate(
      { articleId: req.params.articleID },
      { $push: { comments: commentObj } },
      { new: true },
    )
    res.status(200).send({ message: "comment added", payload: modifiedArticle })
  }),
)

// Unauthorized page
userApp.get("/unauthorized", (req, res) => {
  res.status(401).send({ message: "Unauthorized. Please log in." })
})

module.exports = userApp
