import React from 'react';
import { Flex, Header } from '@procore/core-react';
import Answer from './answer';
import './index.css';

class AnswerList extends React.Component {
  render() {
    const Answers = this.props.answers.map(answer => {
      const { body, id, questionId, timestamp, up, down } = answer;

      return (
        <Answer
          body={body}
          id={id}
          questionId={questionId}
          timestamp={timestamp}
          up={up}
          down={down}
        />
      );
    });

    console.log(Answers);

    return (
      <Flex
        id="answer-list-container"
        justifyContent="center"
        direction="column"
      >
        <Header className="answer-list-title" type="h1">
          7 Answers
        </Header>
        {Answers}
      </Flex>
    );
  }
}

export default AnswerList;
