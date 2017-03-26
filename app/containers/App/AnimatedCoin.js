import styled, { keyframes } from 'styled-components';

const animationFrames = keyframes`
  0% {
    opacity:1;
    transform:  translate(0px,0px)  rotate(0deg) scaleX(1.00) scaleY(1.00) ;
  }
  100% {
    opacity:0;
    transform:  translate(-300px,50px)  rotate(-400deg) scaleX(2.00) scaleY(2.00) ;
  }
`;

const AnimatedCoin = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  top: 50px;
  right: 300px;
  animation: ${animationFrames} ease 1s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
  animation-fill-mode:forwards; /*when the spec is finished*/
`;

export default AnimatedCoin;
