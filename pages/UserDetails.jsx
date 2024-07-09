import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function UserDetails() {
    const loggedinUser = useSelector(state => state.loggedinUser)

    return (
        <section className="user-details">
            <h1>User Details</h1>
            <h2>
                {loggedinUser.fullname}. Balance: {loggedinUser.balance}
            </h2>
            <ul>
                <h3>
                    {loggedinUser.fullname}'s recent activities:
                </h3>
                {loggedinUser.activities.map((activity, idx) =>
                    <li key={idx + 1}>{utilService.timeAgo(activity.at)} : {activity.txt}</li>
                )}
            </ul>
        </section>
    )

}