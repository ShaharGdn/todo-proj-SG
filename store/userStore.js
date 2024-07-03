const { createStore } = Redux

export const SET_USER = 'SET_USER'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedinUser: action.loggedinUser }
        default:
            return state
    }
}

export const userStore = createStore(appReducer)
window.gStore = userStore