import { NextPage } from "next";
import { useState , ChangeEvent , FormEvent } from "react";
import styles from '../styles/newProductModal.module.scss'
import {toast} from 'react-toastify'

interface propsInterface {
    close:(i:boolean)=>void,
    add:any,

}

const NewProductModal = ({close , add}:propsInterface) => {


    const [name , setName] = useState<string | null>(null)
    const [price , setPrice] = useState<string | null>(null)
    const [desc , setDesc] = useState<string | null>(null)
    const [img , setImg] = useState<string | null>(null)
    const [category , setCategory] = useState<string | null>(null)
    const [slug , setSlug] = useState<string | null>(null)



    const isActive = name === null || price === null || desc === null || img === null || category === null || slug === null
    

    function handleSubmit(e:FormEvent<HTMLFormElement>){
        
        e.preventDefault()
        const product ={
            name,
            price:Number(price),
            desc,
            img,
            category,
            slug
        }
        
        add.mutate(product)
        
        if(add.isSuccess){
            console.log('succes')
        }
       
    }

    return(
        <div className={styles.modalBody}>
            <button className={styles.btn} onClick={()=>close(false)}><img src='/x.svg' /></button>

            <h1>ADD NEW PRODUCT</h1>
            <form onSubmit={handleSubmit} className={styles.newForm}>
                <input onChange={({target}:ChangeEvent<HTMLInputElement>)=>setName(target.value)} type="text" placeholder="name"/>
                <input onChange={({target}:ChangeEvent<HTMLInputElement>)=>setPrice(target.value)} type="number" placeholder="price ( in PLN)"/>
                <input onChange={({target}:ChangeEvent<HTMLInputElement>)=>setDesc(target.value)} type="text" placeholder="desc"/>
                <input onChange={({target}:ChangeEvent<HTMLInputElement>)=>setImg(target.value)} type="text" placeholder="img (only one link from i.ibb.co )"/>
                <input onChange={({target}:ChangeEvent<HTMLInputElement>)=>setCategory(target.value)} type="text" placeholder="category"/>
                <input onChange={({target}:ChangeEvent<HTMLInputElement>)=>setSlug(target.value)} type="text" placeholder="slug (must be unique)"/>
                <button className={styles.btn2} disabled={isActive} type="submit">and new item</button>
            </form>
        </div>
    )

}

export default NewProductModal