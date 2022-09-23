import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Stick = styled.div`
  width: 0.4rem;
  border-radius: 100vw;
  height: 16rem;
  background-color: hsl(28, 19%, 26%);
`;

const Flags = styled.div`
  top: 0.15rem;
  position: relative;
`;

const Flag = styled.div`
  position: absolute;
  width: 8rem;
  height: 8rem;
`;

const RedFlag = styled(Flag)`
  background-color: hsl(0, 75%, 50%);
  clip-path: polygon(100% 0, 0 0, 0 100%);
`;

const YellowFlag = styled(Flag)`
  background-color: hsl(60, 75%, 50%);
  clip-path: polygon(0 100%, 100% 100%, 100% 0);
`;

function Semaphore() {
  return (
    <Container>
      <Stick />
      <Flags>
        <RedFlag />
        <YellowFlag />
      </Flags>
    </Container>
  );
}

export default Semaphore;
