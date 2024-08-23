import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { addTask, addTodo, updateTodo } from "../redux/Tasks.js/TasksActions";
import { connect } from "react-redux";
const AddList = (props) => {
    const [enrteredTask, setEnteredTask] = useState('')
    const [enrteredTodo, setEnteredTodo] = useState('')
    const { closeAddList, closeTodo, taskState, addTask, addTodo, updateTodo, isTask, isTodo, taskId, task, todo } = props

    useEffect(() => {
        todo?.id && setEnteredTodo(todo.todoName)
    }, [])
    const onTaskCreate = (e) => {
        e.preventDefault()
        if (enrteredTask) {
            const taskobj = {
                taskName: enrteredTask,
                id: uuidv4(),
                todos: []
            }
            console.log('==> taskObj', taskobj)
            addTask(taskobj)
        }
        closeAddList()
    }
    const onTodoCreate = (e) => {
        e.preventDefault()
        if (todo.id && enrteredTodo) {
            const updatedTodoObj = {
                ...todo,
                todoName: enrteredTodo,
                task: task
            }
            updateTodo(updatedTodoObj)
        }
        if (enrteredTodo && !todo.id) {
            // to add dummy value
            // for (let i = 0; i <= 20; i++) {
            //     const todoObj = {
            //         todoName: 'num' + (i + 1),
            //         id: uuidv4(),
            //         isCompleted: false,
            //         isDeleted: false,
            //         taskId
            //     }
            //     addTodo(todoObj)
            // }
            const todoObj = {
                todoName: enrteredTodo,
                id: uuidv4(),
                isCompleted: false,
                isDeleted: false,
                taskId
            }
            // console.log('==> todoObj', todoObj)
            addTodo(todoObj)
        }
        closeTodo()
    }
    const onClose = () => {
        isTask && closeAddList()
        isTodo && closeTodo()
    }

    const renderForTask = () => {
        if (isTask) {
            return (
                <>
                    <form onSubmit={onTaskCreate}>
                        <input type="text" placeholder="Add Task" onChange={(e) => setEnteredTask(e.target.value)} />
                    </form>
                    <div>
                        <button onClick={onTaskCreate}>Create</button>
                        <button onClick={onClose}>Close</button>
                    </div>
                </>
            )
        }
    }
    const renderForTodo = () => {

        if (isTodo) {
            return (
                <form onSubmit={onTodoCreate}>
                    <div>
                        <input value={enrteredTodo} type="text" placeholder="Add Todo" onChange={(e) => setEnteredTodo(e.target.value)} />
                        <div>
                            <div>
                                <button onClick={onTodoCreate}>{todo.id ? 'Update' : 'Create'}</button>
                                <button onClick={onClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </form>
            )

        }
    }
    return (
        <div>
            {renderForTask()}
            {renderForTodo()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        taskState: state.taskReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (data) => dispatch(addTask(data)),
        addTodo: (data) => dispatch(addTodo(data)),
        updateTodo: (data) => dispatch(updateTodo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddList)