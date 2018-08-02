import React from 'react';
import { Flex, Header } from '@procore/core-react';
import Answer from './answer';
import './index.css';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Answers = this.props.answers.map(answer => {
      const { body, id, questionId, timestamp, claps } = answer;

      return (
        <Answer
          key={id}
          body={body}
          id={id}
          questionId={questionId}
          timestamp={timestamp}
          claps={claps}
          editAnswer={this.props.editAnswer}
          submitAnswer={this.props.submitAnswer}
          userEmail={this.props.userEmail}
          userFirstName={this.props.userFirstName}
          userLastName={this.props.userLastName}
        />
      );
    });

    return (
      <Flex
        id="answer-list-container"
        justifyContent="center"
        direction="column"
      >
        <Header className="answer-list-title" type="h1">
          {this.props.answers.length} Answers
        </Header>
        {Answers}
      </Flex>
    );
  }
}

export default AnswerList;
