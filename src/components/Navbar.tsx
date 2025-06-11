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
} from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const logout = () => {
    // Fungsi signOut dari next-auth
    signOut({ redirect: false }).then(() => {
      router.push("/login"); // Arahkan ke login setelah sign out
    });
  };

  const renderAuthSection = () => {
    // 1. Loading state: Tampilkan skeleton
    if (isLoading) {
      return <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />;
    }

    // 2. Logged In state: Tampilkan Cart dan User Menu
    if (session?.user) {
      return (
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          {/* Tombol Keranjang Belanja */}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </Link>

          {/* Dropdown Menu Pengguna */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
              >
                <UserIcon className="h-6 w-6" />
                <span className="sr-only">User Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="font-semibold">My Account</p>
                <p className="text-xs font-normal text-muted-foreground truncate">
                  {session.user.email}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/orders">
                <DropdownMenuItem className="cursor-pointer">
                  My Orders
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    // 3. Logged Out state: Tampilkan tombol Login
    return (
      <Link href="/login">
        <Button
          variant="outline"
          className="hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
          Login
        </Button>
      </Link>
    );
  };

  return (
    <header className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="flex justify-between items-center">
        {/* Logo mengarah ke Halaman Utama */}
        <Link href="/">
          <Image
            src={"/MediNow.svg"}
            width={120}
            height={40}
            alt="MediNow Logo"
            className="h-auto w-auto"
          />
        </Link>

        {/* Bagian Kanan Navbar yang Dinamis */}
        {renderAuthSection()}
      </div>
    </header>
  );
}
