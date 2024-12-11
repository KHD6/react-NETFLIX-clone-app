import { motion } from "framer-motion";
import styled from "styled-components";

export const ListBox = styled(motion.div)`
  position: relative;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
  }
`;

export const SearchTitle = styled(motion.div)`
  font-size: 24px;
  font-family: SBAggroB;
  margin-bottom: 10px;
`;

export const SearchBox = styled.div`
  position: relative;
  @media screen and (min-width: 1024px) {
    top: -150px;
  }
`;

export const SearchList = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 200px;
  color: red;
  font-size: 66px;
  position: relative;
  cursor: pointer;
  &:hover {
    z-index: 4;
  }
  &:nth-child(2n) {
    transform-origin: center right;
  }
  &:nth-child(2n + 1) {
    transform-origin: center left;
  }
  @media screen and (min-width: 768px) {
    &:nth-child(2n) {
      transform-origin: center;
    }
    &:nth-child(2n + 1) {
      transform-origin: center;
    }
    &:nth-child(4n) {
      transform-origin: center right;
    }
    &:nth-child(4n + 1) {
      transform-origin: center left;
    }
  }
  @media screen and (min-width: 1024px) {
    &:nth-child(4n) {
      transform-origin: center;
    }
    &:nth-child(4n + 1) {
      transform-origin: center;
    }
    &:nth-child(5n) {
      transform-origin: center right;
    }
    &:nth-child(5n + 1) {
      transform-origin: center left;
    }
  }
`;
