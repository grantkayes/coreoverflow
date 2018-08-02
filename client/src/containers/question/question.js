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
      upvoted: false,
      downvoted: false,
      votes: 25,
      isQuestionModalOpen: false,
      isEditQuestionModalOpen: false,
      isLessModalOpen: false,
      isDeleteModalOpen: false,
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
          <Clap claps={claps}/>
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
              <Header className="actions" type="h3" onClick={this.toggleLessModal}>
                <FontAwesomeIcon className="answer" icon={faComments} />
                Answer
              </Header>
              <LessModal open={this.state.isLessModalOpen} close={this.toggleLessModal} />
              <Header className="actions" type="h3" onClick={this.toggleEditQuestionModal}>
                <FontAwesomeIcon className="edit" icon={faStickyNote} />
                Edit
              </Header>
              <CoreModal
                open={this.state.isEditQuestionModalOpen}
                close={this.toggleEditQuestionModal}
                type='edit'
                olderData={this.props.question}
              />

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
