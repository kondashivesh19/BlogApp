const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const port = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB first, then set up routes
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("✅ MongoDB connected")

    // API Routes
    app.use("/user-api", require("./APIs/userApi"))
    app.use("/author-api", require("./APIs/authorApi"))
    app.use("/admin-api", require("./APIs/adminApi"))

    // Serve static files
    const frontendPath = path.join(__dirname, "../client/dist")
    app.use(express.static(frontendPath))

    // ✅ FIXED: Use a more specific pattern instead of '*'
    // Handle client-side routing for React/Vue/Angular SPAs
    app.get(/^(?!\/api).*/, (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"))
    })

    // Start server
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`)
    })
  })
  .catch((err) => {
    console.error("❌ Error in database connection:", err)
  })

// Error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err.message)
  res.status(500).send({ message: err.message })
})
