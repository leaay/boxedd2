import { NextPage } from "next"
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import styles from '../../styles/productPage.module.scss'
import useMedia from "../../hooks/useMedia";
import Head from "next/head";
import useCartStore from "../../zustand/store";


const ProductPage:NextPage = () => {

    interface prod {
        id:string,
        name:string,
        price:number,
        desc:string,
        img:string,
        slug:string

    }


    const router = useRouter()

    const isDesktop = useMedia('(min-width: 960px)');

    const thisPageSlug = router.query.slug

    const cart = useCartStore((state:any) => state.cart);
    const addItem = useCartStore((state:any) => state.addItem);


    const {data,error,isLoading}  = trpc.useQuery(['products.find-one' , thisPageSlug as string ],{
        enabled: router.isReady === true,
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



    return(
        <>
            <Head>
                <title>{data?.name}</title>
                <meta name="description" content={data?.desc} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        
        <div className={styles.productBody}>
            <div className={styles.productWrapper}>
                {isDesktop ? null : <h2>{data?.name}</h2>}
                <Image className={styles.img} layout="responsive" src={data?.img as string} width={100} height={100} />
                <div className={styles.info}>
                    <p>{data?.desc}</p>
                    <p>{data?.price} PLN</p>
                    <button onClick={()=>addItem(data , cart)} className="btn1">add</button>

                </div>
            </div>
        </div>
    </>
    )
}

export default ProductPage
