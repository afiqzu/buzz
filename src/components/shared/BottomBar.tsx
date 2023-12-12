import { Link, useLocation } from 'react-router-dom'
import { bottombarLinks } from '@/constants'

const BottomBar = () => {
  const { pathname } = useLocation()
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${
              isActive && 'bg-primary-500 rounded-[10px]'
            } flex-center flex-col gap-1 py-3 px-5 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={30}
              height={30}
              className={`${isActive && 'invert-white'}`}
            />
          </Link>
        )
      })}
    </section>
  )
}
export default BottomBar
