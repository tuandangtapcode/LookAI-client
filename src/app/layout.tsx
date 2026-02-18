'use client'
import store from '@/redux/store'
import env from '@/utils/config/env'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Geist, Geist_Mono } from 'next/font/google'
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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={env.GOOGLE_OAUTH_CLIENT_ID}>
            <AntdRegistry>
              <App>{children}</App>
            </AntdRegistry>
          </GoogleOAuthProvider>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
