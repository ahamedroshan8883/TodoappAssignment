import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, IconButton, Typography } from "@mui/material";
import Nav from "../Nav/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteTodos, markCompleteTodo} from "../../Redux/todoSlicer";
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function TodosPage({setTodosInputForEdit,setTodoForEdit}){
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [Todos,setTodos] = useState([]);
    let [filterdTodos,setfilteredTodos] = useState([]);
    let [Grid, setGrid] = useState(JSON.parse(localStorage.getItem('gridView')) || false); // Retrieve the grid view preference from localStorage
    let todos = useSelector(data=>data.todo.todos)
    const TodosforUser = ()=>{
        let updatedTodos = todos.filter(todo=>todo.user === localStorage.getItem('email'));
        console.log(updatedTodos);
        setTodos(updatedTodos);
        setfilteredTodos(updatedTodos);
    }
  let user = localStorage.getItem('email');
  const handleEdit = (Todo)=>{
    setTodosInputForEdit(Todo);
    setTodoForEdit(true);
    navigate('/CreateTask')
  }
  let categories = ["Incompleted","Completed","Today task","Important","all"];
  let handleCate = (cate)=>{
    console.log();
    switch(cate){
      case "Incompleted":
        let IncompletedTodos = Todos.filter(todo=>todo.completed == false);
        setfilteredTodos(IncompletedTodos);
      break;
      case "Important":
        let ImportantTodos = Todos.filter(todo=>todo.important == true);
        setfilteredTodos(ImportantTodos);
      break;
      case "Today task":
        let todayString = new Date().toLocaleDateString(); // Get the current date as a localized string
        let TodayTodos = Todos.filter(todo => new Date(todo.duedate).toLocaleDateString() === todayString);
        console.log(Todos[0].duedate); // Assuming Todos has at least one element
        console.log(todayString);
        setfilteredTodos(TodayTodos);
      break;
      case "Completed":
        let CompletedTodos = Todos.filter(todo=>todo.completed == true);
        setfilteredTodos(CompletedTodos);
      break;
      case "all":
        TodosforUser();
      break;
      default:
        TodosforUser();
    }
  }
  const handleGridview = () => {
    setGrid(prevGrid => {
      const newGrid = !prevGrid;
      localStorage.setItem('gridView', JSON.stringify(newGrid)); // Save the grid view preference to localStorage
      return newGrid;
    });
  };
  useEffect(()=>{
    TodosforUser();
  },[todos])
  return (
    <>
    <CssBaseline />
    {user?<Nav></Nav>:''}
      <Container maxWidth="xl">
        <Box sx={{ height: '100vh'}} >
            <Box sx={{ bgcolor: '#ECFBFF', width:'80vw', padding:'20px', borderRadius:'20px',boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',margin:' 10px auto'}}>
                <Box sx={{bgcolor:'#EEFCFF',width:'100%',borderTopRightRadius:'20px',borderTopLeftRadius:'20px',
                    boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0px'}}>
                        <h2 style={{padding:'10px'}}>Todos List</h2>
                        <Box display={'flex'} alignItems={'center'}>
                          {!Grid?<IconButton onClick={()=>handleGridview()}><ViewModuleIcon color="primary"/></IconButton>:<IconButton onClick={()=>handleGridview()}><ViewListIcon color="primary"/></IconButton>}
                          <Link to='/CreateTask' style={{padding:'10px'}}><Button color="success" variant="contained"> + ADD ASK</Button></Link>
                        </Box>
                </Box>
                <Box sx={{padding:'10px'}}>
                    <Typography display={"flex"} flexWrap={"wrap"}
                      justifyContent={"space-evenly"}
                    >{categories.map((index,cate)=><button style={{
                      backgroundColor:"#7AB4C0",padding:'5px',borderRadius:'20px',
                      fontSize:"small",color:"#ECFBFF",border:"2px dotted #ECFBFF",cursor:'pointer'
                    }}
                    onClick={()=>handleCate(categories[cate])}
                    key={index}>{categories[cate]}&nbsp;</button>)}</Typography>
                </Box>
                  {filterdTodos.length<=0? 
                  <Box sx={{width:'100%',boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'}}>
                      <Typography sx={{color:'red',padding:'20px',display:'flex',alignItems:'center',justifyContent:'center'}}><CancelIcon></CancelIcon>No Tasks found</Typography>
                  </Box>:!Grid?
                <Box>
                  {filterdTodos.map(todo=>
                  <Box key={todo.id} sx={{width:'100%',boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                    padding:'10px',display:"flex",flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <Typography>
                        <FormControlLabel checked={todo.completed} control={<Checkbox onClick={()=>dispatch(markCompleteTodo(todo))} />}/>
                        {todo.completed? <del>{todo.task}</del> :todo.task}
                        </Typography>
                      <Typography sx={{display:"flex",alignItems:'center'}}>
                          {todo.important?<StarIcon></StarIcon>:''}
                          <IconButton color="info" onClick={()=>handleEdit(todo)}><EditIcon ></EditIcon></IconButton>
                          <IconButton color="error" onClick={()=>dispatch(deleteTodos(todo.id))}><DeleteIcon></DeleteIcon></IconButton>
                      </Typography>
                  </Box>)}
                </Box>:
                <Box sx={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
                  {filterdTodos.map(todo=>
                  <Box key={todo.id} sx={{width:'100%',boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                    padding:'10px',display:"flex",flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <Typography sx={{fontSize:'small'}}>
                        <FormControlLabel checked={todo.completed} control={<Checkbox onClick={()=>dispatch(markCompleteTodo(todo))} />}/>
                        {todo.completed? <del>{todo.task}</del> :todo.task}
                      </Typography>
                      <Typography sx={{display:"flex",alignItems:'center'}}>
                          {todo.important?<StarIcon></StarIcon>:''}
                          <IconButton color="info" onClick={()=>handleEdit(todo)}><EditIcon ></EditIcon></IconButton>
                          <IconButton color="error" onClick={()=>dispatch(deleteTodos(todo.id))}><DeleteIcon></DeleteIcon></IconButton>
                      </Typography>
                  </Box>)}
                </Box>}
            </Box>
        </Box>
        {/* {JSON.stringify(Todos)} */}
      </Container>
    </>
  )
};

