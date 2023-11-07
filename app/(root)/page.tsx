import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'

async function Home() {
  const user = await currentUser()
  if (!user) return null
  const userInfo = await fetchUser(user.id)

  return <h1 className="head-text text-left"></h1>
}

export default Home
