import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";




export async function getCurrentUser() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList
  })


  if (!session?.user) {
    redirect('/auth/sign-in')
  }

  return session.user;
}