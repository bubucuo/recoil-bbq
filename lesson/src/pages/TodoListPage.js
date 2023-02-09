import {useRecoilValue} from "recoil";
import TodoItem from "../components/TodoItem";
import TodoItemCreator from "../components/TodoItemCreator";
import TodoListFilters from "../components/TodoListFilters";
import TodoListStatus from "../components/TodoListStatus";
import {filteredTodoListState} from "../states/todoList";

export default function TodoListPage(props) {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <div>
      <h3>TodoListPage</h3>
      <TodoListStatus />
      <div style={{display: "flex", gap: "10px"}}>
        <TodoItemCreator />
        <TodoListFilters />
      </div>
      {todoList.map((todoItem) => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
    </div>
  );
}
