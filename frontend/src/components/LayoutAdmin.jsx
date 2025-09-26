

import HeaderAdmin from "./HeadAdmin";
import FooterAdmin from "./FooterAdmin";
import Dashboard from "./Dashboard";

function LayoutAdmin(){
    return(
        <>
         <HeaderAdmin/>
        
         <Dashboard/>   
     
        <FooterAdmin/>
        </>
    )
}

export default LayoutAdmin;