import React from 'react';
import { Flex, Header, EmptyState, Button, Icon } from '@procore/core-react';
import LessModal from '../coremodal/lessmodal';
import Answer from './answer';
import './index.css';
import { EDIT_ANSWER_FAILED } from '../../modules/reducers/answers';

const emptyStateButton = {
  width: '150px',
  display: 'flex',
  justifyContent: 'center',
  height: '40px',
  paddingRight: '20px',
  fontSize: '16px'
};

class AnswerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditModalOpen: false,
      isSubmitModalOpen: false,
      modalType: 'edit',
      body: ''
    };

  }

  toggleSubmitModal = () => {
    this.setState({
      isSubmitModalOpen: !this.state.isSubmitModalOpen,
      modalType: 'submit'
    });
  };

  toggleEditModal = (body) => () => {
    console.log('toggling');
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen,
      modalType: 'edit',
      body
    });
  };

  editAnswer = answer => {
    const { body } = answer;

    this.props.editAnswer(this.props.id, { questionId: this.props.questionId, body });
  };

  submitAnswer = answer => {
    const { questionId, userEmail, userFirstName, userLastName } = this.props;
    const { body } = answer;

    console.log('this.props', this.props)

    const reqBody = {
      questionId,
      userEmail,
      firstName: userFirstName,
      lastName: userLastName,
      body
    };
    this.props.submitAnswer(reqBody);
  }


  render() {
    const Answers = this.props.answers.map(answer => {
      console.log(answer)
      const { body, id, questionId, timestamp, claps, firstName, lastName } = answer;

      return (
        <Answer
          key={id}
          body={body}
          id={id}
          questionId={questionId}
          timestamp={timestamp}
          claps={claps}
          toggleEditModal={this.toggleEditModal}
          toggleSubmitModal={this.toggleSubmitModal}
          questionId={this.props.questionId}
          userEmail={this.props.userEmail}
          userFirstName={this.props.userFirstName}
          userLastName={this.props.userLastName}
          answerFirstName={firstName}
          answerLastName={lastName}
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
        {
          this.props.answers.length === 0 ?
          <div className='empty-answers-container'>
            <EmptyState>
              <EmptyState.Image><img src="http://coreoverflow.s3.amazonaws.com/1/5c2398eb-488d-47ec-8b5b-8202a79aca19" alt='empty state img'/></EmptyState.Image>
              <EmptyState.Title>{`${this.props.userFirstName}, can you answer this question?`}</EmptyState.Title>
              <EmptyState.Description style={{ fontSize: '12px' }}>People are searching for a better answer to this question.</EmptyState.Description>
              <EmptyState.Actions><Button style={emptyStateButton} onClick={this.toggleSubmitModal}><Icon size="md" icon="edit" /> Answer</Button></EmptyState.Actions>
            </EmptyState>
          </div> :
          Answers
        }
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
    );
  }
}

export default AnswerList;
