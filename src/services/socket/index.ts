import socket from '@/utils/config/socket'

const connect = () => socket.connect()
const disconnect = () => socket.disconnect()
const addOnlineUser = (userId: string) => socket.emit('add-online-user', userId)

const SocketService = {
  connect,
  disconnect,
  addOnlineUser
}

export default SocketService
