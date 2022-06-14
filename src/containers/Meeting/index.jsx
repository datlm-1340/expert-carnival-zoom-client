import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listMeetings } from 'requests/userRequests'
import AdminBox from 'components/AdminBox'
import { getUser } from 'token'

const Meeting = () => {
  const [meetings, setMeetings] = useState([])
  const user = getUser()
  const isAdmin = user.role === 'admin'

  useEffect(() => {
    listMeetings().then((res) => {
      setMeetings(res.data)
    })
  }, [])

  const meetingsNodes = meetings.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.metting_id}</td>
        <td>{item.metting_name}</td>
        <AdminBox>
          <td>{item.metting_pw}</td>
          <td>
            <a href={item.start_url}>{item.start_url}</a>
          </td>
        </AdminBox>
        <td>
          <a href={item.url}>{item.url}</a>
        </td>
        <td>
          <Link to={`/zoom/meeting/${item.id}`} className="primary-button">
            Join Meeting {isAdmin ? 'as Manager' : 'as User'}
          </Link>
        </td>
      </tr>
    )
  })

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <table border={1}>
        <thead>
          <tr>
            <th>Meeting ID</th>
            <th>Meeting Name</th>
            <AdminBox>
              <th>Meeting Password</th>
              <th>Start URL</th>
            </AdminBox>
            <th>URL</th>
            <th></th>
          </tr>
        </thead>

        <tbody>{meetingsNodes}</tbody>
      </table>
    </>
  )
}

export default Meeting
