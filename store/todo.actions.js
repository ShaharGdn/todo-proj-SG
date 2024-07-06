import { todoService } from '../services/todo.service.js'
import { userService } from '../services/user.service.js'
// import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, todoStore } from './todoStore.js'
import { ADD_TODO, REMOVE_TODO, SET_TODOS, SET_USER, UPDATE_TODO, UPDATE_USER, store } from './todoStore.js'

export function loadTodos(filterBy = {}) {
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => store.dispatch({ type, todo: savedTodo }))
}

export function updateUser(userId, diff) {
    userService.updateUserBalance(userId, diff)
        .then(updatedUser => {
            store.dispatch({ type: SET_USER, loggedinUser: updatedUser })
        })
}

// export function removeTodo(todoId) {
//     return todoService.remove(todoId)
//         .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
// }