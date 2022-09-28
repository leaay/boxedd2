import { useState , ChangeEvent, useEffect } from "react";
import styles from '../styles/newsletter.module.scss'


const Newsletter = () => {

    const [email, setEmail] = useState<string | null>(null);

    const isActive =  email === null 

    useEffect(() => {

        if(email?.length === 0){
            setEmail(null)
        }

        

    }, [email])



    return (
        <div className={styles.newsletter}>
            <div className={styles.newsletterBody}>
                <h1>Subscribe to our newsletter</h1>
           
                <div className={styles.formBody}>
                        <input onChange={({target}:ChangeEvent<HTMLInputElement>)=>setEmail(target.value)}  type="email" placeholder="Your email address" />
                        <button disabled={isActive} className="btn2">Subscribe</button>
                </div>
            </div>
        </div>
    )
}


export default Newsletter