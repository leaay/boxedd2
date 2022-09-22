import { NextPage } from "next"
import styles from '../styles/succes-canceled.module.scss'
import Image from "next/future/image"
import Link from "next/link"

const Canceled:NextPage = () => {
    return (
        <div className={styles.pageBody}>
            <div className={styles.imgContainer}>
                <Image src="/x.svg" alt="canceled" width={80} height={80} />
            </div>
            <div className={styles.textContainer}>
                <h1>SOMETHING WENT WRONG..</h1>
                <h3>Checkout has been canceled please try again</h3>
                <Link href={'/'}>{'> to homepage'}</Link>
            </div>
        </div>
    )
}

export default Canceled