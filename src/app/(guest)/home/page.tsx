'use client'
import { routes } from '@/utils/constant/route'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  return (
    <div>
      Home
      <Link href={routes.login.source}>asfvbasfv</Link>
    </div>
  )
}

export default Home
