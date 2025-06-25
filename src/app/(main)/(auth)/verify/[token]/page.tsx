import VerifyPage from "@/features/verify/VerifyPage";

export default async function VerificationRoutePage ({params} : {params: Promise<{token: string}>}) {
  const token = (await params).token

  return (
      <VerifyPage token={token} />
  );
}