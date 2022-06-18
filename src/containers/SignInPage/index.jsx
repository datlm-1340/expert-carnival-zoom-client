import React, { createRef, useEffect } from 'react'
import { signIn } from 'requests/userRequests'
import { setToken, getToken, setUser } from 'token'
import { formData } from 'utils'
import { useNavigate, Link } from 'react-router-dom'
import './styles.css'

const SignInPage = () => {
  const navigate = useNavigate()
  const ref = createRef()
  const token = getToken()

  useEffect(() => {
    if (token) {
      alert('you signed in!!')
      navigate('/')
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()

    const params = { user: formData(ref.current) }
    signIn(params)
      .then((res) => {
        if (res.data.status && res.data.token) {
          setToken(res.data.token)
          setUser(res.data.user)
          navigate('/')
        }
      })
      .catch((errors) => {
        alert('Login information is incorrect')
      })
  }

  return (
    <div className="sign-in-page">
      <div className="card raised">
        <div className="card-body">
          <center>
            <h2 className="my-3">Sign in</h2>
          </center>

          <div id="login" ng-hide="password.show">
            <center>
              <p>Sign in to the Zoom Member Portal to use the Zoom utility!</p>
            </center>
            <div className="form-login">
              <form ref={ref} onSubmit={submit}>
                <div className="form-group">
                  <label className="col-form-label">
                    Email
                    <span className="required">*</span>
                  </label>
                  <div>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-form-label">
                    Password
                    <span className="required">*</span>
                  </label>
                  <div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-form-label">
                    Role
                    <span className="required">*</span>
                  </label>
                  <div>
                    <select name="role" className="form-control" required>
                      <option value="0">User</option>
                      <option value="1">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <Link to="/sign_up">Sign Up?</Link>
                </div>
                <div className="form-group action-panel">
                  <center>
                    <button
                      className="btn ng-isolate-scope btn-primary"
                      type="submit"
                      id="Login"
                    >
                      <div ng-hide="loading">Log in</div>
                    </button>
                  </center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
