import React from 'react';
import { Flex, Header } from '@procore/core-react';
import moment from 'moment';

import Markdown from '../../components/markdown';
import Clap from '../../components/clap';
import LessModal from '../coremodal/lessmodal';

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

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
    console.log(this.state);
  };

  toggleLessModal = () => {
    this.setState({ isLessModalOpen: !this.state.isLessModalOpen });
    console.log(this.state);
  };

  render() {
    const { answerCount, questionTitle, body, user, claps, timestamp } = this.props.question;
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
          <Clap claps={claps} />
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
              Asked by {user} on <i>{moment(timestamp).format('MMMM Do YYYY, h:mm a')}</i>
            </Header>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default DetailedQuestion;
