import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onToggleTodo, onUpdateTodo }) {
    return (
        <ul className="todo-list">
            {!todos.length ?
                <h1> no todos to show</h1>
                :
                todos.map(todo =>
                    <li key={todo._id} style={{ backgroundColor: todo.color }}>
                        <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} onUpdateTodo={onUpdateTodo} />
                        <section>
                            <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                            <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                            <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                        </section>
                    </li>
                )}
        </ul>
    )
}