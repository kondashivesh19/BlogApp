"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth, useUser } from "@clerk/clerk-react"
import "../styles/Articles.css"
import { userContextObj } from "../../contexts/UserContext"

function Articles() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const { isSignedIn, user, isLoaded } = useUser()
  const { currentUser } = useContext(userContextObj)
  console.log(currentUser)

  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: { articleObj } })
  }

  function handleSignInClick() {
    setShowLoginModal(true)
  }

  async function getArticles() {
    try {
      setLoading(true)
      const token = await getToken()
      const res = await axios.get("/author-api/articles")

      if (res.data.message === "articles") {
        setArticles(res.data.payload)
        setError("")
      } else {
        setError(res.data.message || "Failed to fetch articles")
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred while fetching articles")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getArticles()
  }, [])

  if (loading) {
    return (
      <div className="articles-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="articles-container w-100">
      <div className="container">
        <div className="articles-header">
          <h1 className="articles-title">Featured Articles</h1>
          <p className="articles-subtitle">Discover amazing stories and insights from our community</p>
        </div>
        {articles.length > 0 ? (
          <div className="articles-grid">
            {articles.map((articleObj, index) => (
              <div className="article-card" key={articleObj.articleId} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="author-info">
                  <img
                    src={articleObj.authorData.profileImageUrl || "/placeholder.svg"}
                    className="author-avatar"
                    alt="Author"
                  />
                  <p className="author-name">{articleObj.authorData.nameOfAuthor}</p>
                </div>
                <h2 className="article-title">{articleObj.title}</h2>
                <div className="article-content">
                  {articleObj.content.substring(0, 120)}...
                  {isSignedIn ? (
                    <button className="read-more-btn" onClick={() => gotoArticleById(articleObj)}>
                      Read More
                    </button>
                  ) : (
                    <button className="read-more-btn" onClick={handleSignInClick}>
                      Full Article
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <div className="no-articles">
              <p>No articles available at the moment.</p>
            </div>
          )
        )}
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Login Modal */}
        {showLoginModal && (
          <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
            <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="login-modal-header">
                <h3>Please Sign In</h3>
                <button className="login-close-btn" onClick={() => setShowLoginModal(false)}>
                  ×
                </button>
              </div>
              <div className="login-modal-body">
                <div className="login-icon">🔐</div>
                <p>You need to sign in to read the full article and explore more content.</p>
                <div className="login-modal-actions">
                  <button
                    className="login-btn-primary"
                    onClick={() => {
                      setShowLoginModal(false)
                      window.location.href = "/signin"
                    }}
                  >
                    Sign In Now
                  </button>
                  <button className="login-btn-secondary" onClick={() => setShowLoginModal(false)}>
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Articles
