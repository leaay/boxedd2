import type { NextPage } from "next";
import {lazy , Suspense} from "react";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Footer from "../componets/Footer";
import Carousel from "../componets/Carousel";
import useMedia from "../hooks/useMedia";
import styles from '../styles/homepage.module.scss'
import Newsletter from "../componets/Newsletter";
import HomeLinks from "../componets/HomeLinks";

// const Spline = lazy(() => import('@splinetool/react-spline'));

const Home: NextPage = () => {


  const isDesktop = useMedia('(min-width: 960px)');

  const photos = [
    '/c1.png',
    '/c2.png',
    '/c3.png',
  ]





  return (
    <>
      <Head>
        <title>BOXEDD</title>
        <meta name="description" content="Boxedd is polish brand creating minimal-wear" />
        <meta name="name" content="Boxedd" />
        <link rel="apple-touch-icon" sizes="180x180" href="favico/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favico/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favico/favicon-16x16.png" />
        <link rel="manifest" href="favico/site.webmanifest"/>
      </Head>
      <Carousel items={photos} />

      <div className={styles.aboutus}>
        <div className={styles.aboutTextBox}>
          <h1>ABOUT US</h1>
          <p className={styles.text1}>BOXEDD IS A POLISH FASHION BRAND WHICH SPECIALISES IN MANUFACTURING LUXURY ESSENTIALS PAYING ATTENTION TO UNCOMMON CUTS AND QUALITY. WE DEFINE OURSELVES AS PROFESSIONALS AS WELL AS PERFECTIONISTS. OUR CLOTHES WILL HELP YOU TO BUILD A CAPSULE WARDROBE.</p>
        </div>


        <div className={styles.aboutTextBox}>
          {isDesktop ? 
              <>
                <h3>MATERIALS</h3>
                <Image src={'/feather.svg'} width={100} height={100} alt='connection' />
              </>
              :          
              <div className={styles.mobileBox}>
                  <h3>MATERIALS</h3>
                  <Image src={'/feather.svg'} width={25} height={25} alt='connection' />
              </div>
          }


          <p className={styles.text2}>Our clothes are manufactured from the highest quality materials imported from premium suppliers. Before material enters production its repeatedly tested for its durability. Moreover all of our products are pre-washed so they will not shrink. BOXEDD products will serve for years - we are known for high quality and longevity.</p>

        </div>
        <div className={styles.aboutTextBox}>

          {isDesktop ? 
              <>
                <h3>PROCESS OF CREATING</h3>
                <Image src={'/flow.svg'} width={100} height={100} alt='connection' />
              </>
              :          
              <div className={styles.mobileBox}>
                  <h3>PROCESS OF CREATING</h3>
                  <Image src={'/flow.svg'} width={25} height={25} alt='connection' />
              </div>
          }
          <p className={styles.text2}>
          After materials pass the quality tests, they enter the sewing room. We only use services of trustworthy polish sewing rooms with many years of experience. Prevailing conditions are subjected to our personal verification - starting from sterility to respect for labour rights. BOXEDD is an ethical brand and all of our actions come in peace with values embraced by us. Sustainability and awareness are just part of them.
            </p>
        </div>
        
       
        
      </div>

      <HomeLinks />
      <Newsletter />

    </>
  );
};

export default Home;


