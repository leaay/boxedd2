import { useState , useEffect } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react"
import Image from 'next/image'
import { trpc } from "../utils/trpc";
import styles from '../styles/dashboard.module.scss'
import NewProductModal from '../componets/newProductModal'
import Test from "../componets/test";
import {toast} from 'react-toastify'
 const Dashboard:NextPage = () => {

    const {status , data} = useSession({
         required:true  
    })

    const [newModal , setNewModal] = useState(false)

    const notifyDeleted = ()=>{
        toast.success("PRODUCT HAS BEEN DELETED", {
            position: toast.POSITION.TOP_RIGHT
          });
    }

    const notifyError = ()=>{
        toast.error("SOMETHING WENT WRONG!", {
            position: toast.POSITION.TOP_RIGHT
          });
    }

    const notifySucces = ()=>{
        toast.success("PRODUCT HAS BEEN ADDED SUCCESFULY", {
            position: toast.POSITION.TOP_RIGHT
          });
    }


    const all = trpc.useQuery(['products.all'],{ 
        refetchOnWindowFocus: false,
       
     })

    const add = trpc.useMutation(['auth.add-product'],{
        onSuccess:()=>{
            all.refetch()
            notifySucces()
        },
        onError:()=>{
            notifyError()
        }
    })
    const deleteItem = trpc.useMutation(['auth.delete-product'],{
        onSuccess:()=>{
            all.refetch()
            notifyDeleted()
        }
    })



    async function handleDelete(id:string){
        
        deleteItem.mutate(id)

    }

    


    if(status === 'loading') return <p>loading</p>

    return(
        <div className={styles.dashboardBody}>
     
        <button onClick={()=>setNewModal(true)}>new boxy hoodie</button>
        <button onClick={() => signOut({callbackUrl: 'http://localhost:3000'})}>Sign out</button>
    
            <div className={styles.productList}>
               
                {all.data?.map((item:any) => <div key={item.id} className={styles.productItem}>
                    <p>{item.name}</p>
                    <p>{item.price} PLN</p>
                    <p>{item.desc}</p>
                    <p>{item.slug}</p>
                    <Image priority={false} src={item.img} width={120} height={100} />

                        <div className={styles.productItemHover}>
                            <p onClick={()=> handleDelete(item.id)}>delete</p>
                            {/* <p>edit</p> */}
                        </div>

                    </div>)}
            </div>


            {newModal && <NewProductModal close={setNewModal} add={add} /> }

        </div>
    )
}


export default Dashboard