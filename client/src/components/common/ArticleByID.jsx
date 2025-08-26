import { useState, useContext } from "react"
import { useLocation } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { MdRestorePage } from "react-icons/md"
import { userContextObj } from "../../contexts/UserContext"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import "../styles/ArticleByID.css"

function ArticleByID() {
  const { currentUser } = useContext(userContextObj)
  const { state } = useLocation()
  const [editStatus, setEditStatus] = useState(false)
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()
  const { title, category, content } = state.articleObj
  const { getToken } = useAuth()

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  async function deleteArticle() {
    try {
      const token = await getToken()
      state.articleObj.isArticleActive = false

      const res = await axios.put(
        `/author-api/articleDelete/${state.articleObj.articleId}`,
        state.articleObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (res.data.message === "article deleted") {
        showNotification("Article deleted successfully", "success")
        navigate(`/author-profile/articles/${state.articleObj.articleId}`, {
          state: { articleObj: res.data.payload },
        })
      } else {
        showNotification("Failed to delete article", "error")
      }
    } catch (err) {
      showNotification("Error deleting article", "error")
    }
  }

  async function addComment(e) {
    try {
      const token = await getToken()
      e.preventDefault()
      const commentObj = { comment: e.target.comment.value }

      if (commentObj.comment.trim() === "") {
        showNotification("Please enter a comment", "error")
        return
      }

      e.target.reset()
      commentObj.nameOfUser = currentUser.firstName

      const res = await axios.put(`/user-api/comment/${state.articleObj.articleId}`, commentObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.message === "comment added") {
        showNotification("Comment added successfully", "success")
        navigate(`/user-profile/articles/${state.articleObj.articleId}`, {
          state: { articleObj: res.data.payload },
        })
      } else {
        showNotification("Failed to add comment", "error")
      }
    } catch (err) {
      showNotification("Error adding comment", "error")
    }
  }

  async function restoreArticle() {
    try {
      const token = await getToken()
      state.articleObj.isArticleActive = true

      const res = await axios.put(
        `/author-api/articleDelete/${state.articleObj.articleId}`,
        state.articleObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (res.data.message === "article restored") {
        showNotification("Article restored successfully", "success")
        navigate(`/author-profile/articles/${state.articleObj.articleId}`, {
          state: { articleObj: res.data.payload },
        })
      } else {
        showNotification("Failed to restore article", "error")
      }
    } catch (err) {
      showNotification("Error restoring article", "error")
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title,
      category,
      content,
    },
  })

  function enableEdit() {
    setEditStatus(true)
    reset({
      title: state.articleObj.title,
      category: state.articleObj.category,
      content: state.articleObj.content,
    })
  }

  async function onSubmit(updatedData) {
    try {
      const modifiedData = { ...state.articleObj, ...updatedData }
      const currentDate = new Date()
      const token = await getToken()

      modifiedData.dateOfModification =
        currentDate.getDate() +
        "-" +
        (currentDate.getMonth() + 1) +
        "-" +
        currentDate.getFullYear() +
        " " +
        currentDate.toLocaleTimeString("en-US", { hour12: true })

      const res = await axios.put(
        `/author-api/article/${state.articleObj.articleId}`,
        modifiedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (res.data.message === "article updated") {
        showNotification("Article updated successfully", "success")
        setEditStatus(false)
        navigate(`/author-profile/articles/${state.articleObj.articleId}`, {
          state: { articleObj: res.data.payload },
        })
      } else {
        showNotification("Failed to update article", "error")
      }
    } catch (err) {
      console.error("Update error:", err)
      showNotification("Error updating article", "error")
    }
  }

  return (
    <div className="article-detail-container w-100">
      <div className="container">
        {notification && <div className={`notification ${notification.type}`}>{notification.message}</div>}

        {!editStatus ? (
          <div>
            {/* Article Display View */}
            <div className="article-header">
              <div className="article-header-content">
                <div className="article-title-section">
                  <h1 className="article-main-title">{title}</h1>
                  {currentUser.firstName === state.articleObj.authorData.nameOfAuthor && (
                    <div className="article-actions">
                      <button className="action-btn" onClick={enableEdit}>
                        <FaRegEdit />
                      </button>
                      {state.articleObj.isArticleActive ? (
                        <button className="action-btn" onClick={deleteArticle}>
                          <RiDeleteBin6Fill />
                        </button>
                      ) : (
                        <button className="action-btn" onClick={restoreArticle}>
                          <MdRestorePage />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="author-section">
                  <img
                    src={state.articleObj.authorData.profileImageUrl || "/placeholder.svg"}
                    alt="Author"
                    className="author-avatar-large"
                  />
                  <p className="author-info-text">
                    <span className="author-label">Author: </span>
                    {state.articleObj.authorData.nameOfAuthor}
                  </p>
                </div>
              </div>
            </div>

            <div className="article-content-section">
              <p>{content}</p>
            </div>

            <div className="comments-section">
              <h3 className="comments-title">Comments</h3>
              {state.articleObj.comments.length === 0 ? (
                <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
              ) : (
                state.articleObj.comments.map((commentObj) => (
                  <div key={commentObj._id} className="comment-item">
                    <p className="comment-author">{commentObj?.nameOfUser}</p>
                    <p className="comment-text">{commentObj.comment}</p>
                  </div>
                ))
              )}
            </div>

            {currentUser.firstName != state.articleObj.authorData.nameOfAuthor && (
              <div className="comment-form">
                <form onSubmit={addComment}>
                  <input
                    type="text"
                    className="comment-input"
                    id="comment"
                    name="comment"
                    placeholder="Share your thoughts..."
                  />
                  <button className="submit-btn" type="submit">
                    Add Comment
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="edit-form">
            {/* Article Edit Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  {/* Title */}
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      Title<span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input ${errors.title ? "is-invalid" : ""}`}
                      id="title"
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <div className="error-feedback">{errors.title.message}</div>}
                  </div>

                  {/* Category */}
                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      Category<span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input ${errors.category ? "is-invalid" : ""}`}
                      id="category"
                      {...register("category", { required: "Category is required" })}
                    />
                    {errors.category && <div className="error-feedback">{errors.category.message}</div>}
                  </div>
                </div>

                {/* Content */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="content" className="form-label">
                      Content<span className="required-asterisk">*</span>
                    </label>
                    <textarea
                      className={`form-textarea ${errors.content ? "is-invalid" : ""}`}
                      id="content"
                      {...register("content", { required: "Content is required" })}
                    ></textarea>
                    {errors.content && <div className="error-feedback">{errors.content.message}</div>}
                  </div>
                </div>
              </div>

              <button className="submit-btn" type="submit">
                Update Article
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleByID
