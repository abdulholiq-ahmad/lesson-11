// add imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodosMutation,
  useDeleteTodosMutation,
  useUpdetTodosMutation,
} from "./carsApi";
import { nanoid } from "@reduxjs/toolkit";
const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isFetching,
    isLoading,
    isError,
    isSuccess,
  } = useGetTodosQuery();
  console.log(todos);
  const [addTodo, { isLoading: addLoading }] = useAddTodosMutation();
  const [deleteTodo, { isLoading: deleteLoading }] = useDeleteTodosMutation();
  const [updeteTodo, { isLoading: updeteLoading }] = useUpdetTodosMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      userId: "1",
      id: nanoid(),
      title: newTodo,
      completed: false,
      createdAt: Date.now(),
    });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit" disabled={deleteLoading}>
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  // Define conditional content
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    // content = JSON.stringify(todos);
    content = todos.map((todo) => (
      <article key={todo.id}>
        <div className="todo">
          <input
            type="checkbox"
            checked={todo.completed}
            id={todo.id}
            onChange={(event) =>
              updeteTodo({ ...todo, completed: event.target.checked })
            }
          />

          <label htmlFor={todo.id}>{todo.title}</label>
        </div>
        <button className="trash" onClick={() => deleteTodo(todo.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </article>
    ));
  } else if (isError) {
    content = <p style={{ color: "red" }}>error</p>;
  }
  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
