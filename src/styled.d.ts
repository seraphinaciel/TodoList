import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bg: string;
    text: string;
    point: string;
    btn01_on: string;
    btn02_on: string;
    btn03_on: string;
    btn04_on: string;
    btn01_off: string;
    btn02_off: string;
    btn03_off: string;
    btn04_off: string;
  }
}
