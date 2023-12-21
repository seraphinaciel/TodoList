import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

const Form = styled.form`
  display: inline-block;
  input {
    margin: 1rem 0;
    padding: 6px;
    text-align: center;
    border: 0;
    width: 80%;
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
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    /* 할일 localStorage에 저장하기*/

    // input이 제출되면 toDoState에 새 할 일이 추가됨
    setToDos((oldToDos) => {
      const newToDo = { text: toDo, id: Date.now(), category };

      // 기능 업데이트를 사용하여 이전 상태가 올바르게 사용되는지 확인
      const updatedToDos = [newToDo, ...oldToDos];

      // updatedToDos : 새 할 일을 포함하는 배열이 생성된 다음 localStorageJSON 문자열로 저장
      localStorage.setItem("todos", JSON.stringify(updatedToDos));

      return updatedToDos;
    });

    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Plz write a to do" })}
        placeholder="Write a to do"
        type="text"
      />

      <Btn>Add</Btn>
    </Form>
  );
}

export default CreateToDo;
