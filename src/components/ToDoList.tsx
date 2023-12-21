import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import CategoryToDo from "./CategoryToDo";

const Section = styled.section`
  max-width: 360px;
  text-align: center;
  margin: auto;
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  padding: 1rem;
`;

// state 값을 주시하는 페이지
function ToDoList() {
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoSelector);

  /* 할일 가져오기*/
  useEffect(() => {
    // localStorage에 저장된 key:todos를 검색하고, 배열로 만들어 storedTodos 넣기
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    // 배열로 만들어진 storedTodos를 setToDos에 보내
    setToDos(storedTodos);
  }, [setToDos]);

  return (
    <Section>
      <Title>To Do List</Title>

      <CategoryToDo />
      <CreateToDo />

      <ul>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </Section>
  );
}

export default ToDoList;
