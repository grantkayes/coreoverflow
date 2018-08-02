import React from 'react';
import moment from 'moment';

import { Flex, Header, Card } from '@procore/core-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReply,
  faStickyNote,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import Markdown from '../../components/markdown';
import Clap from '../../components/clap';
import LessModal from '../coremodal/lessmodal';

import './index.css';

class Answer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditModalOpen: false,
      isSubmitModalOpen: false,
      modalType: 'edit'
    };
  }
  onClap = () => {
    this.props.editAnswer(this.props.id, { questionId: this.props.questionId, claps: this.props.claps + 1 });
  };

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
      modalType: 'edit'
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

    console.log(reqBody);

    this.props.submitAnswer(reqBody);
  };

  render() {
    const { body, id, questionId, timestamp, claps } = this.props;

    return (
      <Card id="answer-container">
        <Flex justifyContent="flex-start" alignItems="center">
          <Flex
            className="answer-card-left"
            justifyContent="center"
            alignItems="center"
          >
            <Clap claps={claps} onClap={this.onClap} />
          </Flex>
          <Flex className="answer-card-right" direction="column">
            <Flex className="info-container">
              <Header className="record-info record-info-answer" type="h3">
                Answered by {`${this.props.answerFirstName} ${this.props.answerLastName}`} on{' '}
                <i>{moment(timestamp).format('MMMM Do YYYY, h:mm a')}</i>
              </Header>

              <Flex className="actions-container" justifyContent="flex-end">
                <LessModal
                  body={''}
                  open={this.state.isSubmitModalOpen}
                  close={this.toggleSubmitModal}
                  editAnswer={this.editAnswer}
                  submitAnswer={this.submitAnswer}
                  modalType={this.state.modalType}
                />
                <Header
                  onClick={this.toggleSubmitModal}
                  className="actions"
                  type="h3"
                >
                  <FontAwesomeIcon className="answer" icon={faReply} />
                  Reply
                </Header>

                <LessModal
                  body={body}
                  open={this.state.isEditModalOpen}
                  close={this.toggleEditModal}
                  editAnswer={this.editAnswer}
                  submitAnswer={this.submitAnswer}
                  modalType={this.state.modalType}
                />
                <Header
                  onClick={this.toggleEditModal}
                  className="actions"
                  type="h3"
                >
                  <FontAwesomeIcon className="edit" icon={faStickyNote} />
                  Edit
                </Header>
                <Header className="actions" type="h3">
                  <FontAwesomeIcon className="edit" icon={faTrash} />
                  Delete
                </Header>
              </Flex>
            </Flex>

            <Markdown className="question-markdown" text={body} />
          </Flex>
        </Flex>
      </Card>
    );
  }
}

export default Answer;
