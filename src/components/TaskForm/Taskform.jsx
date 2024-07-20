import { Button,Box, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment,FormControlLabel, Checkbox } from '@mui/material';
import '../TaskForm/Taskform.css'
import Container from '@mui/material/Container';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGroup from '@mui/material/FormGroup';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addTodos, updateTodos } from '../../Redux/todoSlicer';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';

export default function Taskform({TodoForEdit,TodosInputForEdit,setTodosInputForEdit,setTodoForEdit}){
  console.log(TodoForEdit);
  console.log(TodosInputForEdit);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const initialState = {
      id: uuidv4(),
      task:"",
      completed:false,
      important:false,
      duedate:dayjs(Date.now().toLocaleString),
      user:localStorage.getItem('email')
    }
    let[todoInput,setTodosInputs] = useState(initialState);
    const handlechanges = (e)=>{
      const{value,name} = e.target;
      setTodosInputs({...todoInput,[name]:value})
    } 
    const handleSubmit = (e,todoInput)=>{
      e.preventDefault();
      if(!TodoForEdit){
        dispatch(addTodos(todoInput))
      }else{
        dispatch(updateTodos(todoInput));
      }
      setTodosInputs(initialState);
      setTodoForEdit(false);
      setTodosInputForEdit(initialState)
      navigate('/Todos')
    }
    useEffect(()=>{
      if(TodoForEdit){
        setTodosInputs({id: TodosInputForEdit.id,
          task: TodosInputForEdit.task,
          completed:TodosInputForEdit.completed,
          important:TodosInputForEdit.important,
          duedate:dayjs(TodosInputForEdit.task),
          user:localStorage.getItem('email')});
      }
    },[])
  return (<>
    <Nav ></Nav>
    <Container maxWidth="sm" sx={{display:'flex',alignItems:"center",justifyContent:"center",flexDirection:'column'}}>
      <Box 
        height={{ xs: 'auto', sm: 300 }} 
        width={{ xs: '100%', sm: 600 }}
        display="flex" 
        flexDirection="column" 
        gap={4} 
        p={4}
        mt={4}
        bgcolor={"#ECFBFF"}
        borderRadius={'20px'} 
        sx={{
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
        }}
      >
        <form onSubmit={(e) => { handleSubmit(e, todoInput) }}>
          <FormGroup>
            <Typography component="h1" variant="h5" p={1}>
              Create a task
            </Typography>
            <FormControl fullWidth sx={{ m: 0 }} color='success'>
              <InputLabel htmlFor="outlined-adornment-task">Task</InputLabel>
              <OutlinedInput
                id="outlined-adornment-task"
                label="Task"
                value={todoInput.task}
                name='task'
                onChange={handlechanges}
                required
              />
            </FormControl>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2}}>
              <FormControl sx={{ mt: 2, flexGrow: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Due date"
                    name='duedate'
                    value={todoInput.duedate}
                    onChange={(newValue) => setTodosInputs({ ...todoInput, duedate: newValue })}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControlLabel
                control={<Checkbox name="important" checked={todoInput.important} value={todoInput.important} onChange={() => setTodosInputs({ ...todoInput, important: !todoInput.important })} />}
                label="Important"
              />
            </Box>
            <Button color="success" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Add Task
            </Button>
            <Link to='/Todos' style={{ textDecoration: 'none' }}>
              <Button color="error" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Back
              </Button>
            </Link>
          </FormGroup>
        </form>
      </Box>
    </Container>
    </>
  );
}
