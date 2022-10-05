import '../App.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import ModalCustom from '../component/ModalCustom';

function AddPlayer() {
  const [showReply, setShowReply] = useState(false);

  const handleCloseReply = () => setShowReply(false);
  const handleShowReply = () => setShowReply(true);

  return (
    <div className="screenAddPlayer">
      <div>
        <div>List Player Game !</div>
        <Button
          className="buttonAddPlayer"
          variant="primary"
          onClick={handleShowReply}
        >
          Create Game
        </Button>
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
}
export default AddPlayer;
