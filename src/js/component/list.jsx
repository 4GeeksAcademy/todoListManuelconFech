import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const List = () => {
  const [lista, setLista] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    getTodos(); // Llamar a getTodos al cargar el componente
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo)); // Guardar los todos en el almacenamiento local
  }, [todo]);

  const handleSubmit = () => {
    setTodo(todo.concat({ label: lista, done: false }));
    setLista("");
  };

  const getTodos = () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")); // Obtener los todos del almacenamiento local
    if (savedTodos) {
      setTodo(savedTodos);
    } else {
      createUser();
    }
  };

  const createUser = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/Manu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const deleteTodo = (index) => {
    const updatedTodos = todo.filter(
      (_, currentIndex) => currentIndex !== index
    );
    setTodo(updatedTodos);
  };

  return (
    <div>
      <div className="container">
        <h2>todos</h2>
        <ul>
          <li className="inputClass">
            <input
              className="input"
              type="text"
              onChange={(e) => setLista(e.target.value)}
              value={lista}
              placeholder="que tarea toca hoy?"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </li>
          {todo.map((item, index) => (
            <li key={index}>
              {item.label}
              <RxCross2
                className="icono"
                style={{ marginRight: "50px" }}
                onClick={() => deleteTodo(index)}
              />
            </li>
          ))}
        </ul>
        <div style={{ marginLeft: "30px", marginBottom: "20px" }}>
          {todo.length > 0 ? todo.length : "no hay tareas"}
        </div>
      </div>
    </div>
  );
};

export default List;
