import { getUser } from 'token'
import { createConsumer } from '@rails/actioncable'

const consumer = getUser() ? createConsumer(`${process.env.REACT_APP_API_ENDPOINT}/cable?id=${getUser().id}`) : undefined

export default consumer
