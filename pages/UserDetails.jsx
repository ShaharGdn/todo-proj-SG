import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
import { userService } from "../services/user.service.js"
import { updateUser } from "../store/user.actions.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function UserDetails() {
    // const loggedinUser = useSelector(state => state.loggedinUser)
    const [user, setUser] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const userId = params.userId
        loadUser(userId)
    }, [params.userId])

    function loadUser(userId) {
        userService.getById(userId)
            .then(fetchedUser => {
                setUser(fetchedUser)
                showSuccessMsg('User loaded successfully')
            })
            .catch((err) => {
                console.log('err:', err)
                navigate('/todo')
                showErrorMsg('Couldnt show user')
            })
    }

    function handleChange({ target }) {
        const { name, value, type } = target
        var updatedUser

        if (type === 'color') {
            updatedUser = {
                ...user,
                prefs: {
                    ...user.prefs,
                    [name]: value
                }
            }
        } else {
            updatedUser = {
                ...user,
                [name]: value
            }
        }

        updateUser(updatedUser)
        setUser(updatedUser)
    }


    if (!user) return
    const { balance, fullname, activities, prefs } = user
    console.log('prefs:', prefs)
    const { color, bgColor } = prefs

    return (
        <section className="user-details" style={{color: color, background: bgColor}}>
            <h1>User Details</h1>
            <h2>
                {fullname}. Balance: {balance}
            </h2>
            <label htmlFor="name">Name:
                <input type="text" id="name" name="fullname" value={fullname} placeholder="your name... " onChange={handleChange} />
            </label>
            <label htmlFor="color">Color:
                <input type="color" id="color" name="color" value={color} placeholder="your name... " onChange={handleChange} />
            </label>
            <label htmlFor="bgColor">BG Color:
                <input type="color" id="bgColor" name="bgColor" value={bgColor} placeholder="your name... " onChange={handleChange} />
            </label>
            <ul>
                <h3>
                    {fullname}'s recent activities:
                </h3>
                {activities.map((activity, idx) =>
                    <li key={idx + 1}>{utilService.timeAgo(activity.at)} : {activity.txt}</li>
                )}
            </ul>
        </section>
    )

}