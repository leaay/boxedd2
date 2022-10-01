import Link from 'next/link';
import styles from '../styles/homeLinks.module.scss'
import { trpc } from "../utils/trpc";
import Spiner from './Spiner';
const HomeLinks = () => {


    const{data} = trpc.useQuery(['products.find-category'],{ 
        refetchOnWindowFocus: false,
     })



    return(
        <div className={styles.links}> 

        {/* <div className={styles.splineWrapper}>
          <Suspense fallback={<p>loading..</p>}>
            <Spline scene="https://prod.spline.design/POUafAQ4O7hLTVmW/scene.splinecode" />
          </Suspense>
        </div> */}

            <div className={styles.linksBody}>

                {data ? data.map((i, index)=><Link passHref  href={{pathname:'/products',query:{category:`${i.category}`}}} key={index}>
                    <a className='link2'>{i.category}</a>
                </Link>) :
                
                <Spiner />}


            </div>
        </div>
    )
}

export default HomeLinks