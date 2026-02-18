import { notification } from 'antd'

const notify = (type: 'success' | 'error', msg: string) => {
  switch (type) {
    case 'success':
      return notification.success({
        title: msg,
        duration: 4,
        showProgress: true,
        pauseOnHover: false
      })
    case 'error':
      return notification.error({
        title: msg,
        duration: 4,
        showProgress: true,
        pauseOnHover: false
      })
  }
}

export default notify
