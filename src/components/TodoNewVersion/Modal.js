import React, { useEffect, useState } from "react";
import { newAddTaskAction, newEditTaskAction, newGetAllTasksAction } from "../../redux/TaskNewVersion.js/TaskNewVersionActions";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const Modal = (props, children) => {
    // props import
    const { closeModal, createTask, editTask, selectedTask, isReadOnly } = props

    const [priorityOptions, setPriorityOptions] = useState(['', 'Low', 'Medium', 'High'])
    const [status, setStatus] = useState(['', 'New', 'Active', 'Complete'])
    const [taskformObj, setTaskFormObj] = useState({
        taskName: '',
        priority: '',
        status: '',
        isDeleted: false,
        comments: '',
    })
    const [invalidFields, setInValidFields] = useState([])
    let emptyFields = ['status', 'taskName', 'priority']

    // Lifecycles
    useEffect(() => {
        console.log('==> selected', selectedTask)
        setTaskFormObj(selectedTask)
        return () => {
            console.log('==> unmount')
            setTaskFormObj({
                taskName: '',
                priority: '',
                status: '',
                isDeleted: false,
                comments: '',
            })
        }
    }, [])

    // event handler
    const changeFormHandler = (e, fieldName) => {
        e.preventDefault()
        setTaskFormObj({ ...taskformObj, [fieldName]: e.target.value })
    }

    const closeModalHandler = (e) => {
        e.preventDefault()
        closeModal()
    }

    const createTaskHandler = (e) => {
        e.preventDefault()
        validateForm()
        console.log('==> create', emptyFields)
        if (emptyFields.length === 0) {
            createTask({ ...taskformObj, id: uuidv4(), isDeleted: false })
            closeModal()
            setTaskFormObj({
                taskName: '',
                priority: '',
                status: '',
                isDeleted: false,
                comments: '',
            })
        }
    }

    const updateTaskHandler = (e) => {
        e.preventDefault()
        validateForm()
        if (emptyFields.length === 0) {
            console.log('==> update task', taskformObj)
            editTask(taskformObj)
            closeModal()
        }
        console.log('==> update')
    }

    // other functions
    const validateForm = () => {
        for (let key in taskformObj) {
            if (key !== 'comments' && taskformObj[key] === '') {
                emptyFields.push(key)
            } else if (key !== 'comments' && taskformObj[key] !== '') {
                emptyFields = emptyFields.filter((field) => field !== key)
            }
        }
        setInValidFields(emptyFields)
    }


    return (
        <div className="modal-pop-up-container">
            <div className="modal-body">
                <div className="modal-close-button">
                    <button onClick={closeModalHandler}> x </button>
                </div>
                <div className="modal-form-container">
                    <div className="task-form-container">
                        <div className="task-heading">Create Task</div>
                        <form onSubmit={createTaskHandler}>
                            <div className="task-form-body">
                                <div>
                                    <label htmlFor="task-name">Task Name</label>
                                    <div>
                                        <input disabled={isReadOnly} onChange={(e) => changeFormHandler(e, 'taskName')} value={taskformObj.taskName} id='task-name' type="text" />
                                        {invalidFields.includes('taskName') && <div className="required-field">Task Name is a required field</div>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="priority">Priority</label>
                                    <div>
                                        <select disabled={isReadOnly} id="priority" value={taskformObj.priority} onChange={(e) => changeFormHandler(e, 'priority')}>
                                            {priorityOptions.map((e) => {
                                                return (
                                                    <option key={e}>{e}</option>
                                                )
                                            })}
                                        </select>
                                        {invalidFields.includes('priority') && <div className="required-field">Priority is a required field</div>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="status">Status</label>
                                    <div>
                                        <select disabled={isReadOnly} value={taskformObj.status} id="status" onChange={(e) => changeFormHandler(e, 'status')}>
                                            {status.map((e) => {
                                                return (
                                                    <option key={e}>{e}</option>
                                                )
                                            })}
                                        </select>
                                        {invalidFields.includes('status') && <div className="required-field">Status is a required field</div>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="comments">Comments</label>
                                    <textarea disabled={isReadOnly} value={taskformObj.comments} id="comments" onChange={(e) => changeFormHandler(e, 'comments')}></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="footer-buttons">
                    <div className="cancel-button">
                        <button onClick={closeModalHandler}>
                            Cancel
                        </button>
                    </div>
                    {!taskformObj.id && !isReadOnly && <div className="create-button">
                        <button onClick={createTaskHandler}>
                            Create
                        </button>
                    </div>}
                    {taskformObj.id && !isReadOnly && <div className="update-button">
                        <button onClick={updateTaskHandler}>
                            update
                        </button>
                    </div>}
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (task) => dispatch(newAddTaskAction(task)),
        editTask: (task) => dispatch(newEditTaskAction(task))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Modal)