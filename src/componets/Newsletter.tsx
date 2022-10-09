import { useState , ChangeEvent, useEffect } from "react";
import styles from '../styles/newsletter.module.scss'
import {toast} from 'react-toastify'

const Newsletter = () => {

    const [email, setEmail] = useState<string >('');
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const isActive =  email === null || isValidEmail === false


    
    const notifySucces = ()=>{
        toast.success(`${email} has been added to newsletter`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
            pauseOnHover: false,
          });

          setEmail('')
    }


    useEffect(() => {

        const legit = email?.includes('@')

        if(legit){
            setIsValidEmail(true)
        }else{
            setIsValidEmail(false)
        }

        if(email?.length === 0){
            setEmail('')

        }

    }, [email])



    return (
        <div className={styles.newsletter}>
            <div className={styles.newsletterBody}>
                <h1>Subscribe to our newsletter</h1>
           
                <div className={styles.formBody}>
                        <input onChange={({target}:ChangeEvent<HTMLInputElement>)=>setEmail(target.value)}  type="email" value={email!} placeholder="Your email address" />
                        <button disabled={isActive} onClick={notifySucces} className="btn1">Subscribe</button>
                </div>
            </div>
        </div>
    )
}


export default Newsletter