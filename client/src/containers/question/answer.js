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
  }
  onClap = () => {
    this.props.editAnswer(this.props.id, { questionId: this.props.questionId, claps: this.props.claps + 1 });
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
                <Header
                  onClick={this.props.toggleSubmitModal}
                  className="actions"
                  type="h3"
                >
                  <FontAwesomeIcon className="answer" icon={faReply} />
                  Reply
                </Header>
                <Header
                  onClick={this.props.toggleEditModal(body)}
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
