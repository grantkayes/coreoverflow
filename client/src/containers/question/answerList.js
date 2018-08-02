import React from 'react';
import { Flex, Header, EmptyState, Button, Icon } from '@procore/core-react';

import Answer from './answer';
import './index.css';

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

  }



  render() {
    const Answers = this.props.answers.map(answer => {
      const { body, id, questionId, timestamp, claps, firstName, lastName } = answer;

      return (
        <Answer
          key={id}
          body={body}
          id={id}
          questionId={questionId}
          timestamp={timestamp}
          claps={claps}
          editAnswer={this.props.editAnswer}
          toggleEditModal={this.props.toggleEditModal}
          toggleSubmitModal={this.props.toggleSubmitModal}
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
              <EmptyState.Actions><Button style={emptyStateButton} onClick={this.props.toggleSubmitModal}><Icon size="md" icon="edit" /> Answer</Button></EmptyState.Actions>
            </EmptyState>
          </div> :
          Answers
        }
      </Flex>
    );
  }
}

export default AnswerList;
