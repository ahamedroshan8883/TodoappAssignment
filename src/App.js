import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Taskform from './components/TaskForm/Taskform';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import TodosPage from './components/TodosPage/TodosPage';
import SignOut from './components/SignOut/SignOut';
import { useState } from 'react';

function App() {
  const initialState = {
    id: "",
    task:"",
    completed:false,
    important:false,
    duedate:"",
    user:""
  }
  let[TodosInputForEdit,setTodosInputForEdit] = useState(initialState);
  let[TodoForEdit,setTodoForEdit] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<SigninForm></SigninForm>}></Route>
      <Route path='/TodoappAssignment/' element={<SigninForm></SigninForm>}></Route>
        <Route path='/SignUp' element={<SignupForm></SignupForm>}></Route>
        <Route path='/SignIn' element={<SigninForm></SigninForm>}></Route>
        <Route path='/Todos' element={<TodosPage setTodosInputForEdit={setTodosInputForEdit} setTodoForEdit={setTodoForEdit}></TodosPage>}></Route>
        <Route path="/CreateTask" element={<Taskform TodosInputForEdit={TodosInputForEdit} TodoForEdit={TodoForEdit} 
        setTodosInputForEdit={setTodosInputForEdit} setTodoForEdit={setTodoForEdit}></Taskform>}></Route>
        <Route path="/SignOut" element={<SignOut></SignOut>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
