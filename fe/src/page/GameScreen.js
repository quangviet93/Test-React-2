import '../App.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dataAnswer } from '../features/Users';

const GameScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [indexQuestion, setIndexQuestion] = useState(0);
  const questionApi = useSelector((state) => state.users.question);
  const userList = useSelector((state) => state.users.users);

  const total = [
    ...Object.values(questionApi[indexQuestion].incorrect_answers, userList),
    questionApi[indexQuestion].correct_answer,
  ];

  const [playerToIndex, setPlayerToIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState(null);
  const [question, setQuestion] = useState(questionApi[indexQuestion].question);
  const [player, setPlayer] = useState(userList[playerToIndex]);
  const [isLastPlayer, setIsLastPlayer] = useState(false);
  const [time, setTime] = useState(10);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (time > 0) {
  //       setTime((prev) => prev - 1);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // useEffect(() => {
  //   if (time === 0) {
  //     handleSubmit();
  //   }
  //   if (time === 0 && isLastPlayer == true) {
  //     handleNext();
  //   }
  // }, [time]);
  const handleSubmit = () => {
    dispatch(
      dataAnswer({
        namePlayer: player,
        answerPlayer: answers,
        answerApi: questionApi[indexQuestion].correct_answer,
      })
    );
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPlayer(userList[playerToIndex + 1]);
      setPlayerToIndex(playerToIndex + 1);
    }, 2000);
    if (playerToIndex === userList.length - 1) {
      setTimeout(() => {
        setPlayer('');
        setPlayerToIndex(0);
        setIsLastPlayer(true);
      }, 2000);
    }
  };
  const handleNext = () => {
    if (Number(indexQuestion) === questionApi.length - 1) {
      navigate('/history');
      return;
    }
    setPlayer(userList[0]);
    setIndexQuestion(indexQuestion + 1);
    setQuestion(questionApi[indexQuestion + 1].question);
    setIsLastPlayer(false);
  };

  return (
    <div className="screenGameManagement">
      <div className="containerScreenGameManagement">
        <div className="title-gameScreen">
          <h1>
            {' '}
            <span class="badge bg-secondary">Results Game</span>
          </h1>
          <Button className="buttonAddPlayer" variant="primary">
            {time}
          </Button>{' '}
        </div>
        <div className="player">
          <h2>
            <span class="badge bg-secondary">Player : {player}</span>
          </h2>{' '}
        </div>
        <div className="player">
          {' '}
          <h4>
            <span class="badge bg-secondary">Question : {question}</span>
          </h4>{' '}
        </div>
        <div className="css-question">
          {total.map((e, i) => (
            <div key={i} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value={e}
                onChange={(e) => {
                  setAnswers(e.target.value);
                }}
              />
              <label className="form-check-label fs-3" for="flexRadioDefault1">
                {e}
              </label>
            </div>
          ))}
        </div>
        {isLastPlayer ? (
          <Button
            variant="secondary"
            onClick={() => {
              handleNext();
            }}
          >
            Next
          </Button>
        ) : (
          <>
            {!isLoading ? (
              <Button
                variant="primary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            ) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
