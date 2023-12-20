import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

// state 값을 주시하는 페이지
function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Do List</h1>

      <CreateToDo />

      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
          // toDos 배열의 toDo 원소가 ToDo 컴포넌트에 필요한 props와 같아서 가능 (IToDo)
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
