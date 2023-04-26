import UserDetails from "@/app/Components/UserDetails";
import getCurrentUser from "@/app/libs/getServerSession";
import { safeUser } from "@/app/types";
import getUserById from "@/app/libs/getUserById";
  
  export async function generateMetadata ({params:{id}}:any) {
    const selectedUser = await getUserById(id);
    return {
      title: selectedUser?.name
    }
  }

  interface ProfileLayoutProps {
    params: {
        id: any
    },
    children: React.ReactNode
  }

const ProfileLayout = async({params:{id},children}:ProfileLayoutProps) => {

    const selectedUser: safeUser | null = await getUserById(id);
    const currentUser: safeUser | null = await getCurrentUser({posts:true});

    if(!selectedUser) throw new Error('Something went wrong');

  return (
    <UserDetails 
    loggedInUser={id===currentUser?.id} 
    showBookmarks={id===currentUser?.id} 
    user={selectedUser} 
    currentUser={currentUser} 
    >
        {children}
    </UserDetails>
  )
}

export default ProfileLayout