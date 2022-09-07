import { NextPage } from "next";
import { useSession } from "next-auth/react";



 const Dashboard:NextPage = () => {

    const session = useSession()
    console.log(session)

    return(
        <p>welcome</p>
    )
}


export default Dashboard