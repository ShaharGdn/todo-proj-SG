import { userService } from '../services/user.service.js'
import { SET_USER, store } from './todoStore.js'
// import { CLEAR_CART, SET_USER, SET_USER_SCORE, store } from './userStore.js'

export function signup(credentials) {
    return userService.signup(credentials)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function login(credentials) {
    return userService.login(credentials)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function logout() {
    return userService.logout()
        .then(() => store.dispatch({ type: SET_USER, loggedinUser: null }))
}

export function updateUser(userToUpdate) {
    userService.saveUser(userToUpdate).then(savedUser => {
        store.dispatch({ type: SET_USER, loggedinUser: savedUser })
    })
}

export function updateUserBalance(loggedinUser, diff, todoId) {
    const updatedUser = { ...loggedinUser, balance: loggedinUser.balance + diff }
    store.dispatch({ type: SET_USER, loggedinUser: updatedUser })
    addActivity(`marked todo as done ${todoId}`, updatedUser)
}

export function addActivity(txt, user) {
    const newActivity = { txt, at: Date.now() }
    const updatedUser = {
        ...user,
        activities: [...user.activities, newActivity]
    }
    userService.saveUser(updatedUser).then(savedUser => {
        store.dispatch({ type: SET_USER, loggedinUser: savedUser })
    })
}