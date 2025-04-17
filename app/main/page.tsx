
import ShareCard from '@/components/share-card'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'
import { getSEOTags } from '@/lib/seo'
import { getServerSession } from 'next-auth'
import React from 'react'


export const metadata = getSEOTags({
  title: 'Main',
  canonicalUrlRelative: 'https://rflect.xyz'
})
const page = async() => {
  const session = await getServerSession(authOptions);

  if(!session){
    return
  }

  const user = session.user.email

  const userInfo = await prisma.user.findUnique({
    where: {email: user}
  })

  if(!userInfo) return


  return (
    <div className='bg-gradient-to-b from-primary to-secondary space-y-2 p-2 flex flex-col justify-center items-center min-h-screen'>
       
        <ShareCard user={userInfo}/>
    </div>
  )
}

export default page