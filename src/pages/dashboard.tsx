import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react"
import { Mutation } from "react-query";
import { trpc } from "../utils/trpc";

 const Dashboard:NextPage = () => {

    const {status , data} = useSession({
         required:true  
    })


    const add = trpc.useMutation(['test.add-product'])
    
    async function addItem(){
        add.mutate()
    }

    if(status === 'loading') return <p>loading</p>

    return(
        <>
        <p>welcome {data.user?.name}</p>
        <button onClick={addItem}>qee</button>
        <button onClick={() => signOut({callbackUrl: 'http://localhost:3000'})}>Sign out</button>
        </>
    )
}


export default Dashboard