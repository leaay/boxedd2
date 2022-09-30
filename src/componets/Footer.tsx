import Link from "next/link"
import Image from "next/future/image"

import styles from '../styles/footer.module.scss'

const Footer = () => {

    return(

        <div className={styles.footer}>

            <h5>
                BOXEDD ®
            </h5>

            <div className={styles.sm}>
                <Link href={'https://www.instagram.com'} >
                    <a> <Image src='/ig.svg' width={24} height={24} alt='instagram' /></a>
                </Link>
                <Link href={'https://www.facebook.com'} >
                    <a> <Image src='/fb.svg' width={24} height={24} alt='facebook' /></a>
                </Link>
            </div>

        </div>
    )

}

export default Footer