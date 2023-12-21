import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

// state 값을 주시하는 페이지
function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);

  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Do List</h1>

      <form action="">
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>TO_DO</option>
          <option value={Categories.DOING}>DOING</option>
          <option value={Categories.DONE}>DONE</option>
        </select>
      </form>

      <CreateToDo />

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
