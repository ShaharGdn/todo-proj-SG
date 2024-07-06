import { todoService } from '../services/todo.service.js'
import { userService } from '../services/user.service.js'
// import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, todoStore } from './todoStore.js'
import { ADD_TODO, REMOVE_TODO, SET_TODOS, SET_USER, UPDATE_TODO, store } from './todoStore.js'

export function loadTodos(filterBy = {}) {
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => store.dispatch({ type, todo: savedTodo }))
}

export function updateUserBalance(userId, diff) {
    userService.updateUserBalance(userId, diff)
        .then(updatedUser => {
            store.dispatch({ type: SET_USER, loggedinUser: updatedUser })
        })
}

export function addActivity(userId, txt) {
    userService.addActivity(userId, txt)
        .then(updatedUser => {
            store.dispatch({ type: SET_USER, loggedinUser: updatedUser })
        })
}


// export function removeTodo(todoId) {
//     return todoService.remove(todoId)
//         .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
// }