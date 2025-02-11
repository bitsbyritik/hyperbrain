import { getSession } from "better-auth/api";

const Navbar = async() => {
    const session = await getSession();

    return(
        <div>

            
        </div>
    )

};
export default Navbar