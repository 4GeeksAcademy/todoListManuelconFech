import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const List = () => {
  const [lista, setLista] = useState("");
  const [todo, setTodo] = useState([]);

  

    const getTodos = () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("https://playground.4geeks.com/apis/fake/todos/user/Manu", requestOptions)
        .then((response) => response.json())
        .then((result) => setTodo(result))
        .catch((error) => console.error(error));

    }

    useEffect (()=> {
      getTodos ();
    },[])

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
                  setTodo(todo.concat(lista));
                  setLista("");
                }
              }}
            />
          </li>
          {todo.map((item) => (
            <li key= {item.id}>
              {item.label}{" "}
              <RxCross2
                className="icono"
                /* style={{ marginLeft: "250px" }} */
                onClick={() =>
                  setTodo(
                    todo.filter((_, currentIndex) => currentIndex !== index)
                  )
                }
              />
            </li>
          ))}
        </ul>
        <div style={{ marginLeft: "30px" }}>{todo.length}</div>
      </div>
    </div>
  );
};

export default List;
