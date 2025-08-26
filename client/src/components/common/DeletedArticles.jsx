import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import "../styles/Articles.css"
import { useContext } from "react"
import { userContextObj } from '../../contexts/UserContext'

function DeletedArticles() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const { currentUser } = useContext(userContextObj)

  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: { articleObj } })
  }

  async function getArticles() {
    try {
      setLoading(true)
      const token = await getToken()
      console.log(currentUser.firstName)
      const res = await axios.get(`/author-api/deletedArticles/${currentUser.firstName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res)
      if (res.data.message === "deleted articles by author") {
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
                  <button className="read-more-btn" onClick={() => gotoArticleById(articleObj)}>
                    Read More
                  </button>
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
      </div>
    </div>
  )
}

export default DeletedArticles
