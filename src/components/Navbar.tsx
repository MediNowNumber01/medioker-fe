"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  UserIcon,
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { generateInitials } from "@/lib/generateInitials";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoading = status === "loading";

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const logout = () => {
    signOut({ redirect: false }).then(() => {
      setMobileMenuOpen(false);
      router.push("/login");
    });
  };

  const CommonNavLinks = () => (
    <>
      <Link
        href="/medicines"
        className="flex items-center gap-3"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Image src={"/Medicines.svg"} alt="medicines" width={24} height={24} />
        <span>Get Medicines</span>
      </Link>
      <Link
        href="/forum"
        className="flex items-center gap-3"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Image src={"/Forum.svg"} alt="forum" width={24} height={24} />
        <span>Forum</span>
      </Link>
    </>
  );

  return (
    <>
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <header className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src={"/MediNow.svg"}
                width={120}
                height={40}
                alt="MediNow Logo"
                className="h-auto w-auto"
              />
            </Link>

            <div className="hidden md:flex items-center gap-x-2">
              {isLoading ? (
                <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />
              ) : session?.user ? (
                <>
                  <Link href="/medicines">
                    <Button variant="ghost">Get Medicines</Button>
                  </Link>
                  <Link href="/forum">
                    <Button variant="ghost">Forum</Button>
                  </Link>
                  <Link href="/cart">
                    <Button variant="ghost" size="icon">
                      <ShoppingCartIcon className="h-6 w-6" />
                      <span className="sr-only">Cart</span>
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-9 w-9 rounded-full"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={session.user.profilePict || undefined}
                            alt="User Avatar"
                          />
                          <AvatarFallback>
                            {generateInitials(session.user.fullName)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        {session.user.fullName}
                      </DropdownMenuLabel>
                      <DropdownMenuLabel>
                        {session.user.isVerified}
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="w-full cursor-pointer">
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="w-full cursor-pointer">
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-destructive cursor-pointer"
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link href="/medicines">
                    <Button variant="ghost">Get Medicines</Button>
                  </Link>
                  <Link href="/forum">
                    <Button variant="ghost">Forum</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>
          </div>
        </header>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={cn(
              "fixed top-0 right-0 h-full w-4/5 max-w-sm bg-background border-l shadow-xl transition-transform duration-300 ease-in-out",
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src={"/MediNow.svg"}
                  width={100}
                  height={35}
                  alt="MediNow Logo"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="flex flex-col gap-4 p-6 text-lg font-medium">
              {isLoading ? (
                <p>Loading...</p>
              ) : session?.user ? (
                <>
                  <div className="border-b border-border pb-4 mb-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Avatar>
                        <AvatarImage
                          src={session.user.profilePict || undefined}
                          alt={session.user.fullName || "User Avatar"}
                        />
                        <AvatarFallback>
                          {generateInitials(session.user.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-semibold text-base">
                          {session.user.fullName}
                        </p>
                        <p className="text-xs font-normal text-muted-foreground truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <Link
                    href="/medicines"
                    className="flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image
                      src={"/Medicines.svg"}
                      alt="medicines"
                      width={24}
                      height={24}
                    />
                    <span>Get Medicines</span>
                  </Link>
                  <Link
                    href="/forum"
                    className="flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image
                      src={"/Forum.svg"}
                      alt="forum"
                      width={24}
                      height={24}
                    />
                    <span>Forum</span>
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    <span>Cart</span>
                  </Link>
                  <div className="pt-4 border-t border-border mt-4">
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full text-destructive"
                    >
                      <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                      <span>Log out</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/medicines"
                    className="flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image
                      src={"/Medicines.svg"}
                      alt="medicines"
                      width={24}
                      height={24}
                    />
                    <span>Get Medicines</span>
                  </Link>
                  <Link
                    href="/forum"
                    className="flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image
                      src={"/Forum.svg"}
                      alt="forum"
                      width={24}
                      height={24}
                    />
                    <span>Forum</span>
                  </Link>
                  <div className="pt-4 border-t border-border mt-4 flex flex-col gap-4">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full">Login</Button>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
