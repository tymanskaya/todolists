import {addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC} from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'

let todolistId1: string
let todolistId2: string
let startState:TodolistType[]

//beforeEach функция, которая будет срабатывать перед каждым тестом
beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()

// 1. Стартовый state
    startState= [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {


    const endState = todolistsReducer(startState, addTodolistAC('New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
})
test('correct todolist should change its name', () => {



    const endState = todolistsReducer(startState, updateTodolistAC(todolistId2,'What to learn' ))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('What to learn')
})
test('correct filter of todolist should be changed', () => {

    const endState = todolistsReducer(startState, changeFilterAC('completed',todolistId2, ))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})