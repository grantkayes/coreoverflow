import React from 'react';
import { Flex } from '@procore/core-react';
import Question from './question';
import './index.css';

class DetailedQuestion extends React.Component {
  // constructor(props) {
  //   super(props);

  //   // const questionId = this.props.match.params.id;
  // }

  render() {
    return (
      <Flex id="main-container" justifyContent="center" direction="column">
        <Question />
      </Flex>
    );
  }
}

export default DetailedQuestion;
