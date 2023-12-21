# React Project

- react: "18.2.0",
- react-router-dom: "6.20.0",
- react-query: "3.39.3",
- @tanstack/react-query: "^5.8.9",
- typescript: "4.9.5",
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

## 할일 완료하기 - 버튼 만들기

1. 인자를 받는 함수를 직접 만들어서 새 익명 함수 선언해서 인자를 넘겨줌

```ts
function ToDo({ text, category }: IToDo) {
  const onClick = (newCategory: IToDo["category"]) => {
    console.log(newCategory);
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}
```

2. onClick 함수 (잘 사용하지 않음)

```ts
function ToDo({ text, category }: IToDo) {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event를 통해 버튼의 name을 받아옴
    const {
      currentTarget: { name },
    } = event;
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button name="To Do" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name="Doing" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="Done" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}
```

## 할일 완료하기 - category 수정

1. id 찾기 : 객체의 index target

```ts
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      // 첫번째 toDo의 id와 prop에서 받은 id를 비교하여 인덱스 찾기
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      console.log(targetIndex);
      return oldToDos;
    });
  };
}
```

2. 새 todo를 만들어서 원래 todo를 업데이트, (새 카테고리로 새 todo 만들기)

```ts
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // newToDo : oldToDos와 같은 데이터지만 카테고리만 다름
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name };
      return oldToDos;
    });
  };
}
```

3. 배열의 원소 교체

원소의 위치가 바뀌는 걸 원하지 않기 때문에 `targetIndex` index에 있는 to do를 `newToDo`로 바꿈

```ts
const food = ["a", "b", "c", "d"];

// b 이전까지 자른다 = ["a"]
const front = food.slice(0, 1);

// target + 1에서 자른다 = ["c", "d"]
// 끝부분을 지정하지 않으면 끝까지 잘라서 반환
const back = food.slice(target + 1);

// b 자리에 banana 교체하기 = [...front, "banana", ...back] ["a", "banana", "c", "d"]
const final = [...food.slice(0, target), "banana", ...food.slice(taget + 1)];
```

## 할일 분류

목적 : 모든 할일을 atom에 담고 싶고, atom의 output을 유용한 형태로 변형하고 싶다.

```ts
// atoms.tsx
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState); // 모든 할일 받음
    return [
      toDos.filter((toDo) => toDo.category === "TO_DO"), // TO_DO가 속한 할일이 담긴 배열
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});

// ToDoList.tsx
// 카테고리별로 구분해서 랜더
const [todo, doing, done] = useRecoilValue(toDoSelector);
```

## 사용자가 원하는(현재 저장한) 카테고리만 보여줌

```ts
// atoms.tsx
export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    // category에 따라 selector가 각각의 toDo 배열을 반환
    return toDos.filter((toDo) => toDo.category === category);
  },
});

// ToDoList.tsx
function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);

  // 현재의 값과, 값을 수정하는 hook
  const [category, setCategory] = useRecoilState(categoryState);

  // select의 변경을 감지 => setCategory 호출
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <div>
      <form action="">
        <select value={category} onInput={onInput}>
          <option value="TO_DO">TO_DO</option>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </select>
      </form>

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
```

## categoryState에 따라 toDo 카테고리 추가

```ts
// CreateTodo.tsx
const category = useRecoilValue(categoryState);
const handleValid = ({ toDo }: IForm) => {
  setToDos((oldToDos) => [
    { text: toDo, id: Date.now(), category },
    ...oldToDos,
  ]);
};

// atoms.tsx
// type : 복붙 안하게 해주는 단순한 문법
type categories = "TO_DO" | "DOING" | "DONE";

export interface IToDo {
  text: string;
  id: number;
  category: categories;
}

export const categoryState = atom<categories>({
  key: "category",
  default: categories.TO_DO,
});

// ToDoList.tsx
function ToDoList() {
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
    /* error : setCategories 함수를 호출 할 때 인자로 string 타입인 값이 넘어감 -> as any */
  };
  return null;
}
```

```ts
// atoms.tsx
export enum Categories {
  "TO_DO", // 실제 값 0
  "DOING", // 실제 값 1
  "DONE", // 실제 값 2
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

// ToDo.tsx
function ToDo() {
  return (
    <li>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          // error : name={Categories.DOING}은 string이어야 하는데 enum은 숫자로
          나옴. 해결은 아래 예시 반환 Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}
// ToDoList.tsx
function ToDoList() {
  return (
    <form action="">
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO_DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
    </form>
  );
}
```

```ts
// 해결
export enum Categories {
  "TO_DO" = "TO_DO", // 실제 값 "TO_DO"
  "DOING" = "DOING", // 실제 값 "DOING"
  "DONE" = "DONE", // 실제 값 "DONE"
}
```

# 숙제

✅ 삭제 버튼
✅ localStorage 이용한 저장
