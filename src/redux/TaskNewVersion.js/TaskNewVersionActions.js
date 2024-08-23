export const NEW_GET_ALL_TASKS = 'NEW_GET_ALL_TASKS'
export const NEW_ADD_TASK = 'NEW_ADD_TASK'
export const NEW_EDIT_TASK = 'NEW_EDIT_TASK'
export const NEW_DELETE_TASK = 'NEW_DELETE_TASK'
export const NEW_GET_ONE_TASK = 'NEW_GET_ONE_TASK'
export const RESET_ALL = 'RESET_ALL'
export const NEW_ADD_TODO = 'NEW_ADD_TODO'
export const NEW_EDIT_TODO = 'NEW_EDIT_TODO'
export const NEW_DELETE_TODO = 'NEw_DELETE_TODO'


export const newGetAllTasksAction = () => {
    return {
        type: NEW_GET_ALL_TASKS
    }
}

export const newAddTaskAction = (task) => {
    return {
        type: NEW_ADD_TASK,
        payload: task
    }
}

export const newEditTaskAction = (task) => {
    return {
        type: NEW_EDIT_TASK,
        payload: task
    }
}

export const newDeleteTaskAction = (id) => {
    return {
        type: NEW_DELETE_TASK,
        payload: id
    }
}

export const newGetOneTaskAction = (id) => {
    return {
        type: NEW_GET_ONE_TASK,
        payload: id
    }
}

export const newResetAll = () => {
    return {
        type: RESET_ALL
    }
}

export const newAddTodoAction = (taskId, todo) => {
    return {
        type: NEW_ADD_TODO,
        payload: { taskId, todo }
    }
}

export const newEditTodoAction = (taskId, todo) => {
    return {
        type: NEW_EDIT_TODO,
        payload: { taskId, todo }
    }
}

export const newDeleteTodoAction = (taskId, todoId) => {
    return {
        type: NEW_DELETE_TODO,
        payload: { taskId, todoId }
    }
}