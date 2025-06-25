"use client"

import useGetAccount from "@/hooks/api/profile/useGetAccount";
import { AddressSection } from "./components/AddressSection"
import { ProfileHeader } from "./components/ProfileHeader"

export default function ProfilePage() {
    const { data: user, isLoading } = useGetAccount();
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-4xl py-4 md:py-8 px-4">
        <div className="space-y-6">
          <ProfileHeader user={user} isLoading={isLoading} />
          <AddressSection />
        </div>
      </div>
    </div>
  )
}
