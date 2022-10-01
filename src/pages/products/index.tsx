import { NextPage } from "next"
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/products.module.scss'
import Spiner from "../../componets/Spiner";
import { useRouter } from "next/router";
import { useEffect , useState } from "react";


const Products:NextPage = () => {

   interface product{
            id:string,
            name:string,
            price:number,
            desc:string,
            img:string,
            slug:string
    }
    const [getAllCategory , setgetAllCategory] = useState<string | any>('all')
    const router = useRouter()
    console.log(router.query)
    const {category} = router.query

    useEffect(()=>{setgetAllCategory(category)},[category])


    const {data,error,isLoading} = trpc.useQuery(['products.all' , getAllCategory ],{ 
        refetchOnWindowFocus: false,

     })

    if(isLoading){
        return(
            <Spiner/>
        )
    }

    if(error){
        return(
            <p>error</p>
        )
    }


    return(
        <div className={styles.body}>
            <div className={styles.wrapper}>
                {data?.map((item:product)=><Link  passHref href={`/products/${item.slug}`}  key={item.id}>
                    <div className={styles.productItem}> 
                    <Image blurDataURL="/blur.jpg" placeholder="blur" layout="responsive"   src={item.img} width={'100%'} height={'120%'}  />
                    <div className={styles.itemNameWrapper}><p>{item.name}</p><p>{item.price} PLN</p></div>
                    </div>
                </Link>)}
            </div>
        </div>
    )
}

export default Products
