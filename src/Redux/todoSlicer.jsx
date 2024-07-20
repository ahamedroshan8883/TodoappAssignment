import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos:[
        {   "user":"ahamed8883.h@gmail.com",
            "id": 1,
            "task": "Do something nice for someone you care about",
            "completed": false,
            "userId": 152,
            "important":false
            ,"duedate":"2024-07-24T18:30:00.000Z"
            },
            {
            "user":"ahamed8883.h@gmail.com",
            "id": 2,
            "task": "Memorize a poem",
            "completed": true,
            "userId": 13,
            "important":true
            ,"duedate":"2024-07-24T18:30:00.000Z"
            },
            {
            "user":"ahamed8883.h@gmail.com",
            "id": 3,
            "task": "Watch a classic movie",
            "completed": true,
            "userId": 68,
            "important":false
            ,"duedate":"2024-07-24T18:30:00.000Z"
            },
            {
            "user":"ahamed8883.h@gmail.com",
            "id": 4,
            "task": "Watch a documentary",
            "completed": false,
            "userId": 84,
            "important":true
            ,"duedate":"2024-07-24T18:30:00.000Z"
            },
            {   "user":"ahamedroshanakther@gmail.com",
                "id": 5,
                "task": "Do something nice for someone you care about",
                "completed": false,
                "userId": 152,
                "important":false
                ,"duedate":"2024-07-24T18:30:00.000Z"
                },
                {
                "user":"ahamedroshanakther@gmail.com",
                "id": 6,
                "task": "Memorize a poem",
                "completed": true,
                "userId": 13,
                "important":true
                ,"duedate":"2024-07-24T18:30:00.000Z"
                },
                {
                "user":"ahamedroshanakther@gmail.com",
                "id": 7,
                "task": "Watch a classic movie",
                "completed": true,
                "userId": 68,
                "important":false
                ,"duedate":"2024-07-24T18:30:00.000Z"
                },
                {
                "user":"ahamedroshanakther@gmail.com",
                "id": 8,
                "task": "Watch a documentary",
                "completed": false,
                "userId": 84,
                "important":true
                ,"duedate":"2024-07-24T18:30:00.000Z"
                },
    ],
    todoslength:0
}

const todoSlicer = createSlice({
    name:'Todos',
    initialState,
    reducers:{
        addTodos:(state,action)=>{
            state.todos.push(action.payload);
            state.todoslength = state.todos.length;
        },
        deleteTodos:(state,action)=>{
            console.log(action.payload);
            let updatedTodos = state.todos.filter(todo=>todo.id!==action.payload);
            state.todos = updatedTodos
        },
        updateTodos:(state,action)=>{
            const { id, task, completed, important, duedate } = action.payload;
            const existingTodo = state.todos.find(todo => todo.id === id);
            if (existingTodo) {
                existingTodo.task = task !== undefined ? task : existingTodo.task;
                existingTodo.completed = completed !== undefined ? completed : existingTodo.completed;
                existingTodo.important = important !== undefined ? important : existingTodo.important;
                existingTodo.duedate = duedate !== undefined ? duedate : existingTodo.duedate;
            }
        },
        markCompleteTodo:(state,action)=>{
            const {completed} = action.payload;
            const existingTodo = state.todos.find(todo=>todo.id==action.payload.id);
            if(existingTodo){
                existingTodo.completed = completed !== undefined ? !completed : existingTodo.completed;
            }
        }
    }
})

export const {addTodos,deleteTodos,updateTodos,markCompleteTodo} = todoSlicer.actions;
export default todoSlicer.reducer; 