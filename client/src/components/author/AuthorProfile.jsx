import { Link, Outlet } from "react-router-dom"
import "../styles/common.css"

function AuthorProfile() {
  return (
    <div className="w-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            Author
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#authorNavbar"
            aria-controls="authorNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="authorNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="articles">
                  Articles
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="article">
                  Add New Article
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="author-articles">
                  Published Articles
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="deleted-articles">
                  Deleted Articles
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex-fill d-flex" style={{ minHeight: 0, flex: 1 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthorProfile
