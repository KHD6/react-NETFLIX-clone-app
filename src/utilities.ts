import styled from "styled-components";

export const Inner = styled.div`
margin: 0  30px;

@media screen and (min-width: 768px){
  margin: 0  45px;
}
@media screen and (min-width: 1024px){
  margin: 0  60px;
}
`;

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}${id}`;
}
