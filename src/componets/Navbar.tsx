import Image from "next/future/image"
import Link from "next/link"
import styles from '../styles/navbar.module.scss'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Cart from "./Cart"
import useCartStore  from "../zustand/store"


const Navbar = () => {

    const router = useRouter()
    const [showCart,setShowCart] = useState<boolean>(false)

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


    return(
        <>
        <nav className={styles.nav}>
            <div className={styles.navWrapper}>
                <Link passHref href={'/'} ><a className={styles.link}><Image alt="BOXED" src='/logo.svg' width={100} height={40}  /></a></Link>
                <Link href={'/products'} passHref><a className={router.pathname === '/products' ? styles.activeLink : styles.link}>PRODUCTS</a></Link>
                <button onClick={()=>setShowCart(true)}  className={styles.cart}><Image alt="cart" src='/cart.svg' width={20} height={20} />
                {cartItems.length > 0 && <span className={styles.cartCount} >{cartItems.length}</span>}
                </button>
            </div>
        </nav>
        {showCart && <Cart close={setShowCart} />}
        </>
    )

}

export default Navbar