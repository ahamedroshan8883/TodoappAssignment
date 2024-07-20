import { Link } from "react-router-dom"
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
export default function Nav(){
  return (
    <>
     <Toolbar sx={{display:"flex", justifyContent:'space-between',alignItems:'center',bgcolor:'#EEFCFF'}} >
     <Typography variant="h6" component="div">
            {localStorage.getItem('fullname')}
        </Typography>
      <Typography sx={{display:"flex",alignItems:'center'}}>
        <Link to='/SignOut'><Button variant="contained" color="error">Sign Out</Button></Link>
        &nbsp;&nbsp;<AccountCircleIcon></AccountCircleIcon>
      </Typography>
    </Toolbar>
    </>
  )
};

