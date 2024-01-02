import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, categoryState, toDoState } from "../atoms";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  margin: 1rem 0;
  input {
    padding: 6px;
    text-align: center;
    border: 0;
    width: 80%;
    &:first-of-type {
      border-radius: 4px 0 0 4px;
    }
  }
`;

const Btn = styled.button`
  padding: 6px;
  border: 0;
  border-radius: 0 4px 4px 0;
  background-color: ${(props) => props.theme.point};
  width: 20%;
`;

interface IForm {
  toDo: string;
  category?: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo, category: custom }: IForm) => {
    const test = {
      text: toDo,
      id: Date.now(),
      category: (custom as IToDo["category"]) || category,
    };

    setToDos((oldToDos) => [
      {
        text: toDo,
        id: Date.now(),
        category: (custom as IToDo["category"]) || category,
      },
      ...oldToDos,
    ]);

    setValue("toDo", "");
    setValue("category", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      {category === Categories.OTHER ? (
        <input
          {...register("category", { required: "Plz write a category" })}
          placeholder="신규 카테고리"
          type="text"
        />
      ) : (
        ""
      )}

      <input
        {...register("toDo", { required: "Plz write a to do" })}
        placeholder="뭘 해야 할까?"
        type="text"
      />

      <Btn>Add</Btn>
    </Form>
  );
}

export default CreateToDo;
