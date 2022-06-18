import React, { createRef, useEffect } from 'react'
import { signUp } from 'requests/userRequests'
import { formData } from 'utils'
import { useNavigate, Link } from 'react-router-dom'
import { getToken } from 'token'
import './styles.css'

const RegistrationPage = () => {
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
    signUp(params).then((res) => {
      if (res.data.status) {
        navigate('/sign_in')
      }
    })
  }

  return (
    <>
      <div className="card raised">
        <div className="card-body">
          <center>
            <h2 className="my-3">Sign Up</h2>
          </center>

          <div id="login" ng-hide="password.show">
            <center>
              <p>Sign Up to the Zoom Member Portal to use the Zoom utility!</p>
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
                  <label className="col-form-label password-confirm">
                    Password Confirm
                    <span className="required">*</span>
                  </label>
                  <div>
                    <input
                      type="password"
                      id="passwordConfirmation"
                      name="password_confirmation"
                      placeholder="Password Confirmation"
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
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <Link to="/sign_in">Sign In?</Link>
                </div>
                <div className="form-group action-panel">
                  <center>
                    <button
                      className="btn ng-isolate-scope btn-primary"
                      type="submit"
                      id="Login"
                    >
                      <div ng-hide="loading">Sign Up</div>
                    </button>
                  </center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistrationPage
