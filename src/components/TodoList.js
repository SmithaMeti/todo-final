import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./styles.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTags = tags.length ? tags : ["General"];
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false, tags: newTags },
      ]);
      setNewTodo("");
      setTags([]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleEditChange = (e) => {
    setEditingTodo({ ...editingTodo, text: e.target.value });
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  };

  const saveEdit = () => {
    if (editingTodo.text.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingTodo.id
            ? { ...todo, text: editingTodo.text }
            : todo
        )
      );
      closeEditModal();
    }
  };

  const handleNewTodoKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const clearAllTodos = () => {
    setTodos([]);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const addTag = (tag) => {
    if (tag.trim() && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  //test

  const markAllAsCompleted = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: true })));
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? todo.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="search-input">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="search-box"
        />
      </div>
      <button className="theme-switcher" onClick={toggleTheme}>
        {isDarkTheme ? "☀️" : "🌙"}
      </button>
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleNewTodoKeyPress}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="tag-input">
        <input
          type="text"
          placeholder="Add a tag..."
          onKeyPress={(e) => e.key === "Enter" && addTag(e.target.value)}
        />
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag} <button onClick={() => removeTag(tag)}>x</button>
            </span>
          ))}
        </div>
      </div>
      <div className="filter-by-tag">
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          {[...new Set(todos.flatMap((todo) => todo.tags))].map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <button className="mark-all-completed" onClick={markAllAsCompleted}>
        Mark All as Completed
      </button>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggleComplete={toggleComplete}
            onEdit={openEditModal}
          />
        ))}
      </ul>
      <button className="clear-all-button" onClick={clearAllTodos}>
        Clear All
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Todo</h2>
            <input
              type="text"
              value={editingTodo.text}
              onChange={handleEditChange}
              onKeyPress={handleEditKeyPress}
            />
            <button onClick={saveEdit}>Save</button>
            <button onClick={closeEditModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
