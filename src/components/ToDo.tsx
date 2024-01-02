import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import styled from "styled-components";
import { BtnColor, Button } from "./CategoryBtn";

const List = styled.li`
  display: flex;
  flex-direction: column;
  padding: 6px;
  margin: 6px 0;
  text-align: left;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  p {
    padding-left: 4px;
    em {
      font-size: 10px;
    }
  }
`;

const CBtn = styled(BtnColor)<{ isActive: boolean }>`
  border: 0;
  padding: 0 4px;
  font-size: 10px;
`;

const Delete = styled(Button)`
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

      return updatedToDos;
    });
  };

  const onDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      const deleteToDos = [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];

      return deleteToDos;
    });
  };

  return (
    <List>
      <div>
        {Object.values(Categories).map(
          (newCategory) =>
            category !== newCategory && (
              <CBtn
                key={newCategory}
                value={newCategory}
                onClick={() => updateToDo(newCategory)}
              >
                {newCategory}
              </CBtn>
            )
        )}

        <Delete onClick={onDelete} title="Delete">
          🗑
        </Delete>
      </div>
      <p>
        {category !== Categories.TO_DO &&
        category !== Categories.DOING &&
        category !== Categories.DONE ? (
          <em>{category}</em>
        ) : (
          ""
        )}
        &nbsp; {text}
      </p>
    </List>
  );
}

export default ToDo;
