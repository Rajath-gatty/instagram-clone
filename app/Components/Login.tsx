"use client"
import {signIn} from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="max-w-2xl w-full mx-auto">
      <h1 className="text-white text-3xl font-medium mt-6 text-center">Login to continue</h1>
          <button className="flex p-3 mx-auto border items-center max-w-[300px] w-full border-slate-500/50 mt-10 justify-center gap-8 hover:bg-slate-900" onClick={() => signIn('google')}>
        <span className="text-white">Login with Google</span>
        <Image src="/google-icon.svg" className="w-[35px] h-[35px]" alt="google logo" width={30} height={30}/>
    </button>
    </div>

  )
}

export default Login;