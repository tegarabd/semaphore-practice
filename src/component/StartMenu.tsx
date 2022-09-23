import Button from "./Button";
import Center from "./Center";
import Overlay from "./Overlay";
import Slider from "./Slider";
import { ChangeEventHandler } from "react";
import styled from "styled-components";

const ConfigContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

function StartMenu({
  speed,
  count,
  changeSpeed,
  changeCount,
  startSign,
}: {
  speed: number;
  count: number;
  changeSpeed: ChangeEventHandler<HTMLInputElement>;
  changeCount: ChangeEventHandler<HTMLInputElement>;
  startSign: VoidFunction;
}) {
  return (
    <Overlay>
      <Center direction="column">
        <h1>Semaphore Practice</h1>

        <ConfigContainer>
          <Center direction="column">
            <h3>Set Sign Count</h3>
            <Slider
              type="range"
              min={5}
              max={50}
              step={5}
              value={count}
              onChange={changeCount}
            />
            <p>{count} sign</p>
          </Center>
          <Center direction="column">
            <h3>Set Speed</h3>
            <Slider
              type="range"
              min={1}
              max={5}
              step={0.5}
              value={speed}
              onChange={changeSpeed}
            />
            <p>{speed} sign/second</p>
          </Center>
        </ConfigContainer>

        <Button onClick={startSign}>Start</Button>
      </Center>
    </Overlay>
  );
}

export default StartMenu;
