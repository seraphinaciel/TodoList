import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState } from "../atoms";

export const Button = styled.button`
  border: 0;
  border-radius: 4px;
  padding: 0.4em;
  font-size: 12px;
  background-color: transparent;
  cursor: pointer;
`;
export const BtnColor = styled(Button)<{ value: string; isActive: boolean }>`
  color: ${(props) => {
    switch (props.value) {
      case Categories.TO_DO:
        return props.theme.btn01_off;
      case Categories.DOING:
        return props.theme.btn02_off;
      case Categories.DONE:
        return props.theme.btn03_off;
      default:
        return props.theme.btn04_off;
    }
  }};

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const CBtn = styled(BtnColor)<{ isActive: boolean }>`
  background: ${(props) =>
    props.isActive ? `rgba(0,0,0,0.3)` : "transparent"};
  font-weight: ${(props) => (props.isActive ? "600" : "")};
  margin: 0 4px;
  font-size: 0.875rem;
`;

function CategoryBtn() {
  const setCategory = useSetRecoilState(categoryState);
  const [onCategory, setOnCategory] = useState<Categories>();

  const changeCategory = (value: Categories) => {
    setOnCategory(value);
    setCategory(value);
  };

  return (
    <div>
      {Object.values(Categories).map((newC) => (
        <CBtn
          key={newC}
          value={newC}
          isActive={onCategory === newC}
          onClick={() => changeCategory(newC)}
        >
          {newC}
        </CBtn>
      ))}
    </div>
  );
}
export default CategoryBtn;
