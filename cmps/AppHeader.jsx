const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/user.actions.js'
import { todoService } from "../services/todo.service.js"


export function AppHeader() {
    var loggedinUser = useSelector(state => state.loggedinUser)
    const [progressStats, setProgressStats] = useState()

    useEffect(() => {
        todoService.getProgressStats()
            .then(setProgressStats)
    }, [])
    // const progressStats = todoService.getProgressStats().then
    // console.log('progressStats:', progressStats)

    function onLogout() {
        logout()
            .then(() => showSuccessMsg('Logged out'))
            .catch(err => showErrorMsg(`Error logging out ${err}`))
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {progressStats && <section className="progress-bar">
                    Done Todo's: {progressStats}
                </section>}
                {loggedinUser ? (
                    < section >

                        <Link to={`/user/${loggedinUser._id}`}>Hello {loggedinUser.fullname}</Link>
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
