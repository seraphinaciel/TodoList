import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

// state 값을 주시하는 페이지
function ToDoList() {
  const [todo, doing, done] = useRecoilValue(toDoSelector);

  return (
    <div>
      <h1>To Do List</h1>

      <CreateToDo />

      <h2>To do</h2>
      <ul>
        {todo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
          // toDos 배열의 toDo 원소가 ToDo 컴포넌트에 필요한 props와 같아서 가능 (IToDo)
        ))}
      </ul>

      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>

      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
