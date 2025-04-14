import { authSession } from "@/actions/session";
import LoginPage from "@/components/pages/LoginPage";
import { redirect } from "next/navigation";

export default async function Login() {
  const { session } = await authSession();

  if (session?.user.id) {
    redirect("/home");
  }

  return (
    <div>
      <LoginPage />
    </div>
  );
}
