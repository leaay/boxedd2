import Image from "next/future/image"
import Link from "next/link"
import styles from '../styles/navbar.module.scss'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Cart from "./Cart"
import useCartStore  from "../zustand/store"
import { useScroll , motion } from "framer-motion"


const Navbar = () => {

    const router = useRouter()
    const [showCart,setShowCart] = useState<boolean>(false)
    const [change,setChange] = useState<boolean>(false)
    const cartItems = useCartStore((state:any) => state.cart);
 


    useEffect(()=>{




        if(showCart){
            document.body.style.overflow = 'hidden'
        }
        
        if(!showCart){
            document.body.style.overflow = 'auto'
        }




    },[showCart])

    useEffect(() => {
        const handleRouteChange = (url:any, { shallow}:any) => {
          setShowCart(false)
        }
        router.events.on('routeChangeStart', handleRouteChange)

        return () => {
          router.events.off('routeChangeStart', handleRouteChange)
        }

      }, [])


    const {scrollY} = useScroll()
    

        useEffect(() => {
            scrollY.onChange((latest) => {
                
                {
                    if(latest > 100){
                        setChange(true)
                    }
                    if(latest < 100){
                        setChange(false)
                    }
                }
              }),
                      
              () => scrollY.stop()

        }, [change])


    return(
        <>
        <motion.nav  className={styles.nav} id="nav" 

        style={router.pathname === '/' && change === false ? 
            {backgroundColor:'transparent', marginTop:'-72px'} : 
            {backgroundColor:'white'}}
            animate

        >

            <div className={styles.navWrapper}>
                <Link passHref href={'/'} ><a className={styles.link}><Image priority alt="BOXED" src='/logo.svg' width={100} height={40}  /></a></Link>
                <Link href={'/products'} passHref><a className={router.pathname === '/products' ? styles.activeLink : styles.link}>PRODUCTS</a></Link>
                <button onClick={()=>setShowCart(true)}  className={styles.cart}><Image alt="cart" src='/cart.svg' width={20} height={20} />
                {cartItems.length > 0 && <span className={styles.cartCount} >{cartItems.length}</span>}
                </button>
            </div>
        </motion.nav>
        {showCart && <Cart close={setShowCart} />}
        </>
    )

}

export default Navbar