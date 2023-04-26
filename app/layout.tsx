import './globals.css'
import ProfileCard from './Components/ProfileCard';
import MainNav from './Components/MainNav';
import Login from './Components/Login';
import getCurrentUser from './libs/getServerSession';
import MobileNav from './Components/MobileNav';
import UserClientProvider from './Context/UserClientProvider';

export const metadata = {
  title: 'Instagram Clone',
  description: 'Instagram clone made using HTML,CSS,Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser({posts:false});

  return (
    <html lang="en">
      <body className='bg-gray-950'>
        <div id="modal-root"></div>
        <MobileNav isLoggedIn={currentUser?.id as string} />

      {currentUser?.id?
      <>
        <MainNav user={currentUser}/>
        <div className='flex flex-col md:flex-row h-[90vh] md:ml-[80px] lg:ml-[220px] md:h-screen items-center justify-end'>
        <div className='md:order-2 md:flex-1 h-full w-full m-2 md:m-0'>
          <UserClientProvider>
              {children}
          </UserClientProvider>
        </div>
        <ProfileCard user={currentUser}/>
        </div>
      </>:<Login/>}

      </body>
    </html>
  )
}
