import { useLocation } from "react-router-dom";

const Contact = () => {
    const location = useLocation();
   //console.log(location);
    return ( <>
    <div>{location.state.name}</div>
    <div>{location.state.email}</div>
    </> );
}
 
export default Contact;