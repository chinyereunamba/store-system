import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

function Logout() {
    signOut();
    redirect('/login')
    return
}

export default Logout;
