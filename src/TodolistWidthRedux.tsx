import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, Reducer} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./AppWithRedux";
import {changeFilterAC, removeTodolistAC, updateTodolistAC} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from "./model/tasksReducer";


type PropsType = {
	todolist: TodolistType
}

export const TodolistWidthRedux = ({todolist}:PropsType) => {
	const {id, title, filter}=todolist
	let tasks=useSelector<AppRootStateType, Array<TaskType>>(state =>state.tasks[id] )
	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		dispatch(changeFilterAC( filter, id))
	}
	const dispatch = useDispatch()
	const removeTodolistHandler = () => {
		dispatch(removeTodolistAC(id))
	}

	const addTaskCallback = (title: string) => {
		dispatch(addTaskAC(title, id))
	}

	const updateTodolistHandler = (title: string) => {
		dispatch(updateTodolistAC(id, title))
	}

	if (filter==='active'){
		tasks=tasks.filter(t=>t.isDone===false)
	}
	if (filter==='completed'){
		tasks=tasks.filter(t=>t.isDone===true)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon/>
				</IconButton>
			</div>
			<AddItemForm addItem={addTaskCallback}/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								dispatch(removeTaskAC(task.id, id))
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								dispatch(changeTaskStatusAC(task.id, newStatusValue, id))
							}

							const changeTaskTitleHandler = (title: string) => {
								dispatch(updateTaskAC(id, task.id, title))
							}
							return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
								<div>
									<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
									<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
								</div>
								<IconButton onClick={removeTaskHandler}>
									<DeleteIcon/>
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<Button
					variant={filter === 'all' ? 'outlined' : 'text'}
					color={'inherit'}
					onClick={() => changeFilterTasksHandler('all')}>
					All
				</Button>
				<Button
					variant={filter === 'active' ? 'outlined' : 'text'}
					color={'primary'}
					onClick={() => changeFilterTasksHandler('active')}>
					Active
				</Button>
				<Button
					variant={filter === 'completed' ? 'outlined' : 'text'}
					color={'secondary'}
					onClick={() => changeFilterTasksHandler('completed')}>
					Completed
				</Button>
			</Box>
		</div>
	)
}
