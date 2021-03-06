import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ZoomMtg } from '@zoomus/websdk'

import '../../App.css'
import { getMeeting, getMe } from 'requests/userRequests'
import Helmet from 'react-helmet'

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.4.0/lib', '/av')
ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

const ZoomClient = () => {
  const params = useParams()

  let leaveUrl = '/zoom/thanks'
  let tk = ''

  useEffect(() => {
    getMeeting({ id: params.id }).then((res) => {
      const meeting = res.data
      startMeeting(meeting)
    })
  }, [])

  const startMeeting = (meeting) => {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          sdkKey: process.env.REACT_APP_SDK_KEY,
          signature: meeting.signature,
          meetingNumber: meeting.metting_id,
          userName: meeting.user_name,
          userEmail: meeting.user_email,
          passWord: meeting.metting_pw,
          tk,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          },
        })
      },
      error: (error) => {
        console.log(error)
      },
    })
  }

  return <div className="App"></div>
}

export default ZoomClient
