import React from 'react';
import { Flex, Icon } from '@procore/core-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Clap = props => {
  return (
    <Flex alignItems="center" direction="column" justifyContent="center">
      <Flex justifyContent="center" className="card-vote-num num">
        {props.claps}
      </Flex>
      <FontAwesomeIcon onClick={props.onClap} className="clap" icon={faHeart} />
    </Flex>
  );
};

export default Clap;
