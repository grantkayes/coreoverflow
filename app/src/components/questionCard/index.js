import React from 'react';
import classNames from 'classnames';
import { Box, Card, Flex, Link } from '@procore/core-react';
import './index.css';

const QuestionCard = props => {
  const {
    title,
    body,
    up,
    down,
    timestamp,
    user,
    answerCount,
    userId
  } = props.question;

  let bodyText = body;
  if (body.length > 250) {
    bodyText = body.substring(0, 250) + '...';
  }

  return (
    <Card className="card" level="30">
      <Box padding="md">
        <Flex>
          <Flex
            alignItems="center"
            direction="column"
            className="side-card-container"
          >
            <Box className="votes-container">
              <Flex alignItems="center" direction="column">
                <p className="card-vote-num">{up - down}</p>
                <p className="card-vote-text">votes</p>
              </Flex>
            </Box>
            <Box
              className={classNames('answer-container', {
                'has-answer': answerCount > 0
              })}
            >
              <Flex alignItems="center" direction="column">
                <p
                  className={classNames('answer-vote-num', {
                    'has-answer': answerCount > 0
                  })}
                >
                  {answerCount}
                </p>
                <p
                  className={classNames('answer-vote-text', {
                    'has-answer': answerCount > 0
                  })}
                >
                  answers
                </p>
              </Flex>
            </Box>
          </Flex>
          <Flex direction="column" className="right-side-container">
            <Box>
              <Link href={`http://localhost:3000/question/1`}>
                <p className="card-title">{title}</p>
              </Link>
            </Box>
            <Box>
              <Flex>
                <p className="card-body">{bodyText}</p>
              </Flex>
            </Box>
            <Flex className="question-user-info" direction="column">
              <p className="subtext">
                Asked by
                <Link href={`http://localhost:3000/profile/userid=${userId}`}>
                  {` ${user}`}
                </Link>
              </p>
              <p className="subtext">on {timestamp.format('ll')}</p>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};

export default QuestionCard;
