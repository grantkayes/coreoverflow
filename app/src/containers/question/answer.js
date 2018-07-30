import React from 'react';

import { Flex, Header, Card } from '@procore/core-react';

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
  constructor(props) {
    super(props);

    this.state = {
      upvoted: false,
      downvoted: false
    };
  }

  onUpvote = answerId => {
    const upvotes = this.props.up + 1;

    console.log('I upvoted!');
    console.log('Current up: ' + upvotes);
    if (this.state.downvoted) {
      this.setState({
        upvoted: true,
        downvoted: false
      });
    } else if (this.state.upvoted) {
      this.setState({
        upvoted: false,
        downvoted: false
      });
    } else {
      this.setState({
        upvoted: true,
        downvoted: false
      });
    }
  };

  onDownvote = answerId => {
    const downvotes = this.props.down - 1;

    console.log('I downvoted!');
    console.log('Current down: ' + downvotes);
    if (this.state.upvoted) {
      this.setState({
        downvoted: true,
        upvoted: false
      });
    } else if (this.state.downvoted) {
      this.setState({
        downvoted: false,
        upvoted: false
      });
    } else {
      this.setState({
        downvoted: true,
        upvoted: false
      });
    }
  };

  render() {
    const { body, id, questionId, timestamp, up, down } = this.props;

    return (
      <Card id="answer-container">
        <Flex justifyContent="flex-start" alignItems="center">
          <Flex className="answer-card-left">
            <Voting
              onUpvote={this.onUpvote}
              onDownvote={this.onDownvote}
              upvoted={this.state.upvoted}
              downvoted={this.state.downvoted}
              votes={up - down}
            />
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
