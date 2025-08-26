import { SignUp } from "@clerk/clerk-react"

function Register() {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center p-3">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-100",
              card: "w-100",
            },
          }}
        />
      </div>
    </div>
  )
}

export default Register
