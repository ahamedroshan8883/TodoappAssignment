import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function SignOut(){
    let navigate = useNavigate();
    const signOut = ()=>{
        localStorage.removeItem('email');
        localStorage.removeItem('fullname');
        localStorage.removeItem('gender');
        navigate('/');
    }
    useEffect(()=>{
        signOut();
    },[])
  return (
    <>
      
    </>
  )
};

