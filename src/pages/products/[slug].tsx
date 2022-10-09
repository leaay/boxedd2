import { NextPage } from "next"
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Image from "next/future/image";
import styles from '../../styles/productPage.module.scss'
import useMedia from "../../hooks/useMedia";
import Head from "next/head";
import useCartStore from "../../zustand/store";
import Spiner from "../../componets/Spiner";
import {toast} from 'react-toastify'

const ProductPage:NextPage = () => {

    interface prod {
        id:string,
        name:string,
        price:number,
        desc:string,
        img:string,
        slug:string

    }

    const notifySucces = ()=>{
        toast.success("PRODUCT HAS BEEN ADDED SUCCESFULY", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false,
           
            icon: ({theme, type}) =>  <img src="/success.svg"/>
          });
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
            <div style={{height:'90vh'}}>
            <Spiner />
            </div>
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
                <Image alt="product-img" blurDataURL="/blur.png" placeholder="blur" className={styles.img} src={data?.img as string} width={400} height={600} />
                <div className={styles.info}>
                    <p>{data?.desc}</p>
                    <p className={styles.price}>{data?.price} PLN</p>
                    <button onClick={()=>{addItem(data , cart);notifySucces()}} className="btn1">add</button>

                </div>
            </div>
         
        </div>
    </>
    )
}

export default ProductPage
