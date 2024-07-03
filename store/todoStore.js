import { todoService } from "../services/todo.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
export const SET_FILTERBY = 'SET_FILTERBY'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: todoService.getDefaultFilter(),
}
function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case TOGGLE_IS_LOADING:
            return { ...state, isLoading: !state.isLoading }
        case SET_FILTERBY:
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}
export const todoStore = createStore(appReducer)
window.gStore = todoStore