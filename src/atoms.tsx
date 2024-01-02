import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
/* const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});
 */
export enum Categories {
  "TO_DO" = "예정",
  "DOING" = "진행중",
  "DONE" = "완료",
  "OTHER" = "기타",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);

    /** 분류 별 할일 뿌리기*/
    const category = get(categoryState);
    if (category === Categories.OTHER) {
      return toDos.filter(
        (todo) =>
          todo.category !== Categories.TO_DO &&
          todo.category !== Categories.DOING &&
          todo.category !== Categories.DONE
      );
    }
    return toDos.filter((toDo) => toDo.category === category);
  },
});
