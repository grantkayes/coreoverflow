import React from 'react';
import { Flex, Card } from '@procore/core-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAnswers, editAnswer } from '../../modules/actions/answers';


import Question from './question';
import AnswerList from './answerList';

import './index.css';

class DetailedQuestion extends React.Component {
  constructor(props) {
    super(props);

    const questionId = this.props.match.params.id;

    this.props.getAnswers(questionId);
  }

  render() {
    return (
      <Flex id="main-container" justifyContent="center" direction="column">
        <Card id="card-container" className="card" level="30">
          <Question
            type='edit'
          />
          <AnswerList
            answers={this.props.answers}
            answersBusy={this.props.answersBusy}
            answersError={this.props.answersError}
            editAnswer={this.props.editAnswer}
          />
        </Card>
      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  answers: state.answers.data,
  answersBusy: state.answers.busy,
  answersError: state.answers.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAnswers,
      editAnswer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailedQuestion);
