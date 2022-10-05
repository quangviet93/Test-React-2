import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, fetchData } from '../features/Users';

function ModalCustom(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.users.users);

  const [namePlayer1, setNamePlayer1] = useState(null);
  const [namePlayer2, setNamePlayer2] = useState(null);

  const handleSubmit = () => {
    if (namePlayer1 && namePlayer2) {
      dispatch(addUser([namePlayer1, namePlayer2]));
      dispatch(fetchData()).then(() => {
        navigate('/game-screen');
      });
      props.handleCloseReply();
    }
  };

  return (
    <>
      <Modal show={props.props} onHide={props.handleCloseReply}>
        <Modal.Header closeButton>
          <Modal.Title>Create Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Add Name Player 1
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => {
                setNamePlayer1(e.target.value);
              }}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Add Name Player 2
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => {
                setNamePlayer2(e.target.value);
              }}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              {' '}
              2 Matches (a match has 3 questions)
            </InputGroup.Text>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              handleSubmit();
            }}
          >
            Add
          </Button>
          <Button variant="dark" onClick={props.handleCloseReply}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCustom;
