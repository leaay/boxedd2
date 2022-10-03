
import Footer from "./Footer";
import Navbar from "./Navbar";

interface props {
    children: React.ReactNode
}


const Layout = ({ children }:props) => {

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )

}


export default Layout;