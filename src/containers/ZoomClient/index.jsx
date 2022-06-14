import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ZoomMtg } from '@zoomus/websdk'

import '../../App.css'
import { getMeeting } from 'requests/userRequests'
import consumer from 'consumer'

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.4.0/lib', '/av')
ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

const ZoomClient = () => {
  const params = useParams()

  let leaveUrl = '/zoom/thanks'
  let tk = ''

  let channel
  let meeting

  useEffect(() => {
    getMeeting({ id: params.id }).then((res) => {
      meeting = res.data
      startMeeting(meeting)
    })

    channel = consumer.subscriptions.create(
      {
        channel: 'ZoomChannel',
        room: `rain-${params.id}`,
      },
      {
        disconnected() {
          this.send({
            type: 'left',
            user_id: meeting.user_id,
          })
        },
      },
    )
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
            console.log('success', success)

            channel.send({
              type: 'joined',
              user_id: meeting.user_id,
            })
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
