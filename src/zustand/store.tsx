
import create from 'zustand'

interface c {
    id:string,
    name:string,
    price:number,
    img:string,
    slug:string,
    desc?:string,
    quantity:number
}

type store = {

    cart:c[],
    addItem:(data:c, cart:c[]) => void,
    minusOne:(data:c) => void,
    removeItem:(data:c) => void,
}


const useCartStore = create<store>((set) => ({

  cart: [],
  newCartItem: {},
  addItem(data , cart){
        const item = cart.find((i:c)=>i.id === data.id)
        if(item){
            return set((state)=>({cart:state.cart.map(i => i.id === data.id ? {...i , quantity: i.quantity + 1 } : i )}))
        }
    set((state)=>({cart:[...state.cart , {id:data.id ,name: data.name , price: data.price , slug:data.slug , img: data.img , quantity: 1}]}))
    },

    minusOne(data){
            return set((state)=>({cart:state.cart.map(i => i.id === data.id ? {...i , quantity: i.quantity === 1 ? 1 : i.quantity - 1} : i)}))
    },

    removeItem(data){
        return set((state)=>({cart:state.cart.filter(i=>i.id !== data.id)}))
    }
}))

export default useCartStore