import React from 'react'
import { useParams } from 'react-router-dom'
import '../../App.css'
import Participants from './Participants'

function ZoomMeeting() {
  const params = useParams()

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting</h1>
      </main>
      <div className="flex">
        <iframe
          width={1280}
          height={720}
          title="client"
          src={`/zoom/client/${params.id}`}
          id="meeting-iframe"
        ></iframe>
        <Participants />
      </div>
    </div>
  )
}

export default ZoomMeeting
