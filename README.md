# React Project

- react: "18.2.0",
- react-router-dom: "6.20.0",
- react-query: "3.39.3",
- react-helmet: "6.1.0",
- @tanstack/react-query: "^5.8.9",
- typescript: "4.9.5",
- styled-components: "6.1.1",
- apexcharts: "3.44.0",
- react-apexcharts: "1.4.1",
- recoil: "0.7.7",

## 할일 기록하기

```ts
// atom
const toDoState = atom<IToDo[]>({
  // atom의 타입은 ToDo의 배열
  key: "toDo",
  default: [],
});
// step1. toDos는 never[]로 언제나 빈 배열이어야 함(ITodo[])
const [toDos, setTodos] = useRecoilState(toDoState);

// step2. toDo가 어떻게 생긴지를 알려줄 인터페이스(보호와 자동완성 기능)
interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; // 다른 값을 넣으면 에러
}

// step3. 폼이 제출되고 데이터가 모두 유효하면, state(setTodos)를 바꾼다.
// 데이터는 data.toDo(=={toDo})에 있음, data는 react-hook-form(input)에서 넘어옴
const handleValid = ({ toDo }: IForm) => {
  // 옛 상태(oldToDos)를 받아 새 상태(ToDos)를 리턴해야 함
  setTodos((oldToDos) => [
    { text: toDo, id: Date.now(), category: "TO_DO" },
    ...oldToDos, // 배열 안의 요소를 반환
  ]);
};

// step4. toDo의 값을 가져와 화면에 그려줌
<ul>
  {toDos.map((toDo) => (
    <li key={toDo.id}>{toDo.text}</li>
  ))}
</ul>;
```

## 할일 완료하기

```ts

```

## Selector
