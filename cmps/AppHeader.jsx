const { useSelector } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useEffect } = React

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/user.actions.js'


export function AppHeader() {
    var loggedinUser = useSelector(state => state.loggedinUser)
    const todos = useSelector(state => state.todos)
    const totalTodos = todos.length || 0
    const doneTodos = todos.filter(todo => todo.isDone == true).length || 0

    function onLogout() {
        logout()
            .then(() => showSuccessMsg('Logged out'))
            .catch(err => showErrorMsg(`Error logging out ${err}`))
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
               <progress className="progress-bar" value={doneTodos} max={totalTodos}>
                </progress>
                {loggedinUser ? (
                    < section >
                        <Link to={`/user/${loggedinUser._id}`}>Hello {loggedinUser.fullname} Balance {loggedinUser.balance}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
