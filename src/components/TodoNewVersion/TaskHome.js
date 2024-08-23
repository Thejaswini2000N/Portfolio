import React, { useState } from "react";
import './TodoApp.css'
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { connect } from "react-redux";
import { newDeleteTaskAction, newResetAll } from "../../redux/TaskNewVersion.js/TaskNewVersionActions";
import { useNavigate } from "react-router-dom";

const TaskHome = (props) => {
    // props
    console.log(props)
    const { allTasks, deleteTask, resetAll } = props

    // for resetting the state if anything goes wrong 
    // resetAll()

    // State
    const [modalOpen, setModalOpen] = useState(false)
    const [taskState, setTaskState] = useState({})
    const [selectedTask, setSelectedTask] = useState({})
    const [isReadOnly, setIsReadOnly] = useState(false)

    // navigation from react route
    const navigate = useNavigate()

    // event handlers
    const handleAddTask = (e) => {
        e.preventDefault()
        setSelectedTask({})
        setModalOpen(true)
        setIsReadOnly(false)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const editTaskHandler = (e, task) => {
        e.preventDefault()
        setSelectedTask(task)
        setModalOpen(true)
        setIsReadOnly(false)
        console.log('edit', task)
    }

    const deleteTaskHandler = (e, id) => {
        e.preventDefault()
        deleteTask(id)
    }

    const viewTaskHandler = (e, task) => {
        e.preventDefault()
        setSelectedTask(task)
        setIsReadOnly(true)
        setModalOpen(true)
    }

    const navigateToTodos = (e, task) => {
        e.preventDefault()
        console.log('==> selected todo id', `task/${task?.id}`)
        navigate('/task/' + task?.id)
    }

    return (
        <>
            <div className="task-home-container">
                <div>TaskHome</div>
                <div className="task-body">
                    <div className="task-list-container">
                        <div className="task-headings">
                            <div>SL NO</div>
                            <div>Name</div>
                            <div>Status</div>
                            <div>Priority</div>
                            <div className="task-description">Description</div>
                            <div>Edit</div>
                            <div>Delete</div>
                            <div>View</div>
                            <div>Todos</div>
                        </div>
                        {
                            allTasks?.map((task, i) => {
                                return (
                                    <div key={task.id} className="task-list-details">
                                        <div>{i + 1}</div>
                                        <div>{task.taskName}</div>
                                        <div>{task.status}</div>
                                        <div>{task.priority}</div>
                                        <div className="task-description">{task.comments}</div>
                                        <div className="edit-task">
                                            <button onClick={(e) => editTaskHandler(e, task)}>Edit</button>
                                        </div>
                                        <div>
                                            <button onClick={(e) => deleteTaskHandler(e, task.id)}>x</button>
                                        </div>
                                        <div>
                                            <button onClick={(e) => viewTaskHandler(e, task)}>View</button>
                                        </div>
                                        <div>
                                            <button onClick={(e) => navigateToTodos(e, task)}>Open Todos</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {!modalOpen && (
                        <div className="add-task-container">
                            <button onClick={handleAddTask}>
                                Add Task
                            </button>
                        </div>
                    )}
                </div>
                {
                    modalOpen && <Modal
                        closeModal={closeModal}
                        selectedTask={selectedTask}
                        isReadOnly={isReadOnly}
                    >
                    </Modal>
                }
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    const allTasks = state.newTaskReducer.tasks
    return {
        allTasks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (id) => dispatch(newDeleteTaskAction(id)),
        resetAll: () => dispatch(newResetAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskHome)