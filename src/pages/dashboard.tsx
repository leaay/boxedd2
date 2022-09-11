import { useState , useEffect } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react"
import Image from 'next/image'
import { trpc } from "../utils/trpc";
import styles from '../styles/dashboard.module.scss'
import NewProductModal from '../componets/newProductModal'
import Test from "../componets/test";
 const Dashboard:NextPage = () => {

    const {status , data} = useSession({
         required:true  
    })

    const [newModal , setNewModal] = useState(false)

    const all = trpc.useQuery(['products.all'],{ refetchOnWindowFocus: false })

    const add = trpc.useMutation(['auth.add-product'],{
        onSuccess:()=>{
            all.refetch()
        }
    })
    const deleteItem = trpc.useMutation(['auth.delete-product'],{
        onSuccess:()=>{
            all.refetch()
        }
    })

    async function addItem(){
        add.mutate({
            name:'BOXY HOODIE (BLUE)',
            price: 199,
            desc: 'OUR SIGNATURE BOXY HOODIE.',
            img: 'https://i.ibb.co/hY9fsfM/123.jpg',
            category: 'hoodie',
            slug: 'BOXY-HOODIE-BLUE4'

        })
    }

    async function handleDelete(id:string){
        
        deleteItem.mutate(id)

    }

    


    if(status === 'loading') return <p>loading</p>

    return(
        <div className={styles.dashboardBody}>
        
        <button onClick={()=>setNewModal(true)}>new boxy hoodie</button>
        <button onClick={() => signOut({callbackUrl: 'http://localhost:3000'})}>Sign out</button>
        {add.isSuccess && <p>added</p>}
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