"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Your Health, Our Priority",
      subtitle:
        "Get medicines delivered to your doorstep with just a few clicks",
      description:
        "Order from thousands of medicines with prescription upload and expert consultation",
      image: "/health.png",
      cta: "Order Now",
      badge: "Free Delivery",
    },
    {
      title: "Expert Pharmacist Consultation",
      subtitle: "Chat with certified pharmacists anytime, anywhere",
      description:
        "Get professional medical advice and prescription guidance from licensed pharmacists",
      image: "/expert.png",
      cta: "Consult Now",
      badge: "24/7 Available",
    },
    {
      title: "Prescription Management Made Easy",
      subtitle: "Upload, track, and refill prescriptions seamlessly",
      description:
        "Never miss a dose with our smart prescription reminder and auto-refill system",
      image: "/prescription.png",
      cta: "Upload Prescription",
      badge: "Smart Reminders",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="relative">
          <div className="relative min-h-[500px] md:min-h-[600px]">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
              <div className="space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Your Health, Our Priority
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 font-medium">
                    Get medicines delivered to your doorstep with just a few
                    clicks
                  </p>
                  <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Order from thousands of medicines with prescription upload
                    and expert consultation
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/medicines">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl"
                    >
                      Order Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/forum">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-6 rounded-full"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Animated Images - Right Side */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-700 ease-in-out ${
                        index === currentSlide
                          ? "opacity-100 translate-x-0 relative"
                          : "opacity-0 translate-x-full absolute inset-0"
                      }`}
                    >
                      <Image
                        src={slide.image || "/placeholder.svg"}
                        width={600}
                        height={400}
                        alt={slide.title}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  ))}

                  {/* Carousel Controls - Overlaid on Image */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevSlide}
                      className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-white/20"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextSlide}
                      className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-white/20"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
