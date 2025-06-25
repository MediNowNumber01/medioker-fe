import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  Users,
  FileText,
  Clock,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/erlenplus.svg"
                width={80}
                height={80}
                alt="Erlenplus logo"
                className="h-12 w-12 md:h-16 md:w-16"
              />
              <Image
                src="/MediNow.svg"
                width={160}
                height={48}
                alt="MediNow logo"
                className="h-8 w-auto md:h-10"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: June 2025
            </p>
          </div>

          {/* Navigation */}
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Information We Collect */}
            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Eye className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Information We Collect
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Full name and contact information</li>
                      <li>Email address and phone number</li>
                      <li>Delivery address and billing information</li>
                      <li>Date of birth and gender (for medical purposes)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Medical Information</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Prescription information and medical history</li>
                      <li>Allergies and medical conditions</li>
                      <li>Healthcare provider information</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Usage Information</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Device information and IP address</li>
                      <li>Browser type and operating system</li>
                      <li>Pages visited and time spent on our platform</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    How We Use Your Information
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Process and fulfill your medication orders</li>
                    <li>Provide pharmacist consultation services</li>
                    <li>
                      Send important updates about your orders and account
                    </li>
                    <li>Improve our services and user experience</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Prevent fraud and ensure platform security</li>
                    <li>Send promotional communications (with your consent)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Lock className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Data Protection & Security
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We implement industry-standard security measures to protect
                    your personal and medical information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>End-to-end encryption for all sensitive data</li>
                    <li>Secure servers with regular security audits</li>
                    <li>Access controls and employee training</li>
                    <li>Regular backup and disaster recovery procedures</li>
                    <li>
                      Compliance with healthcare data protection regulations
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Information Sharing
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may share your information only in the following
                    circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>With licensed pharmacists for consultation services</li>
                    <li>With delivery partners for order fulfillment</li>
                    <li>With payment processors for transaction processing</li>
                    <li>
                      With healthcare providers (with your explicit consent)
                    </li>
                    <li>When required by law or legal process</li>
                    <li>To protect our rights and prevent fraud</li>
                  </ul>
                  <p className="font-semibold">
                    We never sell your personal information to third parties for
                    marketing purposes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Your Rights
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    You have the following rights regarding your personal
                    information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Request deletion of your account and data</li>
                    <li>Opt-out of promotional communications</li>
                    <li>Request data portability</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us at{" "}
                    <a
                      href="mailto:privacy@medinow.com"
                      className="text-primary hover:underline"
                    >
                      privacy@medinow.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-sm bg-gray-50">
              <CardContent className="p-6 md:p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Questions About This Policy?
                </h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Email: privacy@medinow.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>
                    Address: MediNow Privacy Office, 123 Healthcare Ave, Medical
                    City, MC 12345
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex gap-4">
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
