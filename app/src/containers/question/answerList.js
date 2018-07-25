import React from 'react';
import { Flex, Icon } from '@procore/core-react';
import Answer from './answer';
import './index.css';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex
        id="answer-list-container"
        justifyContent="center"
        direction="column"
      >
        <Answer />
        <Answer />
        <Answer />
        <Answer />
      </Flex>
    );
  }
}

export default AnswerList;
