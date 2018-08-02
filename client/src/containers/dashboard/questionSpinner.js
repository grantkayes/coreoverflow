import React from 'react';
import { Spinner } from '@procore/core-react'

const QuestionSpinner = () => {
  return (
    <div className="placeholder question-placeholder">
      <Spinner loading={true} label="loading">
        <p>Loading</p>
      </Spinner>
    </div>
  );
}

export default QuestionSpinner;



