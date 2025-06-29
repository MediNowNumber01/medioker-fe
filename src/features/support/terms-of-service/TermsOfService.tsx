import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  Scale,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
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

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our platform. By
              using MediNow, you agree to these terms and conditions.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: June 2025
            </p>
          </div>

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

          <div className="space-y-8">
            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Scale className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Acceptance of Terms
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By accessing and using the MediNow platform, you accept and
                    agree to be bound by the terms and provision of this
                    agreement.
                  </p>
                  <p>
                    If you do not agree to abide by the above, please do not use
                    this service. These terms apply to all visitors, users, and
                    others who access or use the service.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Service Description
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>MediNow provides the following services:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Online pharmacy services for prescription and
                      over-the-counter medications
                    </li>
                    <li>Pharmacist consultation and medical advice</li>
                    <li>Prescription management and refill reminders</li>
                    <li>Medicine delivery services</li>
                    <li>Health information and educational resources</li>
                  </ul>
                  <p>
                    All services are provided subject to availability and in
                    accordance with applicable laws and regulations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    User Responsibilities
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>As a user of MediNow, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Provide accurate and complete information when creating
                      your account
                    </li>
                    <li>
                      Keep your account credentials secure and confidential
                    </li>
                    <li>Use the service only for lawful purposes</li>
                    <li>
                      Provide valid prescriptions from licensed healthcare
                      providers
                    </li>
                    <li>Not share or transfer your account to others</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Report any suspicious activity or security breaches</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-orange-500">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Prescription Requirements
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="font-semibold text-orange-800">
                    Important Medical Disclaimer:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Valid prescriptions are required for all prescription
                      medications
                    </li>
                    <li>
                      Prescriptions must be from licensed healthcare providers
                    </li>
                    <li>
                      We reserve the right to verify prescriptions with
                      healthcare providers
                    </li>
                    <li>
                      Controlled substances require additional verification
                    </li>
                    <li>
                      We may refuse to fill prescriptions that appear fraudulent
                      or inappropriate
                    </li>
                    <li>
                      Consultation with our pharmacists does not replace
                      professional medical advice
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Payment Terms
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payment is required at the time of order placement</li>
                    <li>
                      We accept major credit cards, debit cards, and digital
                      payment methods
                    </li>
                    <li>All prices are subject to change without notice</li>
                    <li>
                      Insurance claims will be processed according to your plan
                      benefits
                    </li>
                    <li>
                      Refunds are processed according to our refund policy
                    </li>
                    <li>Failed payments may result in order cancellation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Delivery Terms
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Delivery times are estimates and not guaranteed</li>
                    <li>
                      Someone 18+ must be available to receive controlled
                      substances
                    </li>
                    <li>We are not responsible for packages left unattended</li>
                    <li>
                      Delivery fees may apply based on location and order value
                    </li>
                    <li>Weather and other factors may affect delivery times</li>
                    <li>
                      Failed delivery attempts may result in return to pharmacy
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-red-500">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Limitation of Liability
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="font-semibold text-red-800">
                    Important Legal Notice:
                  </p>
                  <p>
                    MediNow's liability is limited to the maximum extent
                    permitted by law. We are not liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Indirect, incidental, or consequential damages</li>
                    <li>
                      Medical outcomes or adverse reactions to medications
                    </li>
                    <li>Delays in delivery or service interruptions</li>
                    <li>Third-party actions or services</li>
                    <li>Loss of data or unauthorized access to accounts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Termination
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may terminate or suspend your account and access to our
                    services immediately, without prior notice, for any reason,
                    including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Violation of these Terms of Service</li>
                    <li>Fraudulent or illegal activity</li>
                    <li>Providing false information</li>
                    <li>Abuse of our services or staff</li>
                  </ul>
                  <p>
                    Upon termination, your right to use the service will cease
                    immediately.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm bg-gray-50">
              <CardContent className="p-6 md:p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Questions About These Terms?
                </h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Email: legal@medinow.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>
                    Address: MediNow Legal Department, 123 Healthcare Ave,
                    Medical City, MC 12345
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex gap-4">
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
