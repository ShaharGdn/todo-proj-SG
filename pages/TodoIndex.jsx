import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos } from "../store/todo.actions.js"
import { TOGGLE_IS_LOADING } from "../store/todoStore.js"

const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
    const dispatch = useDispatch()

    const todos = useSelector(state => state.todos)
    const isLoading = useSelector(state => state.isLoading)
    const filterBy = useSelector(state => state.filterBy)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .then(showSuccessMsg('Todos loaded.'))
            .catch(err => showErrorMsg(`Error loading Todos... ${err}`))
            .finally(() => dispatch({ type: TOGGLE_IS_LOADING, isLoading: false }))
    }, [filterBy])


    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        todoService.save(todoToSave)
            .then((savedTodo) => {
                setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }

    if (isLoading) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}