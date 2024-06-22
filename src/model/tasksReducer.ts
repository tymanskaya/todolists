import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, ReremoveTodolistActionType} from "./todolists-reducer";

export const tasksReduser = (state: TasksStateType, action: ActionsTasksType):  TasksStateType=> {
    switch (action.type) {
        case 'REMOVE_TASK': {
            //const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
            // 		setTasks(newTodolistTasks)
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case 'ADD_TASK': {
            //const newTask = {
            // 			id: v1(),
            // 			title: title,
            // 			isDone: false
            // 		}
            // 		const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE_TASK': {
            //const newTodolistTasks = {
            // 			...tasks,
            // 			[todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.taskStatus
                } : task)
            }
        }
        case 'UPDATE_TASK': {
            //const newTodolistTasks = {
            // 			...tasks,
            // 			[todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
            // 		}
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
            }
        }
        case 'ADD_TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            // let copystate={...state}
            // delete copystate[action.payload.id]
            // return state
            //делаем декструктуризацию. Разворачиваем объект, достаем из него свойчтво,
            // которое хотим удалить
            //ему изменяем значение на пустой массив
            //в рест попадают остальные свойства, их и возвращаем
            const {[action.payload.id]:[],...rest}=state
            return state
        }
        default:
            return state
    }
}

type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
type AddTasksActionType = ReturnType<typeof addTaskAC>
type ChangeTasksActionType = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export type ActionsTasksType =
    RemoveTasksActionType
    | AddTasksActionType
    | ChangeTasksActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | ReremoveTodolistActionType
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}
export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string) => {
    return {
        type: 'CHANGE_TASK',
        payload: {
            taskId,
            taskStatus,
            todolistId
        }
    } as const
}
export const updateTaskAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'UPDATE_TASK',
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}