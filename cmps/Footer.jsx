const { useSelector } = ReactRedux

export function Footer() {
    const todos = useSelector(state => state.todos)
    console.log('todos:', todos)
    const totalTodos = todos.length || 0
    const doneTodos = todos.filter(todo => todo.isDone == true).length || 0

    return (
        <section className="footer">
            <footer>
                cofee rights
                <progress className="progress-bar" value={doneTodos} max={totalTodos}>
                </progress>
            </footer>
        </section>
    )
}