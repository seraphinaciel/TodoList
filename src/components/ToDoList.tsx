import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import styled from "styled-components";
import ToDo from "./ToDo";
import CreateToDo from "./CreateToDo";
import CategoryBtn from "./CategoryBtn";

const Section = styled.section`
  max-width: 360px;
  text-align: center;
  margin: auto;
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  padding: 1rem;
  flex: 1 0 1;
`;

// state 값을 주시하는 페이지
function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);

  return (
    <Section>
      <Title>To Do List</Title>

      <CreateToDo />
      <CategoryBtn />

      <ul>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </Section>
  );
}

export default ToDoList;
