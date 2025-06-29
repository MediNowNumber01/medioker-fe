import HomePage from "@/features/homepage/HomePage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Home() {
  const session = await auth();

  if (session && session.user.role === "SUPER_ADMIN") redirect("/superadmin");
  if (session && session.user.role === "ADMIN") redirect("/admin");
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default Home;
