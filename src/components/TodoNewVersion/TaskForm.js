import React, { useState } from "react";

const TaskForm = (props) => {
    //  props
    const { createTask } = props
    // State
    const [priorityOptions, setPriorityOptions] = useState(['', 'Low', 'Medium', 'High'])
    const [status, setStatus] = useState(['', 'New', 'Active', 'Complete'])
    const [taskformObj, setTaskFormObj] = useState({
        taskName: '',
        priority: '',
        status: '',
        isDeleted: false,
        comments: '',
    })

    // event handler
    const changeFormHandler = (e, fieldName) => {
        e.preventDefault()
        setTaskFormObj({ ...taskformObj, [fieldName]: e.target.value })
    }

    return (
        <div className="task-form-container">
            <div className="task-heading">Create Task</div>
            <form>
                <div className="task-form-body">
                    <div>
                        <label htmlFor="task-name">Task Name</label>
                        <input onChange={(e) => changeFormHandler(e, 'taskName')} value={taskformObj.taskName} id='task-name' type="text" />
                    </div>
                    <div>
                        <label htmlFor="priority">Priority</label>
                        <select id="priority" value={taskformObj.priority} onChange={(e) => changeFormHandler(e, 'priority')}>
                            {priorityOptions.map((e) => {
                                return (
                                    <option key={e}>{e}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="status">Status</label>
                        <select value={taskformObj.status} id="status" onChange={(e) => changeFormHandler(e, 'status')}>
                            {status.map((e) => {
                                return (
                                    <option key={e}>{e}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="comments">Comments</label>
                        <textarea value={taskformObj.comments} id="comments" onChange={(e) => changeFormHandler(e, 'comments')}></textarea>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TaskForm