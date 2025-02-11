import { LandingPage } from "@/components/pages/landing-page";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session;
}

export default async function Home() {

    const session = await getSession();

    if(session?.session.userId){
        redirect('/home');
    }

    return (
        <main>
            <LandingPage />
        </main>
    )
}