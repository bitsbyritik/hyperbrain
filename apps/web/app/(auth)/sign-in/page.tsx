import { Button } from "@workspace/ui/components/button";
import {signIn} from "@/lib/auth-client";

export default function SigIn() {
return(
    <div>
        <div>
            <Button onClick={async() => {
                signIn.social({
                    provider:"github",
                    callbackURL:"/home",
                })
            }}>Github</Button>

        </div>

    </div>
)
}