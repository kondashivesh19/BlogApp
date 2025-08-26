import { Link } from "react-router-dom"
import '../styles/Footer.css'
function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto">
      {/* Main Footer Content */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Blog Info Section */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-primary mb-3">📝 BlogHub</h5>
            <p className="text-light mb-3">
              Your go-to platform for sharing stories, insights, and connecting with fellow writers and readers from
              around the world.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-light social-link">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-primary mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="#" className="text-light footer-link">
                  Categories
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-light footer-link">
                  Authors
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-light footer-link">
                  Trending
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-light footer-link">
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-primary mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="#" className="text-light footer-link">
                  Technology
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-light footer-link">
                  Lifestyle
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-light footer-link">
                  Business
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-light footer-link">
                  Health
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-light footer-link">
                  Travel
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="col-lg-4 col-md-6">
            <h6 className="text-primary mb-3">Stay Updated</h6>
            <p className="text-light mb-3">
              Subscribe to our newsletter and never miss the latest articles and updates.
            </p>
            <form className="newsletter-form">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control bg-secondary border-0 text-white"
                  placeholder="Enter your email"
                  aria-label="Email"
                />
                <button className="btn btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
            <small className="text-muted">We respect your privacy. Unsubscribe at any time.</small>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-top border-secondary">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-muted">© 2024 BlogHub. All rights reserved.</p>
            </div>
            <div className="col-md-6">
              <ul className="list-inline mb-0 text-md-end">
                <li className="list-inline-item">
                  <Link to="#" className="text-muted footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#" className="text-muted footer-link">
                    Terms of Service
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#" className="text-muted footer-link">
                    Contact
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#" className="text-muted footer-link">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
