import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from '../api/apiSlice';
import { useState } from 'react';

const TodoItem = ({ props }) => {
  const [updateTodo] = useUpdateTodoMutation();

  const [todo, setTodo] = useState(props.title);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTodo({ id: props.id, title: todo });
    // setNewTodo('');
  };
  return (
    <div>
      <form onSubmit={() => handleUpdate()}>
        <input
          type="text"
          id={props.id}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
    </div>
  );
};
export default TodoItem;
