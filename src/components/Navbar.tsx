"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoading = status === "loading";

  // Efek untuk mencegah scroll pada body saat menu mobile terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const logout = () => {
    signOut({ redirect: false }).then(() => {
      setMobileMenuOpen(false); // Tutup menu setelah logout
      router.push("/login");
    });
  };

  // Kumpulan link/aksi untuk menu
  const navActions = session?.user ? (
    <>
      <div>
        <Link href="/profile">
          <DropdownMenuLabel>
            <div>
              <Avatar>
                <AvatarImage src={`${session.user.profilePict}`} alt="avatar" />
                <AvatarFallback>{session.user.fullName} Image</AvatarFallback>
              </Avatar>
              <p className="font-semibold">My Account</p>
            </div>
            <p className="text-xs font-normal text-muted-foreground truncate">
              {session.user.email}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
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
          width={100}
          height={100}
          className="h-6 w-6"
        />
        <span>Get Medicines</span>
      </Link>
      <Link
        href="/cart"
        className="flex items-center gap-3"
        onClick={() => setMobileMenuOpen(false)}
      >
        <ShoppingCartIcon className="h-6 w-6" />
        <span>Cart</span>
      </Link>
      <Link
        href="/forum"
        className="flex items-center gap-3"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Image
          src={"/Forum.svg"}
          alt="medicines"
          width={100}
          height={100}
          className="h-6 w-6"
        />
        <span>Forum</span>
      </Link>

      <button
        onClick={logout}
        className="flex items-center gap-3 text-destructive"
      >
        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        <span>Log out</span>
      </button>
    </>
  ) : (
    <>
      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
        <Button className="w-full">
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
          Login
        </Button>
      </Link>
      <DropdownMenuSeparator />
      <Link
        href="/medicines"
        className="flex items-center gap-3"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Image
          src={"/Medicines.svg"}
          alt="medicines"
          width={100}
          height={100}
          className="h-6 w-6"
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
          alt="medicines"
          width={100}
          height={100}
          className="h-6 w-6"
        />
        <span>Forum</span>
      </Link>
    </>
  );

  return (
    <>
      <div className="sticky top-0 bg-background">
        <header className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-40">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <Image
                src={"/MediNow.svg"}
                width={120}
                height={40}
                alt="MediNow Logo"
                className="h-auto w-auto"
              />
            </Link>

            {/* === MENU DESKTOP (Tampil di layar medium ke atas) === */}
            <div className="hidden md:flex items-center gap-x-2">
              {isLoading ? (
                <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />
              ) : session?.user ? (
                <>
                  <Link href="/cart">
                    <Button variant="ghost" size="icon">
                      <ShoppingCartIcon className="h-6 w-6" />
                      <span className="sr-only">Cart</span>
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <UserIcon className="h-6 w-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        {session.user.fullName}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders">My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <Button
                        onClick={logout}
                        className="flex items-center gap-3 text-destructive"
                        variant={"destructive"}
                      >
                        <ArrowLeftOnRectangleIcon className="h-6 w-6 text-white" />
                        <span className="text-white">Log out</span>
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <DropdownMenuSeparator />
                </>
              )}
            </div>

            {/* === TOMBOL MENU MOBILE (Hanya tampil di layar kecil) === */}
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

        {/* === PANEL MENU MOBILE (Overlay) === */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setMobileMenuOpen(false)} // Klik di luar menu akan menutupnya
        >
          <div
            className={cn(
              "fixed top-0 right-0 h-full w-4/5 max-w-sm bg-background border-l shadow-xl transition-transform duration-300 ease-in-out",
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam menu menutup menu
          >
            {/* Header Menu Mobile */}
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
            {/* Konten Menu Mobile */}
            <nav className="flex flex-col gap-6 p-6 text-lg font-medium">
              {isLoading ? <p>Loading...</p> : navActions}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
