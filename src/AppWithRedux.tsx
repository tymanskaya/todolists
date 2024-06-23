import './App.css';
import {Todolist} from "./Todolist";
import React, {Reducer, useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {MenuButton} from "./MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from "@mui/material/CssBaseline";
import {
	ActionTodolistType,
	addTodolistAC,
	changeFilterAC,
	removeTodolistAC,
	todolistsReducer, updateTodolistAC
} from "./model/todolists-reducer";
import {
	ActionsTasksType,
	addTaskAC,
	changeTaskStatusAC,
	removeTaskAC,
	tasksReduser,
	updateTaskAC
} from "./model/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function AppWidthRedux() {


	let todolistID1 = v1()
	let todolistID2 = v1()

	const todolists=useSelector<AppRootStateType, Array<TodolistType>>(state=>state.todolists)
	const tasks=useSelector<AppRootStateType, TasksStateType>(state=>state.tasks)
	const dispatch=useDispatch()

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	});

	const removeTask = (taskId: string, todolistId: string) => {
		dispatch(removeTaskAC(taskId,todolistId))
	}

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC(title,todolistId))
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		dispatch(changeTaskStatusAC(taskId,taskStatus,todolistId))
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		dispatch(changeFilterAC(filter,todolistId))
	}

	const removeTodolist = (todolistId: string) => {
		let action=removeTodolistAC(todolistId)
		dispatch(action)


	}

	const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title))

	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatch(updateTaskAC(todolistId,taskId,title))
	}

	const updateTodolist = (todolistId: string, title: string) => {
		dispatch(updateTodolistAC(todolistId,title))
	}

	const changeModeHandler = () => {
		setThemeMode(themeMode == "light" ? "dark" : 'light')
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<AppBar position="static" sx={{mb: '30px'}}>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
					<IconButton color="inherit">
						<MenuIcon/>
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler}/>
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{mb: '30px'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>

				<Grid container spacing={4}>
					{todolists.map((tl) => {

						const allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
						}

						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
						}

						return (
							<Grid>
								<Paper sx={{p: '0 20px 20px 20px'}}>
									<Todolist
										key={tl.id}
										todolistId={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										updateTask={updateTask}
										updateTodolist={updateTodolist}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default AppWidthRedux;
