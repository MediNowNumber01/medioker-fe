import UserAccountsPage from '@/features/superadmin/account/user/UserPage'
import SuperAdminAuthGuard from '@/hoc/SuperAdminAuthGuard'
import { User } from 'lucide-react'
import React from 'react'

const users = () => {
  return (
    <div className='p-8'><UserAccountsPage/></div>
  )
}

export default SuperAdminAuthGuard(users)