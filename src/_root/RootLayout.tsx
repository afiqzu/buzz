import Topbar from '@/components/shared/Topbar.tsx'
import LeftSideBar from '@/components/shared/LeftSideBar.tsx'
import { Outlet } from 'react-router-dom'
import BottomBar from '@/components/shared/BottomBar.tsx'

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSideBar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <BottomBar />
    </div>
  )
}
export default RootLayout
