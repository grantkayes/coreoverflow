import React from 'react';
import { Flex, Icon } from '@procore/core-react';
import Answer from './answer';
import Markdown from '../../components/markdown';
import './index.css';

import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-gist.css';

class DetailedQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

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
      <Flex id="question-container" direction="column">
        <h2>What are Procore's Values?</h2>
        <Markdown text={input} />
      </Flex>
    );
  }
}

export default DetailedQuestion;
