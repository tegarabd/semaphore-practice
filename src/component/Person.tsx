import React from "react";
import styled from "styled-components";
import Semaphore from "./Semaphore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  height: 48rem;
`;

const Head = styled.div`
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  background-color: black;
`;

const Body = styled.div`
  position: relative;
  width: 10rem;
  height: 12rem;
  background-color: black;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
`;

interface HandProps {
  speed: number;
  rotate: number;
}

const Hand = styled.div<HandProps>`
  position: absolute;
  width: 3rem;
  height: 16rem;
  background-color: black;
  border-radius: 2rem;
  transition: ${(props) => props.speed}ms;
  transform-origin: 50% 1rem;
  top: 0;
`;

const SemaphoreGrip = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -7rem;
  transform: rotate(180deg);
`;

const LeftHand = styled(Hand)<HandProps>`
  transform: rotate(${(props) => props.rotate}deg);
  left: 0;

  ${SemaphoreGrip} {
    transform: scaleY(${(props) => (props.rotate < 0 ? "" : -1)});
  }
`;

const RightHand = styled(Hand)<HandProps>`
  transform: rotate(${(props) => props.rotate}deg);
  right: 0;

  ${SemaphoreGrip} {
    transform: scaleY(${(props) => (props.rotate <= 0 ? "" : -1)});
  }
`;

const Legs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10rem;
`;

const Leg = styled.div`
  width: 3rem;
  height: 12rem;
  background-color: black;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
`;

function Person({
  leftRotate,
  rightRotate,
  speed,
}: {
  leftRotate: number;
  rightRotate: number;
  speed: number;
}) {
  return (
    <Container>
      <Head />
      <Body>
        <LeftHand
          speed={speed}
          rotate={leftRotate === 0 ? -15 : leftRotate * 45}
        >
          <SemaphoreGrip>
            <Semaphore />
          </SemaphoreGrip>
        </LeftHand>
        <RightHand
          speed={speed}
          rotate={rightRotate === 0 ? 15 : -rightRotate * 45}
        >
          <SemaphoreGrip>
            <Semaphore />
          </SemaphoreGrip>
        </RightHand>
      </Body>
      <Legs>
        <Leg />
        <Leg />
      </Legs>
    </Container>
  );
}

export default Person;
