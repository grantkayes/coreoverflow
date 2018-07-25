import React from 'react';
import { Flex, Header, Card, Icon } from '@procore/core-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWrench,
  faChevronUp,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

import Answer from './answer';
import Markdown from '../../components/markdown';
import './index.css';

class DetailedQuestion extends React.Component {
  render() {
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
      <Card id="question-container" className="card" level="30">
        <Flex direction="row" alignItems="center">
          <Flex
            className="question-votes"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              alignItems="center"
              direction="column"
              justifyContent="center"
            >
              <p className="card-vote-num num">25</p>
              <p className="card-vote-text text">votes</p>
              <Flex
                className="icon-container"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FontAwesomeIcon className="upvote" icon={faChevronUp} />
                <FontAwesomeIcon className="downvote" icon={faChevronDown} />
              </Flex>
            </Flex>
          </Flex>
          <Flex
            justifyContent="center"
            className="question-info"
            direction="column"
          >
            <Header className="question-title" type="h3">
              What are Procore's Values?
            </Header>
            <Flex className="question-markdown">
              <Markdown text={input} />
            </Flex>

            <Header className="record-info" type="h3">
              Asked by Elton Xue <br />on July 22, 2018
            </Header>
          </Flex>
        </Flex>
      </Card>
    );
  }
}

export default DetailedQuestion;
