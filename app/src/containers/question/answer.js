import React from 'react';

import { Flex, Header, Card } from '@procore/core-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReply,
  faStickyNote,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import Markdown from '../../components/markdown';
import Clap from '../../components/clap';

import './index.css';

class Answer extends React.Component {
  onClap = () => {
    console.log('clapping!');

    this.props.editAnswer(this.props.id, { claps: this.props.claps + 1 });
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
      </Card>
    );
  }
}

export default Answer;
