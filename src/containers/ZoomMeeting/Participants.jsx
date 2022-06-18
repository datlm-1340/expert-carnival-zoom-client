import React, { useState, useEffect } from 'react'
import { getParticipants } from 'requests/zoomRequests'
import styles from './styles.module.css'

const Participants = () => {
  const [participants, setParticipants] = useState([])
  const [show, setShow] = useState(false)
  const [user, setUserInfo] = useState({})

  useEffect(() => {
    getParticipants().then((res) => {
      if(res.data.length > 0) {
        setParticipants(res.data)
      }
    })
  }, [])

  const handleClose = () => setShow(false)
  const handleShow = (user) => {
    setUserInfo(user)
    setShow(true)
  }

  const nodes = participants.map((p, i) => {
    return (
      <div key={i} className={styles.user_info}>
        <span>
          [{p.role}] {p.email}
        </span>

        <button
          className={styles.btn_view_profile}
          onClick={() => handleShow(p)}
        >
          View Profile
        </button>
      </div>
    )
  })

  return (
    <>
      <aside className={styles.aside}>{nodes}</aside>
      {show && (
        <div id="id01" className={styles.modal}>
          <div className={styles.modal_content}>
            <header className="w3-container w3-teal">
              <h2>User Info</h2>
            </header>
            <div className={styles.w3_container}>
              <p>
                <h4>
                  <b>Id: </b>
                  {user.id}
                </h4>
              </p>
              <p>
                <h4>
                  <b>Email: </b>
                  {user.email}
                </h4>
              </p>
              <p>
                <h4>
                  <b>Role: </b>
                  {user.role}
                </h4>
              </p>
            </div>
            <footer className="w3-container w3-teal">
              <button className={styles.btn_close} onClick={handleClose}>
                close
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}

export default Participants
