import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const List = () => {
  const [lista, setLista] = useState("");
  const [todo, setTodo] = useState([]);

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
          {todo.map((item, index) => (
            <li>
              {item}{" "}
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
