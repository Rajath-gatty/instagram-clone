"use client"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { safeUser } from "../types"

interface ProfileCardProps {
  user: safeUser
}

const ProfileCard = ({user}:ProfileCardProps) => {
    const pathname = usePathname();
    let show=true;
    if(pathname?.startsWith("/users")|| pathname==='/profile') {
      show=false;
    }
  return (
    <>
    {show?<div className='order-3 h-full hidden lg:block flex-[0.4]'>
    <div className='lg:flex gap-3  p-4 justify-between mt-14'>
      <div className='flex gap-6'>
        <div className='w-[60px] h-[60px]'>
          <Image className='rounded-full w-[60px] h-[60px]' src={user?.image?user.image:"/profile.jpg"} alt='Profile' width={60} height={60}/>
        </div>
        <div>
          <p className='text-gray-200 font-medium'>{user?.name}</p>
          <p className='text-gray-400'>{(user?.name as string).toUpperCase()}</p>
        </div>
      </div>
      <span 
        onClick={() => signOut()}
        className='text-red-700 justify-self-end self-center cursor-pointer'
        >
        Logout
      </span>
    </div>
  </div>:null}
  </>
  )
}

export default ProfileCard;