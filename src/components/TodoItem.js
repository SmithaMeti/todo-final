import React from "react";
import "./styles.css";

function TodoItem({ todo, onDelete, onToggleComplete, onEdit, isCompleted }) {
  return (
    <li className={`todo-item ${isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggleComplete(todo.id)}
        className="todo-checkbox"
      />
      <span className="todo-text">{todo.text}</span>
      <div className="todo-actions">
        <button onClick={() => onEdit(todo)}>Edit</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;
