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

export function checkout(amount) {
    return userService.updateScore(-amount)
        .then(updatedScore => {
            store.dispatch({ type: CLEAR_CART })
            store.dispatch({ type: SET_USER_SCORE, score: updatedScore })
        })
}