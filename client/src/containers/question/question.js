import React from 'react';
import { Flex, Header, Token } from '@procore/core-react';
import moment from 'moment';

import Markdown from '../../components/markdown';
import Clap from '../../components/clap'
import LessModal from '../coremodal/lessmodal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faStickyNote,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import './index.css';
import CoreModal from '../coremodal/coremodal';
import DeleteModal from '../coremodal/deletemodal';

class DetailedQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isQuestionModalOpen: false,
      isEditQuestionModalOpen: false,
      isLessModalOpen: false,
      isDeleteModalOpen: false,
    };
  }

  onClap = () => {
    const updateData = {
      title: this.props.question.questionTitle,
      body: this.props.question.body,
      tags: this.props.question.tags,
      questionId: this.props.question.id,
      claps: this.props.question.claps+1
    };

    this.props.updateQuestions(updateData);
  };

  toggleQuestionModal = () => {
    this.setState({ isQuestionModalOpen: !this.state.isQuestionModalOpen });
  }

  toggleEditQuestionModal = () => {
    this.setState({ isEditQuestionModalOpen: !this.state.isEditQuestionModalOpen });
  }

  toggleLessModal = () => {
    this.setState({ isLessModalOpen: !this.state.isLessModalOpen });
  }

  toggleDeleteModal = () => {
    this.setState({ isDeleteModalOpen: !this.state.isDeleteModalOpen });
  }

  confirmDelete = () => {
    window.alert('deleting question...');
    this.toggleDeleteModal();
  }

  render() {
    const { answerCount, questionTitle, body, user, claps, timestamp, tags } = this.props.question;

    let tagContainer = ""
    if(tags) {
      tagContainer = tags.map((tag, index) => {
        return (
          <Token key={index} className="tag">
            <Token.Label>{tag}</Token.Label>
          </Token>
        )
      })
    }

    return (
      <Flex
        id="question-container"
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          className="question-votes"
          alignItems="center"
          justifyContent="center"
        >
          <Clap claps={claps} onClap={this.onClap}/>
        </Flex>
        <Flex
          justifyContent="center"
          className="question-info"
          direction="column"
        >
          <Header className="question-title" type="h3">
            {questionTitle}
          </Header>
          <Markdown className="question-markdown" text={body} />
          <Flex className="tags-container" direction="row" justifyContent='flex-end' style={{ margin:'5px 0 10px 0', width: '100%' }}>
            {tagContainer}
          </Flex>
          <Flex className="info-container" justifyContent="space-between">
            <Flex className="actions-container">
              <Header className="actions" type="h3" onClick={this.props.toggleSubmitModal}>
                <FontAwesomeIcon className="answer" icon={faComments} />
                Answer
              </Header>
              <LessModal open={this.state.isLessModalOpen} close={this.toggleLessModal} />
              <Header className="actions" type="h3" onClick={this.toggleEditQuestionModal}>
                <FontAwesomeIcon className="edit" icon={faStickyNote} />
                Edit
              </Header>

              {this.state.isEditQuestionModalOpen ?
                <CoreModal
                  open={this.state.isEditQuestionModalOpen}
                  close={this.toggleEditQuestionModal}
                  type='edit'
                  olderData={this.props.question}
                /> :
                <div></div>
              }

              <Header className="actions" type="h3" onClick={this.toggleDeleteModal}>
                <FontAwesomeIcon className="edit" icon={faTrash} />
                Delete
              </Header>

              <DeleteModal open={this.state.isDeleteModalOpen} delete={this.confirmDelete} close={this.toggleDeleteModal}/>

            </Flex>
            <Header className="record-info" type="h3">
              Asked by {user} on <i>{moment(timestamp).format('MMMM Do YYYY, h:mm a')}</i>
            </Header>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default DetailedQuestion;
