const env = {
  ROOT_SERVER_URL: String(process.env.NEXT_PUBLIC_ROOT_SERVER_URL),
  ROOT_CLIENT_URL: String(process.env.NEXT_PUBLIC_ROOT_CLIENT_URL),
  HASH_KEY: String(process.env.NEXT_PUBLIC_HASH_KEY),
  PAYOS_WEB_LINK: String(process.env.NEXT_PUBLIC_PAYOS_WEB_LINK)
}

export default env
