import { ADD_TASK, ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./TasksActions"

const initialTaskState = {
    tasks: []
}

const addTodo = (state, data) => {
    const { taskId, ...rest } = data
    const findTask = state.tasks.find((task) => task.id === taskId)
    findTask.todos = [...findTask?.todos, rest]
    const updatedTasks = state.tasks.filter((task) => task.id !== taskId)
    localStorage.setItem('taskState', JSON.stringify({ ...state, tasks: [...updatedTasks, findTask] }))
    return { ...state, tasks: [...updatedTasks, findTask] }
}

const updateTodo = (state, data) => {
    const { task, isCompleted, ...rest } = data
    // console.log('==> state', state)
    // console.log('==> task', task)
    const findTask = state.tasks.find((e) => e.id === task.id)
    const updatedTodo = findTask?.todos.filter((e) => e.id !== rest.id)
    const updatedTasks = state.tasks.filter((e) => e.id !== task.id)
    findTask.todos = [...updatedTodo, { ...rest, isCompleted }]
    localStorage.setItem('taskState', JSON.stringify({ ...state, tasks: [...updatedTasks, findTask] }))
    return { ...state, tasks: [...updatedTasks, findTask] }
}

const deleteTodo = (state, data) => {
    const { taskId, todoId } = data
    const findTask = state.tasks.find((e) => e.id === taskId)
    const updatedTodo = findTask.todos.filter((e) => e.id !== todoId)
    findTask.todos = [...updatedTodo]
    const updatedTasks = state.tasks.filter((e) => e.id !== taskId)
    localStorage.setItem('taskState', JSON.stringify({ ...state, tasks: [updatedTasks, findTask] }))
    return { ...state, tasks: [...updatedTasks, findTask] }
}

const tasksReducer = (state = initialTaskState, action) => {
    switch (action?.type) {
        case ADD_TASK:
            const newTask = action.payload
            localStorage.setItem('taskState', JSON.stringify({ ...state, tasks: [...state.tasks, newTask] }))
            return {
                ...state, tasks: [...state.tasks, newTask]
            }
        case ADD_TODO:
            return addTodo(state, action.payload)
        case UPDATE_TODO:
            return updateTodo(state, action.payload)
        case DELETE_TODO:
            return deleteTodo(state, action.payload)
        default:
            return state
    }
}

export default tasksReducer