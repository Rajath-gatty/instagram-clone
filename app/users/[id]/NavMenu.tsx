"use client"
import Link from "next/link";
import {BsGrid3X3,BsBookmarks} from "react-icons/bs";
import { usePathname } from "next/navigation";
import {useState} from "react";

interface NavMenuProps {
    showBookmarks: boolean,
    userId: string
}

const NavMenu = ({showBookmarks,userId}:NavMenuProps) => {
    const [isPostActive, setisPostActive] = useState(true); 
     const pathname = usePathname();


  return (
    <>
    <div className="flex gap-14 justify-center items-center ">
    <Link href={`/users/${userId}`} className={isPostActive?"p-3 border-t border-white":"p-3"} onClick={() => setisPostActive(true)}>
        <div className="text-slate-400 flex gap-2 items-center">
            <BsGrid3X3  size={15}/>
            <span>POSTS</span>
        </div>
    </Link>
    {showBookmarks &&<Link href={`/users/${userId}/saved`} className={pathname===`/users/${userId}/saved`?"p-3 border-t border-white":"p-3"} onClick={() => setisPostActive(false)}>
        <div className="text-slate-400 flex gap-2 items-center">
            <BsBookmarks  size={15}/>
            <span>SAVED</span>
        </div>
    </Link>}
</div></>
  )
}

export default NavMenu;