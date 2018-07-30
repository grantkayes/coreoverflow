import React from 'react';
import { Flex, Header } from '@procore/core-react';

import Markdown from '../../components/markdown';
import Voting from '../../components/voting';
import LessModal from '../coremodal/lessmodal';
import AlertBanner from '../banner/banner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faStickyNote,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import './index.css';
import CoreModal from '../coremodal/coremodal';

class DetailedQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upvoted: false,
      downvoted: false,
      votes: 25,
      isModalOpen: false,
      isLessModalOpen: false
    };
  }

  onUpvote = () => {
    console.log('I upvoted!');
    if (this.state.downvoted) {
      this.setState({
        upvoted: true,
        downvoted: false,
        votes: this.state.votes + 2
      });
    } else if (this.state.upvoted) {
      this.setState({
        upvoted: false,
        downvoted: false,
        votes: this.state.votes - 1
      });
    } else {
      this.setState({
        upvoted: true,
        downvoted: false,
        votes: this.state.votes + 1
      });
    }
  };

  onDownvote = () => {
    console.log('I downvoted!');
    if (this.state.upvoted) {
      this.setState({
        downvoted: true,
        upvoted: false,
        votes: this.state.votes - 2
      });
    } else if (this.state.downvoted) {
      this.setState({
        downvoted: false,
        upvoted: false,
        votes: this.state.votes + 1
      });
    } else {
      this.setState({
        downvoted: true,
        upvoted: false,
        votes: this.state.votes - 1
      });
    }
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
    console.log(this.state);
  };

  toggleLessModal = () => {
    this.setState({ isLessModalOpen: !this.state.isLessModalOpen });
    console.log(this.state);
  };

  render() {
    console.log(this.state);
    const input = `
## Hello

I am trying to work with React & markdown! I am trying to work with React & markdown! I am trying to work with React & markdown! I am trying to work with React & markdown! I am trying to work with React & markdown!

\`Hello\`


\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
    <Markdown source="# Your markdown here" />,
    document.getElementById('content')
);
\`\`\`
`;

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
          <Voting
            votes={this.state.votes}
            onUpvote={this.onUpvote}
            onDownvote={this.onDownvote}
            upvoted={this.state.upvoted}
            downvoted={this.state.downvoted}
          />
        </Flex>
        <Flex
          justifyContent="center"
          className="question-info"
          direction="column"
        >
          <Header className="question-title" type="h3">
            What are Procore's Values?
          </Header>
          <Markdown className="question-markdown" text={input} />
          <Flex className="info-container" justifyContent="space-between">
            <Flex className="actions-container" justify-content="space-around">
              <Header
                className="actions"
                type="h3"
                onClick={this.toggleLessModal}
              >
                <FontAwesomeIcon className="answer" icon={faComments} />
                Answer
              </Header>

              <LessModal
                open={this.state.isLessModalOpen}
                close={this.toggleLessModal}
              />

              <Header className="actions" type="h3" onClick={this.toggleModal}>
                <FontAwesomeIcon className="edit" icon={faStickyNote} />
                Edit
              </Header>

              <CoreModal
                open={this.state.isModalOpen}
                close={this.toggleModal}
              />

              <Header className="actions" type="h3">
                <FontAwesomeIcon className="edit" icon={faTrash} />
                Delete
              </Header>
            </Flex>

            <Header className="record-info" type="h3">
              Asked by Elton Xue on July 22, 2018
            </Header>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default DetailedQuestion;
