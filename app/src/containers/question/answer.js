import React from 'react';
import { Flex, Header } from '@procore/core-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReply,
  faStickyNote,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import Markdown from '../../components/markdown';
import Voting from '../../components/voting';

import './index.css';

class Answer extends React.Component {
  render() {
    const { body, id, questionId, timestamp, up, down } = this.props;

    return (
      <Flex
        id="answer-container"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Flex className="answer-card-left">
          <Voting votes={up - down} />
        </Flex>
        <Flex className="answer-card-right" direction="column">
          <Flex className="info-container">
            <Header className="record-info record-info-answer" type="h3">
              Answered by Sonia Xu on {timestamp}
            </Header>

            <Flex className="actions-container" justifyContent="flex-end">
              <Header className="actions" type="h3">
                <FontAwesomeIcon className="answer" icon={faReply} />
                Reply
              </Header>

              <Header className="actions" type="h3">
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
    );
  }
}

export default Answer;
