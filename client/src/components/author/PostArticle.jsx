import axios from "axios"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import {userContextObj} from '../../contexts/UserContext'
import { useNavigate } from "react-router-dom"
import "./PostArticle.css"

function PostArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const { currentUser } = useContext(userContextObj)
  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    console.log(formData)
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl,
    }
    formData.authorData = authorData
    formData.articleId = Date.now()
    const currentDate = new Date()
    formData.dateOfCreation =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      currentDate.toLocaleTimeString("en-US", { hour12: true })
    formData.dateOfModification =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      currentDate.toLocaleTimeString("en-US", { hour12: true })
    formData.comments = []

    try {
      const res = await axios.post("/author-api/article", formData)
      console.log(res)
      reset()
      if (res.status === 201) {
        navigate(`/author-profile/${currentUser.email}/articles`)
      } else {
        console.log("error got")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="post-article-container w-100">
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="form-title">Create New Article</h2>
          {/* <p className="form-subtitle">Share your thoughts with the world</p> */}
        </div>

        <form className="article-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">
            {/* Left Column - Title and Category */}
            <div className="left-column">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  <span className="label-text">Title</span>
                  <span className="label-required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.title ? "error" : ""}`}
                  id="title"
                  placeholder="Enter your article title..."
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="error-message">{errors.title.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  <span className="label-text">Category</span>
                  <span className="label-required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.category ? "error" : ""}`}
                  id="category"
                  placeholder="e.g. Technology, Health, Lifestyle..."
                  {...register("category", { required: "Category is required" })}
                />
                {errors.category && <p className="error-message">{errors.category.message}</p>}
              </div>

              {/* Button for desktop - hidden on mobile */}
              <button className="submit-btn desktop-btn" type="submit">
                <span className="btn-text">Publish Article</span>
                <span className="btn-icon">📝</span>
              </button>
            </div>

            {/* Right Column - Content */}
            <div className="right-column">
              <div className="form-group">
                <label htmlFor="content" className="form-label">
                  <span className="label-text">Content</span>
                  <span className="label-required">*</span>
                </label>
                <textarea
                  className={`form-textarea ${errors.content ? "error" : ""}`}
                  id="content"
                  rows="8"
                  placeholder="Write your article content here..."
                  {...register("content", { required: "Content is required" })}
                ></textarea>
                {errors.content && <p className="error-message">{errors.content.message}</p>}
              </div>
            </div>
          </div>

          {/* Button for mobile - hidden on desktop */}
          <button className="submit-btn mobile-btn" type="submit">
            <span className="btn-text">Publish Article</span>
            <span className="btn-icon">📝</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostArticle
