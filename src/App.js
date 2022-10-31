
import { useEffect, useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid'

function App() {
  const [todoname, setTodoName] = useState()
  const [newList, setNewlst] = useState([])
  const [todos, setTodos] = useState([
    {
      id: nanoid(),
      name: "Learn JavaScript",
      completed: true,

    },
    {
      id: nanoid(),
      name: "Learn React",
      completed: false,
    },
    {
      id: nanoid(),
      name: "Have a life!",
      completed: false,
    }
  ])
  const [num, setnum] = useState()
  function handleSubmit(e) {
    e.preventDefault();
    if (todoname) {
      setTodos([...todos, { id: nanoid(), name: todoname, completed: false }])

    }
    document.querySelector(".new-todo").value = ""

  }
  function getCompleted(t) {
    t.completed ? t.completed = false : t.completed = true
    let unComplited = todos.filter(t => t.completed === false)
    setnum(unComplited.length)
  }
  useEffect(() => {
    setNewlst(todos)
    setnum(todos.filter(t => t.completed === false).length)
  }, [todos])
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input className="new-todo" placeholder="What needs to be done?" onChange={(e) => setTodoName(e.target.value)} autoFocus />
          </form>
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ul className="todo-list">
            {
              newList.map(t => {
                return (
                  <li key={t.id} className={t.completed ? "completed" : " "}>
                    <div className="view">
                      <input id={t.id} className="toggle" type="checkbox" onChange={() => getCompleted(t)} checked={t.completed} />
                      <label htmlFor={t.id} >{t.name}</label>
                      <button className="destroy" onClick={() => setTodos(todos.filter(ta => ta.id !== t.id))} ></button>
                    </div>
                  </li>
                )
              })
            }

          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{num}</strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected" onClick={() => setNewlst(todos)}>All</a>
            </li>
            <li>
              <a href="#/" onClick={() => setNewlst(todos.filter(t => t.completed === false))}>Active</a>
            </li>
            <li>
              <a href="#/" onClick={() => setNewlst(todos.filter(t => t.completed === true))}>Completed</a>
            </li>
          </ul>

          <button className="clear-completed" onClick={() => setTodos(todos.filter(t => t.completed === false))}>
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </>
  );
}

export default App;
