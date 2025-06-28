import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/providers/NextAuthProvider";
import NuqsProvider from "@/providers/NuqsProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NuqsProvider>
        <ReactQueryProvider>
          <NextAuthProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </NextAuthProvider>
        </ReactQueryProvider>
      </NuqsProvider>
    </div>
  );
}
