import Image from "next/image"
import Link from "next/link"
import styles from '../styles/cart.module.scss'
import useCartStore from "../zustand/store";
import FocusTrap from "focus-trap-react";
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
    

    return(
        <FocusTrap active={cartItems.length > 0 ? true : false}>
        <div id="cart" tabIndex={1} onClick={()=>close(false)} className={styles.full}>

            <div onClick={(e)=>e.stopPropagation()} className={styles.cartBody}>

                {cartItems.length === 0 && <p className={styles.empty}>Cart is empty</p>}
                {cartItems.length > 0 && cartItems.map((item:item)=>(<div className={styles.cartItem} key={item.id}>
                    <Link  href={`/products/${item.slug}`} passHref><a><Image  height={120} width={100} src={item.img}/></a></Link>
                    <div className={styles.cartItemDetail}>
                        <p>{item.name}</p>
                        <div className={styles.itemValue}>
                            <p>{item.price} PLN</p>
                            <button>+</button>
                            <button>-</button>
                            <button>d</button>
                        </div>
                        <p>quantity_{item.quantity}</p>
                    </div>
                </div>))}

            </div>
                
        </div>
        </FocusTrap>
    )

}

export default Cart