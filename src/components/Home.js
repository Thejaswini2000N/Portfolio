import React, { useEffect, useState } from "react";
import AddList from "./AddList";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = (props) => {
    const { taskState } = props
    const [isAddShown, setIsAddShown] = useState(false)
    const addList = () => {
        setIsAddShown(true)
    }
    const closeAddList = () => {
        setIsAddShown(false)
    }
    const localStorageTaskState = JSON.parse(localStorage.getItem('taskState'))
    return (
        <div className="home-content">
            <Link to={'/'}>To Home Page</Link>
            <div className="task-list">
                <hr />
                <span>Tasks List</span>
            </div>
            <div className="add-list">
                <button onClick={addList}>+</button>
                <span>Add List</span>
            </div>
            <div>
                {isAddShown && <AddList closeAddList={closeAddList} isTask />}
            </div>
            <div className="task-lists">
                {taskState?.tasks.map((task) => {
                    return (
                        <div className="list" key={task.id}>
                            <div>
                                <Link to={`/todo-app/task/${task.id}`} >
                                    <b className="task-name" key={task.id}>{task.taskName}</b>
                                    <div className="todo-container">
                                        {task?.todos?.map((todo) => {
                                            return (
                                                <div key={todo.id} className="todo-list">
                                                    {!todo.isCompleted ? <em key={todo.id}>{todo.todoName.length > 14 ? todo.todoName.slice(0, 14) + '...' : todo.todoName}</em> : <u key={todo.id}>{todo.todoName.length > 14 ? todo.todoName.slice(0, 14) + '...' : todo.todoName}</u>}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        taskState: state.tasksReducer
    }
}

export default connect(mapStateToProps)(Home)