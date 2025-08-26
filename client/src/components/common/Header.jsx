import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Header.css"
import { useClerk, useUser } from "@clerk/clerk-react"
import { userContextObj } from "../../contexts/UserContext"

function Header() {
  const { signOut } = useClerk()
  const { currentUser, setCurrentUser } = useContext(userContextObj)
  const { isSignedIn, user, isLoaded } = useUser()
  const navigate = useNavigate()

  //function to signout
  async function handleSignOut() {
    await signOut()
    setCurrentUser(null)
    navigate("/")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-2 header">
        <Link className="navbar-brand" to="">
          LOGO
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#headerNavbar"
          aria-controls="headerNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="headerNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="">
                Home{" "}
              </Link>
            </li>
            {!isSignedIn ? (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="signin">
                    Login
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="signup">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <div className="user-profile-section">
                <div className="user-avatar-container">
                  <img src={user?.imageUrl || "/placeholder.svg"} alt="USER" className="user-avatar" />
                  <div className="user-info">
                    <p className="user-name">{user?.firstName}</p>
                    <p className="user-role">({currentUser?.role})</p>
                  </div>
                </div>
                <button className="btn btn-signout" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
