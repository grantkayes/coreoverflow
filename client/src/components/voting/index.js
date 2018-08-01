import React from 'react';
import { Flex } from '@procore/core-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Voting = props => {
  let Vote;
  if (props.upvoted) {
    Vote = (
      <Flex
        className="icon-container"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <FontAwesomeIcon
          className="upvote"
          icon={faChevronUp}
          onClick={props.onUpvote}
        />
        <FontAwesomeIcon
          className="voted"
          icon={faChevronDown}
          onClick={props.onDownvote}
        />
      </Flex>
    );
  } else if (props.downvoted) {
    Vote = (
      <Flex
        className="icon-container"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <FontAwesomeIcon
          className="voted"
          icon={faChevronUp}
          onClick={props.onUpvote}
        />
        <FontAwesomeIcon
          className="downvote"
          icon={faChevronDown}
          onClick={props.onDownvote}
        />
      </Flex>
    );
  } else {
    Vote = (
      <Flex
        className="icon-container"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <FontAwesomeIcon
          className="upvote"
          icon={faChevronUp}
          onClick={props.onUpvote}
        />
        <FontAwesomeIcon
          className="downvote"
          icon={faChevronDown}
          onClick={props.onDownvote}
        />
      </Flex>
    );
  }

  return (
    <Flex alignItems="center" direction="column" justifyContent="center">
      <p className="card-vote-num num">{props.votes}</p>
      <p className="card-vote-text text">votes</p>
      {Vote}
    </Flex>
  );
};

export default Voting;
