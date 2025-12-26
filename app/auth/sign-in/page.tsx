import SignInClient from "@/components/signin-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthSignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if(session) {
    redirect('/dashboard')
  }

  return <SignInClient />;
}
