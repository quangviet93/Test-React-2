import '../App.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import ModalCustom from '../component/ModalCustom';

const StartGame = () => {
  const [showReply, setShowReply] = useState(false);

  const handleCloseReply = () => setShowReply(false);
  const handleShowReply = () => setShowReply(true);
  return (
    <div className="screen-startGame">
      <div>
        <h1>
          {' '}
          <span class="badge bg-secondary">Funny Game</span>
        </h1>
      </div>
      <div>
        <Button
          className="buttonAddPlayer"
          variant="primary"
          onClick={handleShowReply}
        >
          Start Game
        </Button>{' '}
        {showReply && (
          <ModalCustom
            props={showReply}
            handleCloseReply={() => {
              handleCloseReply();
            }}
          />
        )}
      </div>
    </div>
  );
};
export default StartGame;
