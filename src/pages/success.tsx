import { NextPage } from "next"
import styles from '../styles/succes-canceled.module.scss'
import Image from "next/future/image"
import Link from "next/link"

const Success:NextPage = () => {
    return (
        <div className={styles.pageBody}>
            <div className={styles.imgContainer}>
                <Image style={{width:'70%'}} src="/success2.svg" alt="succes" width={50} height={50} />
            </div>
            <div className={styles.textContainer}>
                <h1>SUCCES</h1>
                <h3>Thanks for your purchase for more information check your e-mail</h3>
                <Link href={'/'}>{'> to homepage'}</Link>
            </div>
        </div>
    )
}

export default Success