import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations.ts'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext.tsx'

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const navigate = useNavigate()
  const user = useUserContext()

  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess])

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/buzz_logo.png"
            alt="logo"
            width={36}
            height={36}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.user.id}`} className="flex-center gap-3">
            <img
              src={
                user.user.imageUrl || '/assets/icons/profile-placeholder.svg'
              }
              alt="profile-icon"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
export default Topbar
