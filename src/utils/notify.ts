import { notification } from 'antd'

const notify = (type: 'success' | 'error', msg: string) => {
  switch (type) {
    case 'success':
      return notification.success({
        message: msg,
        duration: 4,
        showProgress: true,
        pauseOnHover: false
      })
    case 'error':
      return notification.error({
        message: msg,
        duration: 4,
        showProgress: true,
        pauseOnHover: false
      })
  }
}

export default notify
