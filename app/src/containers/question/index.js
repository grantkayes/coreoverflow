import React from 'react';
import { Flex, Icon } from '@procore/core-react';
import Question from './question';
import AnswerList from './answerList';
import './index.css';

class DetailedQuestion extends React.Component {
  constructor(props) {
    super(props);

    const questionId = this.props.match.params.id;
  }

  render() {
    return (
      <Flex id="main-container" justifyContent="center" direction="column">
        <Question />
        <AnswerList />
      </Flex>
    );
  }
}

export default DetailedQuestion;
