'use client'
import store from '@/redux/store'
import env from '@/utils/config/env'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ConfigProvider } from 'antd'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import App from './App'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['500', '600', '700']
})

const antdTheme = {
  token: {
    colorPrimary: '#1a1714',
    colorLink: '#b8935a',
    colorLinkHover: '#c9a76f',
    colorInfo: '#2f5d8a',
    colorSuccess: '#2f7d52',
    colorError: '#b3392c',
    colorWarning: '#b8935a',
    colorText: '#2b2723',
    colorTextHeading: '#1a1714',
    colorBorder: '#e6ddcb',
    colorBgLayout: '#faf7f2',
    fontFamily: 'var(--font-geist-sans)',
    borderRadius: 8,
    controlHeight: 38
  },
  components: {
    Button: {
      colorPrimary: '#1a1714',
      colorPrimaryHover: '#3a3530',
      fontWeight: 500
    },
    Menu: {
      itemSelectedBg: '#1a1714',
      itemSelectedColor: '#faf7f2',
      itemHoverColor: '#b8935a'
    },
    Tabs: {
      inkBarColor: '#b8935a',
      itemSelectedColor: '#1a1714',
      itemHoverColor: '#b8935a'
    },
    Progress: {
      defaultColor: '#b8935a'
    }
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={env.GOOGLE_OAUTH_CLIENT_ID}>
            <AntdRegistry>
              <ConfigProvider theme={antdTheme}>
                <Suspense fallback={null}>
                  <App>{children}</App>
                </Suspense>
              </ConfigProvider>
            </AntdRegistry>
          </GoogleOAuthProvider>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
