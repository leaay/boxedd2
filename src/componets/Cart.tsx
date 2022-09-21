import Image from "next/future/image"
import Link from "next/link"
import styles from '../styles/cart.module.scss'
import useCartStore from "../zustand/store";
import FocusTrap from "focus-trap-react";
import getStripe from "../utils/getStripe";
import axios from "axios";

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


    const handleCheckout = async () =>{
        
        const stripe = await getStripe()  
        const response = await axios.post('/api/checkout',{cartItems})
        const data = await response.data
        await stripe.redirectToCheckout({ sessionId: data.id})

    }
    

    return(
        <FocusTrap active={cartItems.length > 0 ? true : false}>
        <div id="cart"  tabIndex={1} onClick={()=>close(false)} className={styles.full}>

            <div onClick={(e)=>e.stopPropagation()} className={styles.cartBody}>
                <button className={`${styles.cartValueBtn} ${styles.closeBtn}`}  onClick={()=>close(false)}><Image src={'/x.svg'} alt="add" width={11} height={11} /></button>


                {cartItems.length === 0 && <p className={styles.empty}>Cart is empty</p>}
                {cartItems.length > 0 && cartItems.map((item:item)=>(<div className={styles.cartItem} key={item.id}>
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
                </div>))}

                {
                cartItems.length > 0 && 

                <div className={styles.summary}>
                    <p>total: {cartItems.reduce((acc:number , item:item)=> acc + item.price * item.quantity , 0)} PLN <span>* vat included</span></p>
                    <button onClick={handleCheckout} className="btn1"> pay </button>
                </div>  
                
                }

                

            </div>
                
        </div>
        </FocusTrap>
    )

}

export default Cart