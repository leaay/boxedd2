import Image from 'next/future/image'
import styles from '../styles/carousel.module.scss'
import {useState} from 'react'
import {motion} from 'framer-motion'
import {useSwipeable} from 'react-swipeable'
import {useEffect} from 'react'
interface prop {
    items:string[]
}

const Carousel = ({items}:prop)=>{

    const [currentIndex , setCurrentIndex] = useState<number>(0)

    const handlers = useSwipeable({
        onSwipedLeft:(e)=> nextSlide(),
        onSwipedRight:(e)=> prevSlide(),
      });


    function nextSlide(){
        if(currentIndex === items.length - 1){
            setCurrentIndex(0)
        }else{
            setCurrentIndex(currentIndex + 1)
        }
    }

    function prevSlide(){

        if(currentIndex === 0){
            setCurrentIndex(items.length - 1)
        }else{
            setCurrentIndex(currentIndex - 1)
        }

    }

    // useEffect(() => {
    //     setTimeout(() => {nextSlide()},5000);
    // }, [currentIndex])

   

    return(
        <div {...handlers} style={{ touchAction: 'pan-y' }}  className={styles.Cwrapper}>

                {items.map((item,index)=><motion.div 
                    animate={{left:`${(index - currentIndex )* 100}%`}}
                    transition={{duration:0.5}}
                    style={{left:`calc(${index} * 100% )`}}
                    key={index}    
                    className={styles.slide}>
                    <Image priority src={item} width={1680} height={1118} alt='hero' />
                </motion.div>)}
                <motion.div layout className={styles.nav}>
                        {items.map((item,index)=><motion.button
                            className={currentIndex === index ? styles.navActive : styles.navNormal} 
                            key={index}
                            onClick={()=>setCurrentIndex(index)}
                            layout>
                            </motion.button>)}
                </motion.div>
               

        </div>
    )
}

export default Carousel