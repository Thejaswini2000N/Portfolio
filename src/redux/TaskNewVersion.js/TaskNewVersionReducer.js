import { NEW_ADD_TASK, NEW_DELETE_TASK, NEW_EDIT_TASK, NEW_GET_ALL_TASKS, NEW_GET_ONE_TASK, RESET_ALL } from "./TaskNewVersionActions"

// initial State
const initialNewTaskState = {
    tasks: []
}

// reducer methods
const newGetAllTasksReducer = (state, action) => {
    return state
}

const newAddTaskReducer = (state, action) => {
    // return { ...state, tasks: [] }
    return { ...state, tasks: [...state.tasks, action.payload] }
}

const newEditTaskReducer = (state, action) => {
    const editedTask = action.payload
    const editedTaskIdx = state.tasks.findIndex((task) => task.id === editedTask.id)
    const updatedTaskList = [...state.tasks]
    updatedTaskList.splice(editedTaskIdx, 1, editedTask)
    return { ...state, tasks: [...updatedTaskList] }
}

const newDeleteTaskReducer = (state, action) => {
    const updatedTaskList = [...state.tasks]
    const selectedIdx = updatedTaskList.findIndex((task) => task.id === action.payload)
    updatedTaskList.splice(selectedIdx, 1)
    return { ...state, tasks: [...updatedTaskList] }
}

// const newGetOneTaskReducer = (state, action) => {
//     const task = state.tasks.find((e) => e.id === action.payload)
//     return task
// }



const newTaskReducer = (state = initialNewTaskState, action) => {
    switch (action.type) {
        case NEW_GET_ALL_TASKS:
            return newGetAllTasksReducer(state, action)
        case NEW_ADD_TASK:
            return newAddTaskReducer(state, action)
        case NEW_EDIT_TASK:
            return newEditTaskReducer(state, action)
        case NEW_DELETE_TASK:
            return newDeleteTaskReducer(state, action)
        case NEW_GET_ONE_TASK:
        // return newGetOneTaskReducer(state, action)
        case RESET_ALL:
            return initialNewTaskState
        default:
            return state
    }
}

export default newTaskReducer