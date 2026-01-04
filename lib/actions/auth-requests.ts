import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

const session = await auth.api.getSession({
  headers: await headers()
})

export function getCurrentUser() {
  const user = session?.user
  if(!user) {
    redirect('/auth/sign-in')
  }
  return user;
}