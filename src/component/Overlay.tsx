import styled from "styled-components";
import { ReactNode } from "react";

const Background = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: white;
  padding: 2rem;
  width: 25rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 15rem;
  }
`;

function Overlay({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <Background>
      <Container>{children}</Container>
    </Background>
  );
}

export default Overlay;
