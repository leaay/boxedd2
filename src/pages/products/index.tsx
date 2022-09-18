import { NextPage } from "next"
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/products.module.scss'


const Products:NextPage = () => {

   interface product{
            id:string,
            name:string,
            price:number,
            desc:string,
            img:string,
            slug:string
    }


    const {data,error,isLoading} = trpc.useQuery(['products.all'],{ 
        refetchOnWindowFocus: false,
     })

    if(isLoading){
        return(
            <p>loading..</p>
        )
    }

    if(error){
        return(
            <p>error</p>
        )
    }

    console.log(data)
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
