import React from "react";
import "./styles.css";

function TodoItem({ todo, onDelete, onToggleComplete, onEdit }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span onClick={() => onToggleComplete(todo.id)}>{todo.text}</span>
      <div className="todo-item-buttons">
        <button onClick={() => onEdit(todo)}>✏️</button>
        <button onClick={() => onDelete(todo.id)}>🗑️</button>
      </div>
    </li>
  );
}

export default TodoItem;
