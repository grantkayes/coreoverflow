import React from 'react';
import { Flex, Header } from '@procore/core-react';
import Answer from './answer';
import './index.css';

class AnswerList extends React.Component {
  render() {
    return (
      <Flex
        id="answer-list-container"
        justifyContent="center"
        direction="column"
      >
        <Header className="answer-list-title" type="h1">
          7 Answers
        </Header>
        <Answer />
        <Answer />
        <Answer />
        <Answer />
        <Answer />
        <Answer />
        <Answer />
      </Flex>
    );
  }
}

export default AnswerList;