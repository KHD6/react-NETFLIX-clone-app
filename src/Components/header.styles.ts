import styled from "styled-components";
import { motion } from "framer-motion";

export const TopHeader = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  font-size: 16px;
  padding: 20px 60px;
`;

export const Nav = styled.nav`
  justify-content: space-between;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

export const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.red};
`;

export const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

export const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;
