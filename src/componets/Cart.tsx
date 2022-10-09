import Image from "next/future/image"
import Link from "next/link"
import styles from '../styles/cart.module.scss'
import useCartStore from "../zustand/store";
import FocusTrap from "focus-trap-react";
import getStripe from "../utils/getStripe";
import axios from "axios";
import { useState } from "react";
import Spiner from "./Spiner";
import {motion} from "framer-motion";

interface prop {
    close: (i:boolean)=> void,
}

interface item{
    id:string,
    name:string,
    price:number,
    img:string,
    slug:string,
    quantity:number

}


const Cart = ({close}:prop) => {

    const cartItems = useCartStore((state:any) => state.cart);
    const removeItem = useCartStore((state:any) => state.removeItem);
    const addItem = useCartStore((state:any) => state.addItem);
    const minusOne = useCartStore((state:any) => state.minusOne);
    const [checkoutStarted, setCheckoutStarted] = useState<boolean>(false);


    const handleCheckout = async () =>{
        setCheckoutStarted(true)
        const stripe = await getStripe()  
        const response = await axios.post('/api/checkout',{cartItems})
        const data = await response.data
        await stripe.redirectToCheckout({ sessionId: data.id})

    }
    

    return(
        <FocusTrap active={cartItems.length > 0 ? true : false}>

        <motion.div 
                initial={{opacity:0}}
                animate={{  opacity:1}}
                transition={{ duration: 0.1 , ease: "easeOut" }}
                exit={{ opacity: 0 }}
                layout 
                id="cart" 
                tabIndex={1} 
                onClick={()=>close(false)}
                className={styles.full}
        >

            <motion.div 
                    initial={{opacity:1 , x:'100%'}}
                    animate={{  opacity:1 , x:0}}
                    transition={{ duration: 0.3 , ease: "easeOut" }} exit={{ x: '100%' }}
                    onClick={(e)=>e.stopPropagation()} className={styles.cartBody}
            >

            <button aria-label="close cart  button" className={`${styles.cartValueBtn} ${styles.closeBtn}`}  onClick={()=>close(false)}><Image src={'/x.svg'} alt="add" width={11} height={11} /></button>

            {cartItems.length > 0 && <a href="#checkout" aria-label="skip to payments" className={styles.skipToCheckout} >skip to checkout</a>}




                {cartItems.length === 0 && <p className={styles.empty}>Cart is empty</p>}
                {cartItems.length > 0 && cartItems.map((item:item)=>(<motion.div layout className={styles.cartItem} key={item.id}>
                    <Link  href={`/products/${item.slug}`} passHref><a><Image height={120} width={100} alt="item-img"  src={item.img}/></a></Link>
                    <div className={styles.cartItemDetail}>
                        <p>{item.name}</p>
                        <div className={styles.itemValue}>
                            <p>{item.price} PLN</p>

                            <button className={styles.cartValueBtn} onClick={()=>addItem(item , cartItems)}><Image src={'/plus.svg'} alt="add" width={11} height={11} /></button>

                            <button className={styles.cartValueBtn} onClick={()=>minusOne(item)}><Image src={'/minus.svg'} alt="less" width={11} height={11} /></button>

                            <button className={styles.cartValueBtn} onClick={()=>removeItem(item)}><Image src={'/bin.svg'} alt="delete" width={11} height={11} /></button>

                        </div>
                        <p className={styles.quantity}>quantity_{item.quantity}</p>
                    </div>
                </motion.div>))}

                {
                cartItems.length > 0 && 

                <motion.div layout className={styles.summary}>
                    <p>total: {cartItems.reduce((acc:number , item:item)=> acc + item.price * item.quantity , 0)} PLN <span>* vat included</span></p>
                    <button onClick={handleCheckout} id='checkout' className="btn1">{ checkoutStarted ? <Spiner size={'10px'} pos={true} /> : 'pay'} </button>
                </motion.div>  
                
                }

                

            </motion.div>
                
        </motion.div>
        </FocusTrap>
    )

}

export default Cart