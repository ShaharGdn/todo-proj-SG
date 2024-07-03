import { userService } from '../services/user.service.js'
import { CLEAR_CART, SET_USER, SET_USER_SCORE, userStore } from './userStore.js'

export function signup(credentials) {
    return userService.signup(credentials)
        .then(loggedinUser => userStore.dispatch({ type: SET_USER, loggedinUser }))
}

export function login(credentials) {
    return userService.login(credentials)
        .then(loggedinUser => userStore.dispatch({ type: SET_USER, loggedinUser }))
}

export function logout() {
    return userService.logout()
        .then(() => userStore.dispatch({ type: SET_USER, loggedinUser: null }))
}

export function checkout(amount) {
    return userService.updateScore(-amount)
        .then(updatedScore => {
            userStore.dispatch({ type: CLEAR_CART })
            userStore.dispatch({ type: SET_USER_SCORE, score: updatedScore })
        })
}