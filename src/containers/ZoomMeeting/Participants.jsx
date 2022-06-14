import styles from './styles.module.css'
import { useParams } from 'react-router-dom'
import consumer from 'consumer'
import { useEffect, useState } from 'react'

const Participants = () => {
  const [participants, setParticipants] = useState([])
  const params = useParams()

  useEffect(() => {
    consumer.subscriptions.create(
      { channel: 'ZoomChannel', room: `rain-${params.id}` },
      {
        received(data) {
          setParticipants(data.participants)
        },
      },
    )
  }, [])

  const nodes = participants.map((p, i) => {
    return (
      <div key={i}>
        {p.role} {p.email}
      </div>
    )
  })

  return (
    <>
      <aside className={styles.aside}>{nodes}</aside>
    </>
  )
}

export default Participants
