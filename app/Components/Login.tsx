"use client"
import {signIn} from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex gap-6 p-3 mx-auto border items-center max-w-sm w-full border-slate-500/50 mt-10" onClick={() => signIn('google')}>
        <span className="text-white">Login with Google</span>
        <Image src="/google-icon.svg" className="w-[50px] h-[50px]" alt="google logo" width={40} height={40}/>
    </div>
  )
}

export default Login;