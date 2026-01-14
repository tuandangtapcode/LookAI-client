import { io } from 'socket.io-client'
import env from './env'

const socket = io(`${env.ROOT_SERVER_URL}`, {
  autoConnect: false
})

export default socket
