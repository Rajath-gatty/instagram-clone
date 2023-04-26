"use client"
import { UserProvider } from "./UserContext"


const UserClientProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <UserProvider>
        {children}
    </UserProvider>
  )
}

export default UserClientProvider