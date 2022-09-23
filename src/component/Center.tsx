import styled from "styled-components";

interface CenterProps {
  direction?: string;
}

const Center = styled.div<CenterProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export default Center;
