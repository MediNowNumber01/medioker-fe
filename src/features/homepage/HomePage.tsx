import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";
import {
  ArrowRight,
  FileText,
  MessageCircle,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "./components/HeroCarousel";
import { LocationRequester } from "./components/LocationRequester";

const HomePage = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Fast & Reliable Delivery",
      description:
        "Same-day delivery available in most areas with real-time tracking",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Expert Consultation",
      description:
        "24/7 access to certified pharmacists for professional medical advice",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Digital Prescriptions",
      description: "Easy prescription upload with automatic refill reminders",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Safe",
      description:
        "Bank-level security with verified medicines from licensed suppliers",
      color: "bg-red-100 text-red-600",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Search & Browse",
      description:
        "Find medicines from our extensive catalog or search by name",
    },
    {
      number: "02",
      title: "Upload Prescription",
      description: "Easily upload your doctor's prescription for verification",
    },
    {
      number: "03",
      title: "Secure Checkout",
      description:
        "Choose from multiple payment options and confirm your order",
    },
    {
      number: "04",
      title: "Fast Delivery",
      description:
        "Receive your medicines at your doorstep with tracking updates",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content:
        "MediNow has made managing my family's medications so much easier. The pharmacist consultation feature is incredibly helpful!",
      rating: 5,
      image: "/woman.PNG",
    },
    {
      name: "Dr. Michael Chen",
      role: "Healthcare Professional",
      content:
        "I recommend MediNow to my patients. Their prescription management system is reliable and user-friendly.",
      rating: 5,
      image: "/doctor.PNG",
    },
    {
      name: "Emily Rodriguez",
      role: "Senior Citizen",
      content:
        "The delivery service is excellent, and the staff is always helpful. Perfect for seniors like me who can't always visit the pharmacy.",
      rating: 5,
      image: "/old.PNG",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Medicines Available" },
    { number: "24/7", label: "Customer Support" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <>
      <LocationRequester />
      <div className="min-h-screen bg-white">
        
        <HeroCarousel />

        
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose MediNow?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the future of pharmacy services with our
                comprehensive healthcare solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`inline-flex p-4 rounded-2xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get your medicines delivered in 4 simple steps
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative text-center group">
                    <div className="relative">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        {step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-8"></div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Trusted by thousands of customers across the country
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        width={48}
                        height={48}
                        alt={testimonial.name}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience Better Healthcare?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers who trust MediNow for
                their pharmaceutical needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 py-6 rounded-full"
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/medicines">
                  <Button
                    size="lg"
                    variant="destructive"
                    className="text-lg px-8 py-6 rounded-full"
                  >
                    Browse Medicines
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
