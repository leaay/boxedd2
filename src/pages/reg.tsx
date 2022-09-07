import { NextPage } from "next"
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";


const Reg:NextPage = () => {

    //  trpc.useQuery(["example.reg"]);

        const session = useSession()
        console.log(session)

    return(
        <p>elo2w</p>
    )
}

export default Reg
