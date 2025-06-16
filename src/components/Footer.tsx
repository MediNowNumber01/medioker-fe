import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          
          {/* Kolom 1: Branding & Media Sosial */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/erlenplus.svg"
                width={32}
                height={32}
                alt="MediNow Erlenmeyer Logo"
              />
              <span className="text-xl font-bold">MediNow</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted one-stop solution for all pharmacy needs. Fast, reliable, and always caring.
            </p>
            <div className="flex gap-2 mt-2">
              <Link href="#" aria-label="Facebook">
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="Instagram">
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="Twitter">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Kolom 2: Navigasi Produk */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/medicines" className="text-muted-foreground hover:text-primary transition-colors">Get Medicines</Link>
              <Link href="/forum" className="text-muted-foreground hover:text-primary transition-colors">Forum</Link>
              <Link href="/articles" className="text-muted-foreground hover:text-primary transition-colors">Health Articles</Link>
              <Link href="/promo" className="text-muted-foreground hover:text-primary transition-colors">Promotions</Link>
            </div>
          </div>

          {/* Kolom 3: Navigasi Perusahaan */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link>
            </div>
          </div>

          {/* Kolom 4: Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            </div>
          </div>

        </div>

        {/* Bagian Bawah Footer: Hak Cipta */}
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} MediNow. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}