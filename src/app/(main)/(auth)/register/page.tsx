import RegisterPage from '@/features/auth/register/RegisterPage'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await auth()
  if (session) return redirect('/')
  return (
    <div>
        <RegisterPage/>
    </div>
  )
}

export default page