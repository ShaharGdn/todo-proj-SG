import { todoService } from "../services/todo.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { TOGGLE_IS_LOADING } from "../store/todoStore.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux

export function TodoDetails() {
    const dispatch = useDispatch()

    const [todo, setTodo] = useState(null)
    const isLoading = useSelector(state => state.isLoading)
    
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadTodo()
    }, [params.todoId])


    function loadTodo() {
        todoService.get(params.todoId)
            .then(todo=> {
                setTodo(todo)
            })
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load todo')
                navigate('/todo')
            })
            .finally(()=> dispatch({ type: TOGGLE_IS_LOADING, isLoading: false }))
    }


    if (isLoading || !todo) return <div>Loading...</div>
    return (
        <section className="todo-details">
            <h1 className={(todo.isDone)? 'done' : ''}>{todo.txt}</h1>
            <h2>{(todo.isDone)? 'Done!' : 'In your list'}</h2>

            <h1>Todo importance: {todo.importance}</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <Link to={`/todo`}>Back to list</Link>

            <div>
                <Link to={`/todo/${todo.nextTodoId}`}>Next Todo</Link> |
                <Link to={`/todo/${todo.prevTodoId}`}>Previous Todo</Link>
            </div>
        </section>
    )
}