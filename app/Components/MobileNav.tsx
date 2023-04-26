"use client"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { FiLogOut } from "react-icons/fi"

interface MobileNavProps {
    isLoggedIn: string
}

const MobileNav = ({isLoggedIn}:MobileNavProps) => {
  return (
    <nav className='p-4 border-b border-blue-50/30 z-30 md:hidden sticky top-0 left-0 w-full bg-gray-950'>
    <div className='flex justify-between items-center'>
      <Image src="/instagramLogo.svg" alt="Instagram Logo" width={120} height={50} priority/>
      {isLoggedIn&&<FiLogOut size={28} onClick={() => signOut()} color="#9e2222"/>}
    </div>
  </nav>
  )
}

export default MobileNav