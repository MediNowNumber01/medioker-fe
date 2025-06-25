import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/erlenplus.svg"
                width={32}
                height={32}
                alt="MediNow Erlenmeyer Logo"
              />
              <span className="text-xl font-bold">MediNow</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for all pharmaceutical needs. Quality
              medicines, expert care, delivered to your doorstep.
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

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-3 text-sm">
              <Link
                href="/medicines"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Medicines
              </Link>
              <Link
                href="/forum"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Forum
              </Link>
              <Link
                href="/profile"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Profile
              </Link>
              <Link
                href="/cart"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Cart
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <div className="space-y-3 text-sm">
              <Link
                href="/privacy"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>medionwnumber1@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} MediNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
