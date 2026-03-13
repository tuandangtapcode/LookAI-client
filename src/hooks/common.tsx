import { Grid } from 'antd'

export const useCheckDeviceScreen = (type: 'pc' | 'mobile') => {
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  if (type === 'pc') return screens.lg
  if (type === 'mobile') return screens.md
  return screens.lg
}
