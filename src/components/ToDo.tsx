import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const List = styled.li`
  border-bottom: 1px dashed;
  display: flex;
  gap: 4px;
  padding: 6px;
  padding-right: 0;
  align-items: center;
  text-align: left;
  font-size: 14px;
  span {
    flex: 1 0 50%;
  }
`;
const Button = styled.button`
  border: 0;
  border-radius: 4px;
  padding: 4px;
  font-size: 12px;
  cursor: pointer;
`;
const CategoryBtn = styled(Button)<{ isActive: string }>`
  background: ${(props) => {
    switch (props.isActive) {
      case Categories.TO_DO:
        return "red";
      case Categories.DOING:
        return "skyblue";
      case Categories.DONE:
        return "greenyellow";
      default:
        return "gray";
    }
  }};
  &:hover {
    color: white;
    background: ${(props) => {
      switch (props.isActive) {
        case Categories.TO_DO:
          return "darkred";
        case Categories.DOING:
          return "dodgerblue";
        case Categories.DONE:
          return "darkgreen";
        default:
          return "gray";
      }
    }};
  }
`;
const Delete = styled(Button)`
  font-size: 1.375rem;
  background: transparent;
  color: ${(props) => props.theme.text};
  &:hover {
    color: ${(props) => props.theme.point};
  }
`;
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const updateToDo = (newCategory: Categories) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      const newToDo = { text, id, category: newCategory };
      const updatedToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];

      // 업데이트(새 할일 + 이전 할일)
      localStorage.setItem("todos", JSON.stringify(updatedToDos));
      return updatedToDos;
    });
  };

  const onDelete = () => {
    setToDos((oldToDos) => {
      const deleteToDos = oldToDos.filter((toDo) => toDo.id !== id);

      // 업데이트(삭제)
      localStorage.setItem("todos", JSON.stringify(deleteToDos));

      return deleteToDos;
    });
  };

  return (
    <List>
      <span>{text}</span>
      {Object.values(Categories).map(
        (newCategory) =>
          category !== newCategory && (
            <CategoryBtn
              isActive={newCategory}
              key={newCategory}
              name={newCategory}
              onClick={() => updateToDo(newCategory)}
            >
              {newCategory}
            </CategoryBtn>
          )
      )}

      <Delete onClick={onDelete} title="Delete">
        🗑
      </Delete>
    </List>
  );
}

export default ToDo;
