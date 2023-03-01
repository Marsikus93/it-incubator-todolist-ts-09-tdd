import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>
export type addTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType | addTaskActionType | ChangeTaskStatusActionType |ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType ;

export const taskReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD_TASK':
            return {
                ...state,
                [action.todolistId]:
                    [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.todolistId]:state[action.todolistId]
                    .map(t=>t.id===action.taskId?{...t,isDone:action.isDone}:t)

            }
        case 'CHANGE_TASK_TITLE':
        case 'ADD-TODOLIST':
            return {
                ...state,
        [action.todolistId]:[]
            }
        case 'REMOVE-TODOLIST':{
            // let{[action.id]:[], ...rest}={...state}
            // return rest
          let copyState={...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD_TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string,isDone:boolean, todolistId: string) => {
    return {type: 'CHANGE_TASK_STATUS',taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string,title:string, todolistId: string) => {
    return {type: 'CHANGE_TASK_TITLE',taskId, title, todolistId} as const
}


