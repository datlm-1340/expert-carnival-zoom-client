import { getUser } from 'token'
import { createConsumer } from '@rails/actioncable'

const consumer = getUser() ? createConsumer(`http://localhost:3001/cable?id=${getUser().id}`) : undefined

export default consumer
