import { buttonVariants } from "@workspace/ui/components/button";
import Link from "next/link";

export default async function EmailVerified() {
    return (
        <div className="flex flex-col justify-center grow p-4">
            <h1>Email Verified</h1>
            <div>Your Email has been successfully verified.</div>
            <Link href={"/"}
            className={buttonVariants({
                variant:"default"
            })}
            >
            Go to home
            </Link>
        </div>
    )
}