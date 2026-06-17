import { useEffect, useState } from 'react'

const MOBILE_MAX_WIDTH = 768

export const useCheckDeviceScreen = (type: 'pc' | 'mobile') => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < MOBILE_MAX_WIDTH
  })

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_MAX_WIDTH)
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (type === 'pc') return !isMobile
  return isMobile
}
