"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import useResendVerification from "@/hooks/api/profile/useResendVerification"
import { generateInitials } from "@/lib/generateInitials"
import { Account } from "@/types/account"
import { AlertTriangle, ArrowLeft, Calendar, CheckCircle, Edit, Home, User } from "lucide-react"
import Link from "next/link"

interface ProfileHeaderProps {
  user: Account | undefined;
  isLoading: boolean;
}

export function ProfileHeader({ user, isLoading }: ProfileHeaderProps) {
  const { mutate: resendEmail, isPending } = useResendVerification()

  const isVerified = !!user?.isVerified;

  if (isLoading) {
    return (
      <div className="space-y-6">
        
        <div className="flex items-center gap-4 mb-2">
          <div className="h-9 w-20 bg-muted animate-pulse rounded-md"></div>
          <div className="h-4 w-px bg-border"></div>
          <div className="h-4 w-32 bg-muted animate-pulse rounded-md"></div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-muted animate-pulse"></div>
                <div className="flex-grow space-y-3 text-center md:text-left w-full">
                  <div className="h-6 md:h-7 w-40 md:w-48 rounded-md bg-muted animate-pulse mx-auto md:mx-0"></div>
                  <div className="h-4 md:h-5 w-48 md:w-64 rounded-md bg-muted animate-pulse mx-auto md:mx-0"></div>
                  <div className="h-4 md:h-5 w-28 md:w-32 rounded-md bg-muted animate-pulse mx-auto md:mx-0"></div>
                </div>
                <div className="h-9 md:h-10 w-28 md:w-32 rounded-md bg-muted animate-pulse"></div>
              </div>
              <div className="border-t pt-6">
                <div className="h-12 w-full rounded-lg bg-muted animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-6">
        
        <div className="flex items-center gap-4 mb-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden md:inline">Back to Home</span>
              <span className="md:hidden">Back</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-border"></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Home</span>
            <span>/</span>
            <span className="text-foreground font-medium">Profile</span>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Unable to load profile</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Please{" "}
                  <Link href="/login" className="text-primary underline hover:text-primary/80">
                    log in
                  </Link>{" "}
                  again to view your profile.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  return (
    <div className="space-y-6">
      
      <div className="flex items-center gap-4 mb-2">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-black hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden md:inline ">Back to Home</span>
            <span className="md:hidden">Back</span>
          </Button>
        </Link>
        <div className="h-4 w-px bg-border"></div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Home className="h-4 w-4" />
          <span className="hidden md:inline">Home</span>
          <span>/</span>
          <span className="text-foreground font-medium">Profile</span>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-6">
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-primary shrink-0 object-cover">
                <AvatarImage src={user.profilePict || undefined} alt={user.fullName} className="object-cover"/>
                <AvatarFallback className="text-lg md:text-2xl">{generateInitials(user.fullName)}</AvatarFallback>
              </Avatar>

              <div className="text-center md:text-left flex-grow min-w-0">
                <h1 className="text-xl md:text-2xl font-bold truncate text-gray-900">{user.fullName}</h1>
                <p className="text-sm md:text-base text-muted-foreground truncate">{user.email}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs md:text-sm text-muted-foreground">Joined {joinDate}</p>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <Link href="/profile/edit" className="block">
                  <Button variant="outline" className="w-full md:w-auto" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>

            
            <div className="border-t pt-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                <span className="font-semibold text-sm md:text-base text-gray-900">Account Status:</span>
                {isVerified === true ? (
                  <Badge className="bg-green-100 text-green-800 border border-green-200 hover:bg-green-100 w-fit">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span className="text-xs md:text-sm">Verified</span>
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="w-fit">
                    <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span className="text-xs md:text-sm">Not Verified</span>
                  </Badge>
                )}
              </div>

              
              {isVerified === false && (
                <Alert variant="default" className="border-yellow-500/50 bg-yellow-50 px-8 md:pl-36">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="font-semibold text-yellow-800 text-sm md:text-base">
                    Action Required
                  </AlertTitle>
                  <AlertDescription className="text-yellow-700 mt-2">
                    <div className="flex flex-col gap-3">
                      <p className="text-xs md:text-sm">
                        Your account is not verified. Please check your email for the verification link.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resendEmail()}
                        disabled={isPending}
                        className="w-full md:w-auto h-8 text-yellow-900 border-yellow-300 hover:bg-yellow-100"
                      >
                        {isPending ? "Sending..." : "Resend Verification Email"}
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
