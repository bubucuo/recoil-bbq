import {useState} from "react";
import {useSetRecoilState} from "recoil";
import {todoListState} from "../states/todoList";

let id = 0;
function getId() {
  return id++;
}

export default function TodoItemCreator(props) {
  const [input, setInput] = useState("");

  const setTodoList = useSetRecoilState(todoListState);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const addItem = () => {
    setTodoList((old) => [
      ...old,
      {
        id: getId(),
        text: input,
        isComplete: false,
      },
    ]);
    setInput("");
  };
  return (
    <div>
      <h3>TodoItemCreator</h3>

      <input type="text" value={input} onChange={onChange} />

      <button onClick={addItem}>add</button>
    </div>
  );
}
