import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from '../api/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  console.log('todos', todos);

  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo('');
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
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      //JSON.stringify(todos)
      return (
        <>
          <article key={todo.id}>
            <div className="todo">
              <TodoItem props={todo} />
              {/* <input
                type="text"
                value={newTodoEdit}
                id={todo.id}
                onChange={(e) => setNewTodoEdit(e.target.value)}
              />
              <label htmlFor={todo.id}>{todo.title}</label> */}
            </div>
            <button
              className="trash"
              onClick={() => deleteTodo({ id: todo.id })}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </article>
        </>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
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
