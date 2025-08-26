import Header from "./common/Header.jsx"
import Footer from "./common/Footer.jsx"
import { Outlet } from "react-router-dom"
import { ClerkProvider } from "@clerk/clerk-react"

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Header />
        <div
          className="flex-fill d-flex"
          style={{
            minHeight: 0, // This allows flex item to shrink below content size
            flex: 1,
          }}
        >
          <Outlet />
        </div>
        <Footer />
      </div>
    </ClerkProvider>
  )
}

export default RootLayout
