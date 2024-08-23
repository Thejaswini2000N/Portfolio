import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AddList from "./AddList";
import { deleteTodo, updateTodo } from "../redux/Tasks.js/TasksActions";

const TaskView = (props) => {
    const [isShown, setIsShown] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState('')
    const { taskState, updateTodoDispatch, deleteTodoDispatch } = props
    const [searchTodo, setSearchTodo] = useState('')
    const [paginatedTodo, setPaginatedTodo] = useState([])
    const [allTodo, setAllTodo] = useState([])
    const [currentPaginationNumber, setCurrentPaginationNumber] = useState(1)
    const [completedCount, setCompletedCount] = useState(0)
    const paginateByRef = useRef(5)
    const params = useParams()
    const localStorageTaskState = JSON.parse(localStorage.getItem('taskState'))
    const task = taskState?.tasks.find((e) => e.id === params.id)
    // console.log('==> task', taskState)
    // console.log('==> local', JSON.parse(localStorage.getItem('taskState')))

    const addTodo = () => {
        setIsShown(true)
    }

    const editTodo = (todo) => {
        setSelectedTodo(todo)
        setIsShown(true)
    }

    const closeTodo = () => {
        setSelectedTodo('')
        setIsShown(false)
    }

    const deleteTodo = (taskId, todoId) => {
        deleteTodoDispatch({ taskId, todoId })
    }

    const updateTodo = (e, todo) => {
        // console.log('==> value', e.target.checked)
        // console.log('==> id', todo)
        let updatedTodoObj = {}
        if (e.target.checked) {
            updatedTodoObj = {
                ...todo,
                isCompleted: true,
                task: task
            }
        } else {
            updatedTodoObj = {
                ...todo,
                isCompleted: false,
                task: task
            }
        }

        // console.log('==> updatedTodoObj', updatedTodoObj)
        updateTodoDispatch(updatedTodoObj)
    }

    useEffect(() => {
        if (!searchTodo.length) {
            setAllTodo(task?.todos)
        } else {
            setAllTodo(task?.todos.filter((todo) => todo.todoName.toLowerCase().includes(searchTodo)))
            setCurrentPaginationNumber(1)
        }
    }, [searchTodo, task.todos])

    useEffect(() => {
        const startFrom = currentPaginationNumber * paginateByRef.current - paginateByRef.current
        const endAt = currentPaginationNumber * paginateByRef.current
        console.log('==> in all', allTodo)
        setPaginatedTodo(allTodo.slice(startFrom, endAt))
    }, [allTodo, currentPaginationNumber])

    useEffect(() => {
        let completedTodo = allTodo.filter((todo) => todo.isCompleted)
        setCompletedCount(completedTodo.length)
    }, [allTodo])

    function debounce(func, timeout = 2000) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func(...args); }, timeout);
        };
    }

    const changeSearchText = (args) => {
        // console.log('==> arg', args)
        setSearchTodo(args.target.value)
    }

    const debouncedChangeSearchText = debounce((args) => changeSearchText(args))

    const renderPagination = () => {
        let curPaginationNumber = 0
        const numOfButtons = Math.ceil(allTodo.length / paginateByRef.current)
        const paginationButtons = []
        const paginationButtonClick = (e, i) => {
            e.preventDefault()
            curPaginationNumber = i
            console.log('==> space', i)
            i !== 0 && i !== numOfButtons + 1 && setCurrentPaginationNumber(i)
            // console.log('==> index', i, i * paginateBy - 4, i * paginateBy)
            // console.log('==> paginated record', allTodo.slice((curPaginationNumber * paginateByRef.current - paginateByRef.current), (curPaginationNumber * paginateByRef.current)))
            // console.log('==> current pagination num', currentPaginationNumber, curPaginationNumber, i)
            // paginateBy
        }
        for (let i = 0; i <= numOfButtons - 1; i++) {
            paginationButtons.push(<button key={i} onClick={(e) => paginationButtonClick(e, i + 1)}>{i + 1}</button>)
        }
        return (
            <div>
                <button onClick={(e) => paginationButtonClick(e, currentPaginationNumber - 1)}> {'<'} </button>
                {paginationButtons}
                <button onClick={(e) => paginationButtonClick(e, currentPaginationNumber + 1)}> {'>'} </button>
            </div>
        )
    }

    // console.log('==> params', params)
    // console.log('==> task', task)
    return (
        <div className="task-content">
            <Link to={'/todo-app/'}>Home</Link>
            <hr />
            <div>{task?.taskName}</div>
            <div>Total Item - {allTodo.length}</div>
            <div>Completed Items - {completedCount}</div>
            <div>Pending Items - {allTodo.length - completedCount}</div>
            <button onClick={addTodo}>Add Todo</button>
            {isShown && <AddList todo={selectedTodo} closeTodo={closeTodo} isTodo taskId={task.id} task={task} />}
            <div>
                <input onChange={(e) => debouncedChangeSearchText(e)} type="text" placeholder="search todo" />
            </div>
            <div>
                {paginatedTodo.map((todo, i) => {
                    return (
                        <div key={todo.id}>
                            <div>
                                <input onChange={(e) => updateTodo(e, todo)} type="checkbox" checked={todo.isCompleted} />
                                <span onClick={() => editTodo(todo)}>
                                    {/* <span>{i + 1} </span> */}
                                    <span>{(currentPaginationNumber - 1) * paginateByRef.current + i + 1} </span>
                                    {todo.isCompleted ? <u>{todo.todoName}</u> : <em>{todo.todoName}</em>}
                                </span>
                                <span onClick={() => deleteTodo(task.id, todo.id)}>x</span>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div>
                {renderPagination()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { taskState: state.tasksReducer }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTodoDispatch: (data) => dispatch(updateTodo(data)),
        deleteTodoDispatch: (data) => dispatch(deleteTodo(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskView)