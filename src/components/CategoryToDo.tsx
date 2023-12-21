import { useRecoilState } from "recoil";
import { Categories, categoryState } from "../atoms";
import styled from "styled-components";

const Form = styled.form`
  display: inline-block;
  select {
    border-radius: 4px 0 0 4px;
    border: 0;
    padding: 5px 6px;
  }
`;

function CategoryToDo() {
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Form>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO_DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
    </Form>
  );
}
export default CategoryToDo;
