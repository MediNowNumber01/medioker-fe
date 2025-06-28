import AccountsPage from '@/features/superadmin/account/AccountsPage'
import SuperAdminAuthGuard from '@/hoc/SuperAdminAuthGuard'
import React from 'react'

const account = () => {
  return (
    <div className='p-8'><AccountsPage/></div>
  )
}

export default SuperAdminAuthGuard(account)