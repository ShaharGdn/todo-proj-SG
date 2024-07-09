import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
import { userService } from "../services/user.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function UserDetails() {
    const loggedinUser = useSelector(state => state.loggedinUser)
    const [user, setUser] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const userId = params.userId
        loadUser(userId)
    }, [params.userId])

    function loadUser(userId) {
        userService.getById(userId)
            .then(setUser)
    }

    if (!user) return

    return (
        <section className="user-details">
            <h1>User Details</h1>
            <h2>
                {user.fullname}. Balance: {user.balance}
            </h2>
            <ul>
                <h3>
                    {user.fullname}'s recent activities:
                </h3>
                {user.activities.map((activity, idx) =>
                    <li key={idx + 1}>{utilService.timeAgo(activity.at)} : {activity.txt}</li>
                )}
            </ul>
        </section>
    )

}