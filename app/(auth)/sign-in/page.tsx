import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <div className="w-full p-6 m-auto flex items-center justify-center">
      <SignIn appearance={{ baseTheme: dark }} />
    </div>
  )
}
