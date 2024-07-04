export function TodoPreview({ todo, onToggleTodo, onUpdateTodo }) {
    function onSetNoteColor({ target }) {
        const { value } = target

        const newTodo = { ...todo, color: value }
        onUpdateTodo(newTodo)
    }

    return (
        <article className="todo-preview">
            <h2 className={(todo.isDone) ? 'done' : ''} onClick={onToggleTodo}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <img src={`../assets/img/${'todo'}.png`} alt="" />
            <label htmlFor="color">Note Color</label>
            <input type="color" name="color" id="color" value={todo.color} onChange={onSetNoteColor} />
        </article>
    )
}
