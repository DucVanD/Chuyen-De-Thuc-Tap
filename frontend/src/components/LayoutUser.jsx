import { Outlet } from "react-router-dom";
import Header from "./HeaderUser";
import Footer from "./FooterUser";
import Nav from "./Nav";


function LayoutUser(){
    return(
        <>
         <Header/>
         <Nav/>   
        <Outlet/>
        <Footer/>
        </>
    )
}

export default LayoutUser;