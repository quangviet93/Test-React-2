import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import { searchPlayerName } from '../features/Users';

function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const answers = useSelector((state) => state.users.answer);
  const answers = useSelector((state) => state.users.answer);
  const point = Object.keys(answers).map((e) => {
    return answers[e].score;
  });

  const biggestPoint = point.sort(function (a, b) {
    return a - b;
  });

  const winner = Object.keys(answers).filter((e) => {
    if (answers[e].score === biggestPoint[biggestPoint.length - 1]) {
      return answers[e].namePlayer;
    }
  });
  const [searchNamePlayer, setSearchNamePlayer] = useState();

  const handleSearch = () => {
    dispatch(
      searchPlayerName({
        searchNamePlayer,
      })
    );
  };
  useEffect(() => {
    handleSearch();
  }, [searchNamePlayer]);
  const CovertObjInArray = Object.values(answers);
  const products = CovertObjInArray.map((e) => {
    return {
      ...e,
      answerApi: e.answerApi.join(' | '),
      answerPlayer: e.answerPlayer.join(' | '),
    };
  });
  const columns = [
    {
      dataField: 'namePlayer',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'answerPlayer',
      text: 'Answer',
    },
    {
      dataField: 'answerApi',
      text: 'Result',
    },
    {
      dataField: 'score',
      text: 'Score',
    },
    {
      dataField: 'time',
      text: 'Time Finish',
    },
  ];

  return (
    <div className="screenGameManagement">
      <div className="title-history">
        <h1>
          {' '}
          <span class="badge bg-secondary">Results Game</span>
        </h1>
        <Button className="buttonAddPlayer" variant="primary">
          Finally
        </Button>{' '}
      </div>
      <div className="inputSearch">
        <InputGroup size="lg">
          <Form.Control
            placeholder="Search by player name"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              setSearchNamePlayer(e.target.value);
              handleSearch();
            }}
          />
        </InputGroup>
      </div>
      <BootstrapTable keyField="id" data={products} columns={columns} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Summary</th>
            <th>Correct percent</th>
            <th>Total score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(answers).map(
            (e, index) =>
              answers[e].isValid && (
                <tr key={index}>
                  <td>{answers[e].namePlayer}</td>
                  <td>
                    {' '}
                    {(
                      (100 / answers[e].answerPlayer.length) *
                      answers[e].score
                    ).toFixed(1)}
                    %
                  </td>
                  <td>{answers[e].score}</td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <h2 className="titleWinner">
        The Winner is :<span class="badge bg-secondary">{winner[0]}</span>
      </h2>
      <div className="buttonEndGame">
        <Button variant="secondary" onClick={() => {}}>
          End Game
        </Button>
      </div>
    </div>
  );
}

export default History;
