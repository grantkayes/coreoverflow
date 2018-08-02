import React from 'react';
import { Flex, Card } from '@procore/core-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getAnswers,
  editAnswer,
  submitAnswer
} from '../../modules/actions/answers';

import {
  getCurrentQuestion,
  updateQuestions
} from '../../modules/actions/questions';

import Question from './question';
import AnswerList from './answerList';
import LessModal from '../coremodal/lessmodal';

import './index.css';
import QuestionSpinner from '../dashboard/questionSpinner';

class DetailedQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditModalOpen: false,
      isSubmitModalOpen: false,
      modalType: 'edit',
      body: ''
    };

    const questionId = this.props.match.params.id;

    this.props.getCurrentQuestion(questionId);
    this.props.getAnswers(questionId);
  }

  toggleSubmitModal = () => {
    this.setState({
      isSubmitModalOpen: !this.state.isSubmitModalOpen,
      modalType: 'submit'
    });
  };

  toggleEditModal = () => {
    console.log('toggling');
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen,
      modalType: 'edit',
    });

  };

  editAnswer = answer => {
    console.log('answer')
    console.log(answer)
    const { body } = answer;

    this.props.editAnswer(answer.id, { questionId: this.props.question.id, ...answer });
  };

  submitAnswer = answer => {
    const { userEmail, userFirstName, userLastName } = this.props;
    const { body } = answer;

    console.log('this.props', this.props)

    const reqBody = {
      questionId: this.props.question.id,
      userEmail,
      firstName: userFirstName,
      lastName: userLastName,
      body
    };
    this.props.submitAnswer(reqBody)
    this.setState({
      body: ''
    })
  }

  render() {
    return this.props.questionLoading ? (
      <QuestionSpinner />
    ) : (
      <Flex id="main-container" justifyContent="center" direction="column">
        <Card id="card-container" className="card" level="30">
          <Question
            question={this.props.question}
            updateQuestions={this.props.updateQuestions}
            toggleSubmitModal={this.toggleSubmitModal}
          />
          <AnswerList
            answers={this.props.answers}
            answersBusy={this.props.answersBusy}
            answersError={this.props.answersError}
            editAnswer={this.editAnswer}
            submitAnswer={this.submitAnswer}
            questionId={this.props.match.params.id}
            userEmail={this.props.userEmail}
            userFirstName={this.props.userFirstName}
            userLastName={this.props.userLastName}
            toggleEditModal={this.toggleEditModal}
            toggleSubmitModal={this.toggleSubmitModal}

          />
        </Card>
        <LessModal
          body={''}
          open={this.state.isSubmitModalOpen}
          close={this.toggleSubmitModal}
          editAnswer={this.editAnswer}
          submitAnswer={this.submitAnswer}
          modalType={this.state.modalType}
        />

        <LessModal
          body={this.state.body}
          open={this.state.isEditModalOpen}
          close={this.toggleEditModal}
          editAnswer={this.editAnswer}
          submitAnswer={this.submitAnswer}
          modalType={this.state.modalType}
        />
      </Flex>
    )
  }
}

const mapStateToProps = state => ({
  answers: state.answers.data,
  answersBusy: state.answers.busy,
  answersError: state.answers.error,
  userEmail: state.user.data.email,
  userFirstName: state.user.data.firstName,
  userLastName: state.user.data.lastName,
  question: state.question.currentQuestion,
  questionLoading: state.question.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCurrentQuestion,
      updateQuestions,
      getAnswers,
      editAnswer,
      submitAnswer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailedQuestion);
