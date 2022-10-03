import { NextPage } from "next"
import { trpc } from "../../utils/trpc";
import Image from "next/future/image"
import Link from "next/link";
import styles from '../../styles/products.module.scss'
import Spiner from "../../componets/Spiner";
import { useRouter } from "next/router";
import { useEffect , useState } from "react";

interface product{
    id:string,
    name:string,
    price:number,
    desc:string,
    img:string,
    slug:string
}
interface filters{
    cat:string,
    order: string,
}

const Products:NextPage = () => {

    const [showFilters , setShowFilters] = useState<boolean>(false)

    const [getAllCategory , setgetAllCategory] = useState<filters | any>({
        cat:'all',
        order:'latest'
    })
    const router = useRouter()

    const {category} = router.query


    function handleFilter(e:React.ChangeEvent<HTMLSelectElement>){
        
        setgetAllCategory({...getAllCategory , order:e.target.value})
    }

    useEffect(()=>{
        
        setgetAllCategory({...getAllCategory , cat:category })
    
    },[category])


    const {data,error,isLoading} = trpc.useQuery(['products.all' , getAllCategory ],{ 
        refetchOnWindowFocus: false,

     })

    if(isLoading){
        return(
            <Spiner/>
        )
    }

    if(error){
        return(
            <p>error</p>
        )
    }


    return(
        <div className={styles.body}>
             <div className={styles.filters}>
                <button onClick={()=>setShowFilters(!showFilters)}>FILTERS <Image src={'/filters.svg'} alt="filters-icon" width={24} height={24}/> </button>
                     {showFilters &&  
                     <select value={getAllCategory.order} onChange={handleFilter}>
                        <option value='latest'>latest</option>
                        <option value='high-low'>high-low</option>
                        <option value='low-high'>low-high</option>
                    </select>}   


            </div>
            <div className={styles.wrapper}>
                {data?.map((item:product)=><Link  passHref href={`/products/${item.slug}`}  key={item.id}>
                    <div className={styles.productItem}> 
                    <Image blurDataURL="/blur.png" placeholder="blur" alt='blur-loader' src={item.img} width={400} height={600}  />
                    <div className={styles.itemNameWrapper}><p>{item.name}</p><p>{item.price} PLN</p></div>
                    </div>
                </Link>)}
            </div>
        </div>
    )
}

export default Products
