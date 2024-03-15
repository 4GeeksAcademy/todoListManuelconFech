import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const List = () => {
  const [lista, setLista] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (todo.length > 0) {
      modificated(); 
    }
  }, [todo]);

  const handleSubmit = () => {
    setTodo(todo.concat({ label: lista, done: false }));
    setLista("");
  };

  const getTodos = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/Manu")
      .then((response) => {
        if (response.status === 404) {
          createUser();
        }
        return response.json();
      })
      .then((result) => {
        if (Array.isArray(result)) {
          setTodo(result);
        } else {
          console.log("esta vacio");
        }
      })
      .catch((error) => console.error(error));
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

  const modificated = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/Manu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const deleteTodo = (index) => {
    const updatedTodos = todo.filter((_, currentIndex) => currentIndex !== index);
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
              placeholder="que toca hoy?"
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
          {todo.length > 0 ? todo.length : "no hay tarea"}
        </div>
      </div>
    </div>
  );
};

export default List;
