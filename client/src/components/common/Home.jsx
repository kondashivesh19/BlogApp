import { useContext, useEffect, useState } from "react"
import { userContextObj } from '../../contexts/UserContext'
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../styles/Home.css"
import Articles from "./Articles"

function Home() {
  const { currentUser, setCurrentUser } = useContext(userContextObj)
  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isCheckingStorage, setIsCheckingStorage] = useState(true)
  const navigate = useNavigate()

  // Check localStorage and redirect if user already has a role
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const savedUserData = localStorage.getItem("userProfile")

      if (savedUserData) {
        try {
          const parsedData = JSON.parse(savedUserData)

          // Check if the saved email matches current user's email
          if (parsedData.email === user?.primaryEmailAddress?.emailAddress && parsedData.role) {
            // Update context with saved data
            setCurrentUser(parsedData)

            // Redirect to appropriate profile page
            navigate(`/${parsedData.role}-profile/${parsedData.email}`)
            return
          } else {
            // Clear localStorage if email doesn't match (different user)
            localStorage.removeItem("userProfile")
          }
        } catch (error) {
          console.error("Error parsing saved user data:", error)
          localStorage.removeItem("userProfile")
        }
      }

      // Update current user with Clerk data
      setCurrentUser((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user?.primaryEmailAddress?.emailAddress,
        profileImageUrl: user.imageUrl,
      }))
    }

    setIsCheckingStorage(false)
  }, [isLoaded, isSignedIn, user, navigate, setCurrentUser])

  // Clear localStorage when user signs out
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      localStorage.removeItem("userProfile")
      setCurrentUser({}) // Clear context
    }
  }, [isLoaded, isSignedIn, setCurrentUser])

  async function onSelectRole(event) {
    const role = event.target.value
    const updatedUser = { ...currentUser, role }
    setCurrentUser(updatedUser)
    setLoading(true)
    setError("")

    try {
      let res = null
      if (role === "author") {
        res = await axios.post("/author-api/user", updatedUser)
      } else if (role === "user") {
        res = await axios.post("/user-api/user", updatedUser)
      } else {
        setError("Admin role handling not implemented.")
        setLoading(false)
        return
      }

      const { message, payload } = res.data
      if (message === role) {
        const finalUserData = { ...updatedUser, ...payload }

        // Update context
        setCurrentUser(finalUserData)

        // Save to localStorage
        localStorage.setItem("userProfile", JSON.stringify(finalUserData))

        setError("")
        navigate(`/${payload.role}-profile/${payload.email}`)
      } else {
        setError(message)
      }
    } catch (err) {
      console.error(err)
      setError("Network or server error occurred.")
    } finally {
      setLoading(false)
    }
  }

  // Show loading while checking localStorage
  if (isCheckingStorage) {
    return (
      <div className="w-100 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
       {!isSignedIn && (
            // <div className="welcome-section">
            //   {/* <p className="signin-message">Please sign in to continue and explore our platform.</p> */}

            // </div>
            <div className="w-100"><Articles/></div>
          )}


          {isSignedIn && (
      <div className="w-100" style={{ maxWidth: "70%" }}>
        <div className="container home-container">
            <>
              <div className="welcome-section">
                <p className="display-5 welcome-title">Welcome, {user.fullName}!</p>
                <p className="welcome-subtitle">Choose your role to get started</p>
              </div>

              <div className="role-selection-container">
                <div className="role-options">
                  {[ "author", "user"].map((role) => (
                    <div className={`role-option ${loading ? "loading" : ""}`} key={role} data-role={role}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        id={`role-${role}`}
                        value={role}
                        onChange={onSelectRole}
                        disabled={loading}
                      />
                      <label className="form-check-label" htmlFor={`role-${role}`}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="error-message">
                    <p className="mb-0">{error}</p>
                  </div>
                )}

                {loading && (
                  <div className="loading-message">
                    <p>Setting up your profile...</p>
                  </div>
                )}
              </div>
            </>
        </div>
      </div>
          )}
    </div>
  )
}

export default Home
