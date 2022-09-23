import styled from "styled-components";
import Person from "./component/Person";
import {
  useEffect,
  useState,
  FormEventHandler,
  ChangeEventHandler,
  useCallback,
} from "react";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import semaphore from "./data/semaphore.json";
import Button from "./component/Button";
import Input from "./component/Input";
import Overlay from "./component/Overlay";
import StartMenu from "./component/StartMenu";
import Center from "./component/Center";
import words from "./data/words.json";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Line = styled.div`
  width: 16rem;
  height: 0.5rem;
  background-color: #64748b;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 100vw;
  @media (max-width: 768px) {
    width: 10rem;
    height: 0.3125;
  }
`;

const Circle = styled(Center)`
  width: 1.5rem;
  height: 1.5rem;
  background-color: #cbd5e1;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 1rem;
    height: 1rem;
  }
`;

function Journey({
  answers,
  guesses,
}: {
  answers: string[];
  guesses: boolean[];
}) {
  const lines = [];

  for (let i = 0; i < answers.length / 5; i++) {
    const circles = [];

    for (let j = 0; j < 5; j++) {
      const currIdx = i * 5 + j;
      circles.push(
        <Circle key={j}>
          {currIdx < guesses.length ? (
            guesses[currIdx] ? (
              <FaCheckCircle
                size={20}
                color="#16a34a"
              />
            ) : (
              <FaTimesCircle
                size={20}
                color="#dc2626"
              />
            )
          ) : (
            ""
          )}
        </Circle>
      );
    }

    lines.push(<Line key={i}>{circles}</Line>);
  }

  return <>{lines}</>;
}

function App() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [count, setCount] = useState(5);
  const [running, setRunning] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [guess, setGuess] = useState("");
  const [guessed, setGuessed] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [guesses, setGuesses] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);

  const populateAnswers = useCallback(() => {
    for (let i = 0; i < count; i++) {
      setAnswers((prev) => [
        ...prev,
        words[Math.round(Math.random() * words.length)],
      ]);
    }
  }, [count]);

  const startOver = () => {
    setFirstTime(true);
    setScore(0);
    setCurrentAnswerIndex(0);
    setAnswers([]);
    setGuesses([]);
    setGuessed(false);
    setGuess("");
  };

  const startSign = () => {
    populateAnswers();
    setRunning(true);
    setFirstTime(false);
  };

  const nextSign = () => {
    setGuess("");
    setGuessed(false);
    setCurrentAnswerIndex((prev) => prev + 1);
    setRunning(true);
    setFirstTime(false);
  };

  const stopSign = () => {
    setRunning(false);
    setCurrentIndex(0);
  };

  const changeCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCount(event.target.valueAsNumber);
  };

  const changeSpeed: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSpeed(event.target.valueAsNumber);
  };

  const changeGuess: ChangeEventHandler<HTMLInputElement> = (event) => {
    setGuess(event.target.value);
  };

  const checkAnswer: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setGuessed(true);
    if (guess === answers[currentAnswerIndex]) {
      setScore(
        (prev) => prev + answers[currentAnswerIndex].length * 20 * speed
      );
      setCorrect(true);
      setGuesses([...guesses, true]);
    } else {
      setCorrect(false);
      setGuesses([...guesses, false]);
    }
  };

  useEffect(() => {
    let interval = 0;
    if (running && currentIndex < answers[currentAnswerIndex].length - 1) {
      interval = window.setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 1000 / speed);
    } else {
      window.clearInterval(interval);
      window.setTimeout(stopSign, 1000 / speed);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [running, currentIndex, speed, answers, currentAnswerIndex]);

  return (
    <Container>
      <Person
        leftRotate={
          !running
            ? 0
            : semaphore[
                answers[currentAnswerIndex][
                  currentIndex
                ] as keyof typeof semaphore
              ][1]
        }
        rightRotate={
          !running
            ? 0
            : semaphore[
                answers[currentAnswerIndex][
                  currentIndex
                ] as keyof typeof semaphore
              ][0]
        }
        speed={1000 / speed}
      />
      {firstTime && !running && (
        <StartMenu
          count={count}
          speed={speed}
          changeSpeed={changeSpeed}
          changeCount={changeCount}
          startSign={startSign}
        />
      )}
      {!firstTime && !running && (
        <Overlay>
          <Center direction="column">
            <h1>Sign number #{currentAnswerIndex + 1}</h1>
            {!guessed && (
              <Form onSubmit={checkAnswer}>
                <h3>Check your guess</h3>
                <Input
                  type="text"
                  value={guess}
                  onChange={changeGuess}
                />
                <Button>Check</Button>
              </Form>
            )}
            {guessed && (
              <>
                {correct ? (
                  <FaCheckCircle
                    size={120}
                    color="#16a34a"
                  />
                ) : (
                  <>
                    <FaTimesCircle
                      size={120}
                      color="#dc2626"
                    />
                    <h3>Right answer: {answers[currentAnswerIndex]}</h3>
                  </>
                )}
                <Journey
                  answers={answers}
                  guesses={guesses}
                />
                {currentAnswerIndex === answers.length - 1 && (
                  <h3>Final score: {score}</h3>
                )}
              </>
            )}
            {guessed &&
              (currentAnswerIndex < answers.length - 1 ? (
                <Button onClick={nextSign}>Next</Button>
              ) : (
                <Button onClick={startOver}>Start Over</Button>
              ))}
          </Center>
        </Overlay>
      )}
    </Container>
  );
}

export default App;
