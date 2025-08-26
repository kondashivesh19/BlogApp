import { SignIn } from "@clerk/clerk-react"

function Login() {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center p-3">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <SignIn
        />
      </div>
    </div>
  )
}

export default Login
