
interface prop{
    size?:string,
    pos?:boolean,

}

const Spiner = ({size='40px', pos=false}:prop) => {

    return(
        <div style={{width:`${size}`, position: pos ? 'initial' : 'absolute'}} className="spiner"></div>
    )

}

export default Spiner