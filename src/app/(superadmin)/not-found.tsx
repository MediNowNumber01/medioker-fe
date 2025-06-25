"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, MessageCircle, Pill, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/MediNow.svg"
                width={120}
                height={40}
                alt="MediNow Logo"
                className="h-10 md:h-12 w-auto mx-auto"
                priority
              />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-100 mx-auto lg:mx-0">
                  <span className="text-3xl md:text-4xl font-bold text-red-600">
                    404
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                    Page Not Found
                  </h1>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Oops! The page you're looking for seems to have wandered
                    off. Don't worry, we'll help you find what you need.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/">
                  <Button variant="default" className="w-full gap-2">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/medicines">
                  <Button variant="outline" className="w-full gap-2">
                    <Pill className="h-4 w-4" />
                    Explore Medicines
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Need Help?
                        </h3>
                        <p className="text-sm text-gray-600">
                          We're here to assist you
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link href="/forum">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3"
                        >
                          <MessageCircle className="h-4 w-4 text-green-600" />
                          <div className="text-left">
                            <div className="font-medium">Visit Forum</div>
                            <div className="text-xs text-muted-foreground">
                              Get help from community
                            </div>
                          </div>
                        </Button>
                      </Link>

                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3"
                      >
                        <Mail className="h-4 w-4 text-purple-600" />
                        <div className="text-left">
                          <div className="font-medium">Email Us</div>
                          <div className="text-xs text-muted-foreground">
                            medionwnumber1@gmail.com
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
