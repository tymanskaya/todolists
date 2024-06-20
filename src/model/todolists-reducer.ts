import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
]
export const todolistsReducer=(state: TodolistType[]=initialState, action: ActionType)=>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(todo=>todo.id!==action.payload.id)
        }
        case 'ADD-TODOLIST':{

            return [...state,{id: v1(), title: action.payload.title, filter: 'all'}]
        }
        case 'UPDATE-TODOLIST':{
            return state.map(todo=>todo.id===action.payload.todolistId?{...todo, title: action.payload.title}: todo)
        }
        case 'CHANGE-TODOLIST-FILTER':{
            return state.map(todo=>todo.id===action.payload.todolistId?{...todo, filter: action.payload.filter}: todo)
        }
        default: return state
    }
}


type ReremoveTodolistActionType=ReturnType<typeof removeTodolistAC>
export const removeTodolistAC=(id: string)=> {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        },
    } as const
}

type AddTodolistActionType=ReturnType<typeof addTodolistAC>
export const addTodolistAC=(title: string)=> {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        },
    } as const
}

type UpdateTodolistActionType=ReturnType<typeof updateTodolistAC>

export const updateTodolistAC=(todolistId: string, title: string)=>{
    return {
        type: 'UPDATE-TODOLIST',
        payload:{
            todolistId,
            title
        }
    } as const
}

type ChangeFilterActionType=ReturnType<typeof changeFilterAC>
export const changeFilterAC=(filter: FilterValuesType, todolistId: string)=>{
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload:{
            filter,
            todolistId
        }
    }as const
}
type ActionType=ReremoveTodolistActionType|AddTodolistActionType|UpdateTodolistActionType|ChangeFilterActionType