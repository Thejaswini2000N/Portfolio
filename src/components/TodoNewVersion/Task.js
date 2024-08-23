import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TodoModal from "./TodoModal";


const Task = (props) => {
    const { allTasks } = props

    // From router
    const params = useParams()
    console.log('==> params', params)
    const { id: taskid } = params

    // state
    const [currentTask, setCurrentTask] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        setCurrentTask(() => {
            return allTasks.find((task) => task.id === taskid)
        })
    }, [])

    // Event handlers
    const openTodoModal = (e) => {
        e.preventDefault()
        setIsModalOpen(true)
    }

    const closeTodoModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="new-todo-container">
            <div>
                <Link to={'/task-home'}>
                    Task Home
                </Link>
            </div>
            <div className="task-header">
                {currentTask.taskName}
            </div>
            <div className="todo-main">
                <div className="todo-main-header">
                    Filter Search
                </div>
                <div className="new-todo-list">
                    List of Todos
                </div>
                {!isModalOpen && <div className="add-todo">
                    <button onClick={openTodoModal}>Add Todo</button>
                </div>}
            </div>
            <div className="new-todo-pagination">
                pagination
            </div>
            {isModalOpen && <div className="new-todo-modal">
                <TodoModal
                    closeTodoModal={closeTodoModal}
                />
            </div>}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        allTasks: state.newTaskReducer.tasks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getOneTask: (id) => dispatch(newGetOneTaskAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)