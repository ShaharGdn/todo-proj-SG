import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
export const SET_FILTERBY = 'SET_FILTERBY'
export const SET_USER = 'SET_USER'

const initialState = {
    todos: [],
    isLoading: true,
    filterBy: todoService.getDefaultFilter(),
    loggedinUser: userService.getLoggedinUser(),
}
function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case TOGGLE_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case SET_FILTERBY:
            return { ...state, filterBy: action.filterBy }
        case SET_USER:
            return { ...state, loggedinUser: action.loggedinUser }
        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store