"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState} from "react";
import {RiAccountPinCircleFill} from 'react-icons/ri'
import {AiFillHome,AiOutlineInstagram} from "react-icons/ai"
import {BiSearch} from "react-icons/bi"
import {FiPlusSquare} from "react-icons/fi"
import Modal from './Modal';
import { safeUser } from '../types';

interface MainNavProps {
  user: safeUser | null
}

const MainNav = ({user}:MainNavProps) => {
    const [modal,setmodal] = useState(false);
    const [file,setFile] = useState<File | null>(null);
    const [caption,setCaption] = useState('');
    const [base64,setBase64] = useState('');
    const [loading,setLoading] = useState(false);

    const router = useRouter();

    const handleCloseModal = () => {
        setmodal(false);
    }

    const handleSubmit = async(e: FormEvent) => {
      e.preventDefault();

      if(!file || !caption) return;
      setLoading(true);

      const formData = new FormData();

      formData.append("caption",caption);
      formData.append("file",file);

      try {
        await fetch('/api/createPost',{
          method: "POST",
          body:formData
        });
        setLoading(false);
        router.push(`/users/${user?.id}`)
      } catch(err) {
        setLoading(false)
        throw new Error('Something went wrong')
      }
      setFile(null);
      setCaption('');
      setBase64('');
      setmodal(false);
    }

    const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files?.[0];
      if(!file) return; 
      setFile(file);

      const reader = new FileReader();

      reader.onload = ((e:ProgressEvent<FileReader>) => {
        setBase64(e.target?.result as string);
      })

      reader.readAsDataURL(file);
    }


  return (
    <>
        <div className='md:order-1 lg:flex-[0.20] p-3 flex flex-col w-full md:w-min border-t md:border-t-0 md:border-r border-slate-800 bg-gray-950 justify-center fixed bottom-0 md:justify-normal lg:ml-4 md:p-4 md:fixed md:left-0 md:bottom-0 lg:w-[250px] md:h-screen z-30'>
        <AiOutlineInstagram className='lg:hidden hidden md:block md:mt-6' color='#f2f2f2' size={35}/>
      <div className='hidden lg:block md:mt-6'>
        <Image src="/instagramLogo.svg" alt="Instagram Logo" width={120} height={50} priority/>
      </div>
      <div className='flex md:flex-col md:gap-8 md:items-start w-full justify-center items-center md:mt-16'>
        <Link href="/" className=' flex-1 md:flex md:gap-6 md:items-center'>
          <AiFillHome className='m-auto' size={30} color='#f2f2f2'/>
          <span className='text-white hidden lg:block '>Home</span>
        </Link>
        <Link href="/search" className=' flex-1 md:flex md:gap-6 md:items-center'>
          <BiSearch className='m-auto' size={30} color='#f2f2f2'/>
          <span className='text-white hidden lg:block'>Search</span>
        </Link>
        <div onClick={(e) =>setmodal(true)} className='flex-1 cursor-pointer  md:flex md:gap-6 md:items-center'>
          <FiPlusSquare className='m-auto' size={30} color='#f2f2f2'/>
          <span className='text-white hidden lg:block'>Create</span>
        </div>
        <Link href={`/users/${user?.id}`} className='flex-1  md:flex md:gap-6 md:items-center'>
          {user?.image?<Image src={user.image} alt='Profile Image' className="rounded-full m-auto" width={30} height={30}/>:<RiAccountPinCircleFill className='m-auto' size={30} color='#f2f2f2'/>}
          <span className='text-white hidden lg:block'>Profile</span>
        </Link>
      </div>
    </div>
    <Modal showModal={modal} closeModal={handleCloseModal}>
            <div className="p-4 bg-gray-800 w-full">
                <h1 className="text-white mb-8 text-xl font-medium">Create Post</h1>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col w-full items-center">
                      {base64?<Image className="w-full max-w-xl max-h-[300px] object-contain" src={base64} alt="Preview Img" width={70} height={70} />:
                      <Image className="w-[200px] opacity-70" src="/uploadPostIcon.svg" alt="Post icon" width={70} height={70} />}
                      <button className="bg-blue-500 py-2 px-4 rounded text-white mt-4">
                          <label htmlFor="post-img">
                              <input onChange={handleImageChange} className="hidden w-full h-full" type="file" name="post" id="post-img" />
                                  select from computer
                          </label>
                      </button>
                      
                  </div>
                  <div className="flex flex-col">
                      <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>) => setCaption(e.target.value)} placeholder="Caption..." className="bg-gray-800 p-2 text-white max-w-md mt-12 w-full border border-slate-400/30 rounded outline-none" />
                      <button type='submit' className="bg-blue-500 py-2 px-4 rounded self-end text-white mt-4">{loading?"Posting...":"Post"}</button>
                  </div>
                </form>
            </div>
        </Modal>
    </>
    
  )
}

export default MainNav