import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  TruckIcon,
  ChatBubbleLeftRightIcon,
  DocumentPlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline"; // Contoh ikon Heroicons
import { StarIcon } from "@heroicons/react/20/solid";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto text-center py-16 md:py-24">
        {/* Kontainer Logo Utama (Tata letak vertikal untuk semua layar) */}
        <div className="flex flex-col items-center justify-center gap-y-4 mb-8">
          <Image
            src={"/erlenplus.svg"}
            width={180} // Sedikit lebih besar untuk jadi fokus utama
            height={180}
            alt="erlenplus logo"
            className="h-auto w-40 md:w-48" // Ukuran responsif
          />
          <Image
            src={"/MediNow.svg"}
            width={200} // Sedikit lebih ramping
            height={70}
            alt="medinow logo text"
            className="h-auto w-48 md:w-52" // Ukuran responsif
          />
        </div>

        <div className="text-lg md:text-xl lg:text-2xl mx-auto py-4 text-center max-w-lg text-gray-600">
          Order medicines, consult pharmacists, and manage prescriptions – all
          in one place.
        </div>

        <div className="flex justify-center mt-6">
          <Button className="rounded-full px-8 h-14 text-lg font-semibold hover:bg-red-800 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            Get Started
          </Button>
        </div>
      </section>

      {/* Why Choose MediPharm? */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose MediPharm?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {/* Item 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
                <TruckIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Fast and reliable medicines delivered to your doorstep in no
                time.
              </p>
            </div>
            {/* Item 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                <ChatBubbleLeftRightIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Pharmacist Consultation
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Chat with certified pharmacists for expert advice.
              </p>
            </div>
            {/* Item 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                <DocumentPlusIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Easy Prescription
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Upload, track & refill prescriptions with just a simple tap.
              </p>
            </div>
            {/* Item 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-4">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Multiple safe payment options for your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 md:py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            How It Works
          </h2>
          <div className="max-w-lg mx-auto px-4 md:px-0">
            <div className="flex items-center mb-4">
              <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">
                  Search Medicines
                </h3>
                <p className="text-gray-500 text-sm">
                  Find your medicines from our wide range.
                </p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">
                  Upload Prescription
                </h3>
                <p className="text-gray-500 text-sm">
                  Easily upload your doctor's prescription.
                </p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">
                  Place Order & Pay
                </h3>
                <p className="text-gray-500 text-sm">
                  Choose your payment method and confirm order.
                </p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">
                  Receive at Doorstep
                </h3>
                <p className="text-gray-500 text-sm">
                  Get timely delivery, right to your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Users Say */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            What Our Users Say
          </h2>
          <div className="max-w-md mx-auto bg-blue-100 rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              <Image
                src={"/user-placeholder.png"} // Ganti dengan gambar pengguna Anda
                alt="User Avatar"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-gray-700 text-center italic mb-4">
              "Super fast delivery and the app is so easy to use. The pharmacist
              chat was a lifesaver!"
            </p>
            <div className="flex justify-center text-yellow-500 mb-2">
              <StarIcon className="h-5 w-5" />
              <StarIcon className="h-5 w-5" />
              <StarIcon className="h-5 w-5" />
              <StarIcon className="h-5 w-5" />
              <StarIcon className="h-5 w-5" />
            </div>
            <p className="text-blue-500 text-center font-semibold">
              Amelia Smith
            </p>
          </div>
        </div>
      </section>

      {/* Ready to order? */}
      <section className="bg-blue-500 py-10 md:py-14 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to order?</h2>
          <p className="text-lg mb-6">
            Sign up and experience seamless pharma care!
          </p>
          <Button className="rounded-full px-8 py-4 text-lg bg-white text-blue-500 hover:bg-blue-100 hover:text-blue-600">
            Create Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
