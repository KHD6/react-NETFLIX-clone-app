import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  background-color: black;
`;

export const Loader = styled.div`
  height: 20vh;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgphoto: string }>`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  @media screen and (min-width: 1024px) {
    height: 100vh;
  }
`;

export const Title = styled.h2`
  font-family: SBAggroB;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 30px;
  }
  @media screen and (min-width: 1440px) {
    font-size: 40px;
  }
`;

export const Overview = styled.p`
  width: 600px;
  max-width: 80%;
  font-size: 12px;
  font-family: Pretendard-Regular;
  margin-bottom: 30px;
  @media screen and (min-width: 768px) {
    max-width: 50%;
    font-size: 15px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 17px;
  }
  @media screen and (min-width: 1440px) {
    font-size: 20px;
  }
`;

export const PlayBtn = styled.button`
  width: 120px;
  height: 30px;
  padding: 10px;
  font-size: 16px;
  font-family: Pretendard-Regular;
  color: ${(prop) => prop.theme.black.lighter};
  background-color: rgba(255, 255, 255, 1);
  border-radius: 7.5px;
  transition: all 0.3s;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.playBtn {
    width: 100%;
    @media screen and (min-width: 768px) {
    }
    @media screen and (min-width: 1024px) {
    }
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
  @media screen and (min-width: 768px) {
    font-size: 18px;
    border-radius: 10px;
    width: 150px;
    height: 45px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 20px;
    border-radius: 15px;
    width: 200px;
    height: 60px;
  }
  svg {
    width: 16px;
    max-height: 100%;
    margin-right: 5px;
    fill: ${(prop) => prop.theme.black.lighter};
    @media screen and (min-width: 768px) {
      font-size: 18px;
    }
    @media screen and (min-width: 1024px) {
      font-size: 20px;
    }
  }
`;

export const DetailsBtn = styled.button`
  color: ${(prop) => prop.theme.white.lighter};
  width: 120px;
  height: 30px;
  font-size: 16px;
  font-family: Pretendard-Regular;
  background-color: rgba(109, 109, 110, 0.7);
  border-radius: 7.5px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: rgba(109, 109, 110, 0.5);
  }
  @media screen and (min-width: 768px) {
    font-size: 18px;
    border-radius: 10px;
    width: 150px;
    height: 45px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 20px;
    border-radius: 15px;
    width: 200px;
    height: 60px;
  }
  svg {
    width: 16px;
    margin-right: 5px;
    fill: ${(prop) => prop.theme.white.lighter};
    @media screen and (min-width: 768px) {
      font-size: 18px;
    }
    @media screen and (min-width: 1024px) {
      font-size: 20px;
    }
  }
`;

export const ContentBox = styled.div`
  position: relative;
  @media screen and (min-width: 1024px) {
    top: -150px;
  }
`;

export const Slider = styled.div`
  position: relative;
  height: 200px;
  margin-bottom: 100px;
  button {
    opacity: 1;
    @media screen and (min-width: 1024px) {
      opacity: 0;
    }
  }
  &:hover {
    button {
      opacity: 1;
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;

export const SliderTitle = styled.div`
  font-size: 24px;
  font-family: SBAggroB;
  margin-bottom: 10px;
`;

export const SliderBox = styled.div`
  position: relative;
  height: 100%;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  position: absolute;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
  }
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
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
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const PrevBtn = styled(motion.button)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  z-index: 5;
  opacity: 0;
  transition: all 0.3s;
  cursor: pointer;
`;

export const NextBtn = styled(motion.button)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 5;
  opacity: 0;
  transition: all 0.3s;
  cursor: pointer;
`;

export const Info = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export const PopUp = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
`;

export const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const ExitBtn = styled(motion.div)`
  svg {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    fill: ${(props) => props.theme.white.lighter};
    cursor: pointer;
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
`;

export const BigMovie = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (min-width: 768px) {
    position: absolute;
    top: 100px;
    width: 70vw;
    height: 80vh;
  }
  @media screen and (min-width: 1024px) {
    width: 50vw;
    min-width: 716px;
  }
`;

export const BigCover = styled.div`
  width: 100%;
  height: 45%;
  min-height: 300px;
  background-size: cover;
  background-position: center;
`;

export const PosterBox = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  @media screen and (min-width: 768px) {
    top: 40%;
    left: 5%;
    transform: translate(0, -50%);
  }
`;

export const Poster = styled.div`
  width: 260px;
  height: 380px;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    width: 200px;
    height: 300px;
  }
  @media screen and (min-width: 1024px) {
    width: 280px;
    height: 400px;
  }
`;

export const BigTitle = styled.h4`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 36px;
  font-family: Pretendard-Regular;
  position: relative;
`;

export const DetailBox = styled.div`
font-family: Pretendard-Regular;
  position: absolute;
  top: 60%;
  left: 0;
  color: ${(props) => props.theme.white.lighter};
  text-align: center;
  @media screen and (min-width: 768px) {
    position: relative;
    width: 100%;
    top: 0;
  }
  @media screen and (min-width: 1024px) {
    font-size: 22px;
  }
  .inner {
    @media screen and (min-width: 768px) {
      margin: 0 25px;
    }
    @media screen and (min-width: 1024px) {
      margin: 0 35px;
    }
    @media screen and (min-width: 1024px) {
      margin: 0 45px;
    }
  }
`;

export const OverviewTitle = styled.p`
  font-size: 26px;
  font-family: SBAggroB;
  margin-bottom: 10px;
  @media screen and (min-width: 768px) {
    font-size: 24px;
    position: absolute;
    top: -70px;
    left: 245px;
    width: calc(100% - 290px);
    text-align: left;
  }
  @media screen and (min-width: 1024px) {
    font-size: 28px;
    left: 340px;
    width: calc(100% - 370px);
  }
  @media screen and (min-width: 1440px) {
    top: -80px;
  }
  @media screen and (min-width: 1440px) {
    font-size: 32px;
  }
`;
export const OverviewOriginalTitle = styled.p`
  font-size: 20px;
  margin-bottom: 5px;
  @media screen and (min-width: 768px) {
    width: calc(100% - 290px);
    margin: 0 auto 10px 220px;
    text-align: left;
    padding-top: 10px;
  }
  @media screen and (min-width: 1024px) {
    width: calc(100% - 370px);
    margin: 0 auto 10px 305px;
    line-height: 1.5;
  }
  @media screen and (min-width: 1440px) {
  }
  span:last-child {
    text-align: center;
    display: inline-block;
    text-transform: uppercase;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    background-color: ${(props) => props.theme.white.lighter};
    color: ${(props) => props.theme.black.lighter};
    border-radius: 50%;
    font-weight: bold;
    @media screen and (min-width: 1024px) {
      width: 35px;
      height: 35px;
    }
  }
`;
export const OverviewTime = styled.p`
  margin-bottom: 5px;
  @media screen and (min-width: 768px) {
    width: calc(100% - 290px);
    margin: 0 auto 10px 220px;
    text-align: left;
  }
  @media screen and (min-width: 1024px) {
    width: calc(100% - 370px);
    margin: 0 auto 10px 305px;
  }
`;

export const OverviewStars = styled.div`
  margin-bottom: 5px;
  @media screen and (min-width: 768px) {
    width: calc(100% - 290px);
    margin: 0 auto 10px 220px;
    text-align: left;
  }
  @media screen and (min-width: 1024px) {
    width: calc(100% - 370px);
    margin: 0 auto 10px 305px;
  }
`;

export const Star = styled.span`
  color: gray;
  &.full {
    color: gold;
  }
  &.half {
    color: gray;
    position: relative;
  }
  &.half::before {
    content: "★";
    position: absolute;
    left: 0;
    width: 50%;
    overflow: hidden;
    color: gold;
  }
  &.empty {
    color: lightgray;
  }
  @media screen and (min-width: 1024px) {
  }
`;

export const OverviewGenres = styled.ul`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    width: calc(100% - 290px);
    margin: 0 auto 10px 220px;
    justify-content: left;
  }
  @media screen and (min-width: 1024px) {
    width: calc(100% - 370px);
    margin: 0 auto 40px 305px;
  }
  @media screen and (min-width: 1440px) {
    margin: 0 auto 80px 305px;
  }
  @media screen and (min-width: 1920px) {
    width: 65%;
  }
`;

export const OverviewTagline = styled.p`
  text-align: left;
  margin-bottom: 10px;
  position: relative;
  padding-left: 10px;
  &::before {
    content: "";
    display: block;
    width: 1px;
    height: 100%;
    background-color: white;
    position: absolute;
    left: 0;
  }
`;

export const Overviewtxt = styled.p`
  margin-bottom: 100px;
  text-align: left;
  line-height: 1.4;
`;
