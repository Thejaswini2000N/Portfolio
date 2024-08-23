export const ADD_TASK = 'ADD_TASK'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'

export const addTask = (data) => {
    return {
        type: ADD_TASK,
        payload: data
    }
}

export const addTodo = (data) => {
    return {
        type: ADD_TODO,
        payload: data
    }
}

export const updateTodo = (data) => {
    return {
        type: UPDATE_TODO,
        payload: data
    }
}

export const deleteTodo = (data) => {
    return {
        type: DELETE_TODO,
        payload: data
    }
}