import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const TodoModal = (props) => {
    // props
    const { closeTodoModal } = props

    // state
    const [todoStatus, setTodoStatus] = useState(['', 'New', 'Active', 'Hold', 'Completed'])
    const [todoFormObject, setTodoFormObject] = useState({
        todoName: '',
        status: '',
        isDeleted: false,
        comments: '',
    })

    // Event Handlers
    const handleCloseModal = (e) => {
        e.preventDefault()
        closeTodoModal()
    }

    const handleFormChange = (e, field) => {
        e.preventDefault()
        setTodoFormObject({
            ...todoFormObject,
            [field]: e.target.value
        })
    }

    const onTodoSubmit = (e) => {
        e.preventDefault()
        console.log('==> todo', todoFormObject)
    }

    return (
        <div className="new-todo-modal-container">
            Todo Name
            <div className="new-todo-modal-form">
                <form onSubmit={onTodoSubmit}>
                    <div>
                        <label htmlFor="todo-name">Name</label>
                        <input value={todoFormObject.todoName} onChange={(e) => handleFormChange(e, 'todoName')} id="todo-name" type="text" />
                    </div>
                    <div>
                        <label htmlFor="todo-status">Status</label>
                        <select value={todoFormObject.status} onChange={(e) => handleFormChange(e, 'status')} id="todo-status">
                            {todoStatus.map((status) => <option key={status}>{status}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="todo-comments">Comments</label>
                        <textarea value={todoFormObject.comments} onChange={(e) => handleFormChange(e, 'comments')} id="todo-comments"></textarea>
                    </div>
                </form>
            </div>
            <div className="todo-modal-footer-buttons">
                <button onClick={handleCloseModal}>Close</button>
                <button onClick={onTodoSubmit}>Create</button>
            </div>
        </div>
    )
}

export default TodoModal